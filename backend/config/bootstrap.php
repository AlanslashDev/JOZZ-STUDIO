<?php
declare(strict_types=1);

use Joozz\App\Cache;

const BASE_PATH = __DIR__ . '/..';

/** @return array<string, string> */
function env(): array
{
    static $values = null;
    if ($values !== null) {
        return $values;
    }

    $values = [];
    $path = BASE_PATH . '/.env';
    if (is_file($path)) {
        foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [] as $line) {
            if (str_starts_with(trim($line), '#') || !str_contains($line, '=')) {
                continue;
            }
            [$key, $value] = explode('=', $line, 2);
            $values[trim($key)] = trim($value);
        }
    }
    return $values;
}

function env_value(string $key, ?string $default = null): ?string
{
    return env()[$key] ?? $default;
}

function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $dsn = sprintf(
        'mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4',
        env_value('DB_HOST', '127.0.0.1'),
        env_value('DB_PORT', '3306'),
        env_value('DB_NAME', 'jooz_db')
    );
    $pdo = new PDO($dsn, env_value('DB_USER', 'root'), env_value('DB_PASSWORD', ''), [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    return $pdo;
}

require BASE_PATH . '/app/Http.php';
require BASE_PATH . '/app/Cache.php';
require BASE_PATH . '/app/Auth.php';
require BASE_PATH . '/app/ContentRepository.php';

function cache(): Cache
{
    static $cache = null;
    return $cache ??= new Cache(BASE_PATH . '/storage/cache', (int) env_value('CACHE_TTL', '3600'));
}
