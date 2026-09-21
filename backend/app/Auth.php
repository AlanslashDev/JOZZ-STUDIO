<?php
declare(strict_types=1);

namespace Joozz\App;

final class Auth
{
    public static function startSession(): void
    {
        if (session_status() === PHP_SESSION_ACTIVE) {
            return;
        }
        $sessionDirectory = BASE_PATH . '/storage/sessions';
        if (!is_dir($sessionDirectory)) {
            mkdir($sessionDirectory, 0775, true);
        }
        session_save_path($sessionDirectory);
        session_name(\env_value('SESSION_NAME', 'joozz_admin'));
        session_set_cookie_params([
            'httponly' => true,
            'secure' => (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off'),
            'samesite' => 'Lax',
            'path' => '/',
        ]);
        session_start();
    }

    /** @return array<string, mixed> */
    public static function requireAdmin(): array
    {
        self::startSession();
        $admin = $_SESSION['admin'] ?? null;
        if (!is_array($admin)) {
            Http::error('Authentication required.', 401);
        }
        self::verifyCsrf();
        return $admin;
    }

    public static function verifyCsrf(): void
    {
        if (in_array($_SERVER['REQUEST_METHOD'] ?? 'GET', ['GET', 'HEAD', 'OPTIONS'], true)) {
            return;
        }
        $provided = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
        $expected = $_SESSION['csrf'] ?? '';
        if (!is_string($provided) || !is_string($expected) || !hash_equals($expected, $provided)) {
            Http::error('Invalid CSRF token.', 419);
        }
    }

    /** @return array<string, mixed>|null */
    public static function login(string $username, string $password): ?array
    {
        self::startSession();
        $key = hash('sha256', strtolower($username) . '|' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
        $attempt = $_SESSION['login_attempts'][$key] ?? ['count' => 0, 'at' => 0];
        if ($attempt['count'] >= 5 && $attempt['at'] > time() - 900) {
            Http::error('Too many login attempts. Try again in 15 minutes.', 429);
        }

        $statement = \db()->prepare('SELECT id, username, password_hash, role, is_active FROM admins WHERE username = :username LIMIT 1');
        $statement->execute(['username' => $username]);
        $admin = $statement->fetch();
        if (!$admin || !(bool) $admin['is_active'] || !password_verify($password, $admin['password_hash'])) {
            $_SESSION['login_attempts'][$key] = ['count' => $attempt['count'] + 1, 'at' => time()];
            return null;
        }

        session_regenerate_id(true);
        unset($_SESSION['login_attempts'][$key]);
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
        $_SESSION['admin'] = [
            'id' => (int) $admin['id'],
            'username' => $admin['username'],
            'role' => $admin['role'],
        ];
        return $_SESSION['admin'];
    }

    public static function logout(): void
    {
        self::startSession();
        $_SESSION = [];
        session_destroy();
    }

    public static function isOwner(array $admin): bool
    {
        return ($admin['role'] ?? '') === 'owner';
    }
}
