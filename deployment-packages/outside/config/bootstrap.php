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

$production = strtolower(env_value('APP_ENV', 'production') ?? 'production') === 'production';
ini_set('display_errors', $production ? '0' : '1');
ini_set('display_startup_errors', $production ? '0' : '1');
ini_set('log_errors', '1');

set_exception_handler(static function (Throwable $error): never {
    error_log($error->__toString());
    http_response_code(500);
    $path = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH) ?: '';
    if (str_contains($path, '/api/v1/')) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['error' => ['message' => 'The server could not complete that request.']], JSON_UNESCAPED_SLASHES);
    } else {
        header('Content-Type: text/plain; charset=utf-8');
        echo 'The server could not complete that request.';
    }
    exit;
});

function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $databaseUser = env_value('DB_USER', '');
    $databasePassword = env_value('DB_PASSWORD', '');
    if (strtolower(env_value('APP_ENV', 'production') ?? 'production') === 'production'
        && (strtolower($databaseUser ?? '') === 'root' || $databasePassword === '')) {
        throw new RuntimeException('Production requires a dedicated database user and a non-empty password.');
    }
    $dsn = sprintf(
        'mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4',
        env_value('DB_HOST', '127.0.0.1'),
        env_value('DB_PORT', '3306'),
        env_value('DB_NAME', 'jooz_db')
    );
    $pdo = new PDO($dsn, $databaseUser, $databasePassword, [
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
