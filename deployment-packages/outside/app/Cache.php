<?php
declare(strict_types=1);

namespace Joozz\App;

final class Cache
{
    public function __construct(private readonly string $directory, private readonly int $ttl) {}

    /** @return array<string, mixed>|null */
    public function get(string $key): ?array
    {
        $path = $this->path($key);
        if (!is_file($path) || filemtime($path) + $this->ttl < time()) {
            return null;
        }
        $json = file_get_contents($path);
        return is_string($json) ? json_decode($json, true) : null;
    }

    /** @param array<string, mixed> $value */
    public function put(string $key, array $value): void
    {
        if (!is_dir($this->directory)) {
            mkdir($this->directory, 0700, true);
        }
        @chmod($this->directory, 0700);
        $temporary = tempnam($this->directory, 'cache_');
        file_put_contents($temporary, json_encode($value, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR), LOCK_EX);
        rename($temporary, $this->path($key));
    }

    public function forget(string $key): void
    {
        $path = $this->path($key);
        if (is_file($path)) {
            unlink($path);
        }
    }

    private function path(string $key): string
    {
        return $this->directory . '/' . hash('sha256', $key) . '.json';
    }
}
