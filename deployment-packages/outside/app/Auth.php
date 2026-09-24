<?php
declare(strict_types=1);

namespace Joozz\App;

final class Auth
{
    private const IDLE_TIMEOUT = 1800;
    private const ABSOLUTE_TIMEOUT = 43200;
    private const REGENERATE_INTERVAL = 900;

    public static function startSession(): void
    {
        if (session_status() === PHP_SESSION_ACTIVE) {
            return;
        }
        ini_set('session.use_strict_mode', '1');
        ini_set('session.use_only_cookies', '1');
        $sessionDirectory = BASE_PATH . '/storage/sessions';
        if (!is_dir($sessionDirectory)) {
            mkdir($sessionDirectory, 0700, true);
        }
        @chmod($sessionDirectory, 0700);
        session_save_path($sessionDirectory);
        session_name(\env_value('SESSION_NAME', 'joozz_admin'));
        $forwardedProto = filter_var(\env_value('TRUST_PROXY', 'false'), FILTER_VALIDATE_BOOL)
            ? strtolower(trim(explode(',', $_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '')[0]))
            : '';
        $requestIsSecure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
            || $forwardedProto === 'https'
            || (int) ($_SERVER['SERVER_PORT'] ?? 0) === 443;
        $secureConfig = \env_value('SESSION_SECURE');
        $forceSecure = $secureConfig === null ? null : filter_var($secureConfig, FILTER_VALIDATE_BOOL, FILTER_NULL_ON_FAILURE);
        session_set_cookie_params([
            'httponly' => true,
            'secure' => $forceSecure ?? $requestIsSecure,
            'samesite' => 'Lax',
            'path' => '/',
        ]);
        session_start();
    }

    /** @return array<string, mixed> */
    public static function requireAdmin(): array
    {
        self::startSession();
        header('Cache-Control: no-store, private');
        header('Pragma: no-cache');
        $admin = $_SESSION['admin'] ?? null;
        if (!is_array($admin)) {
            Http::error('Authentication required.', 401);
        }
        $now = time();
        $createdAt = (int) ($_SESSION['created_at'] ?? 0);
        $lastSeenAt = (int) ($_SESSION['last_seen_at'] ?? 0);
        if ($createdAt === 0 || $lastSeenAt === 0 || $createdAt < $now - self::ABSOLUTE_TIMEOUT || $lastSeenAt < $now - self::IDLE_TIMEOUT) {
            self::logout();
            Http::error('Your session has expired. Please sign in again.', 401);
        }

        $statement = \db()->prepare('SELECT username, role, is_active FROM admins WHERE id = :id LIMIT 1');
        $statement->execute(['id' => (int) ($admin['id'] ?? 0)]);
        $account = $statement->fetch();
        if (!$account || !(bool) $account['is_active']) {
            self::logout();
            Http::error('Authentication required.', 401);
        }
        $_SESSION['admin']['username'] = $account['username'];
        $_SESSION['admin']['role'] = $account['role'];
        $_SESSION['last_seen_at'] = $now;
        if ((int) ($_SESSION['regenerated_at'] ?? 0) < $now - self::REGENERATE_INTERVAL) {
            session_regenerate_id(true);
            $_SESSION['regenerated_at'] = $now;
        }
        self::verifyCsrf();
        return $_SESSION['admin'];
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
        $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        $userKey = 'login-user-ip-' . hash('sha256', strtolower($username) . '|' . $ip);
        $ipKey = 'login-ip-' . hash('sha256', $ip);
        $userAttempt = \cache()->get($userKey) ?? ['count' => 0, 'at' => time()];
        $ipAttempt = \cache()->get($ipKey) ?? ['count' => 0, 'at' => time()];
        if ((int) ($userAttempt['at'] ?? 0) <= time() - 900) $userAttempt = ['count' => 0, 'at' => time()];
        if ((int) ($ipAttempt['at'] ?? 0) <= time() - 900) $ipAttempt = ['count' => 0, 'at' => time()];
        if (($userAttempt['count'] >= 5 && $userAttempt['at'] > time() - 900)
            || ($ipAttempt['count'] >= 20 && $ipAttempt['at'] > time() - 900)) {
            Http::error('Too many login attempts. Try again in 15 minutes.', 429);
        }

        $statement = \db()->prepare('SELECT id, username, password_hash, role, is_active FROM admins WHERE username = :username LIMIT 1');
        $statement->execute(['username' => $username]);
        $admin = $statement->fetch();
        if (!$admin || !(bool) $admin['is_active'] || !password_verify($password, $admin['password_hash'])) {
            $now = time();
            \cache()->put($userKey, ['count' => (int) $userAttempt['count'] + 1, 'at' => (int) ($userAttempt['at'] ?? $now)]);
            \cache()->put($ipKey, ['count' => (int) $ipAttempt['count'] + 1, 'at' => (int) ($ipAttempt['at'] ?? $now)]);
            return null;
        }

        session_regenerate_id(true);
        \cache()->forget($userKey);
        \cache()->forget($ipKey);
        $now = time();
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
        $_SESSION['created_at'] = $now;
        $_SESSION['last_seen_at'] = $now;
        $_SESSION['regenerated_at'] = $now;
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
        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', [
                'expires' => time() - 42000,
                'path' => $params['path'],
                'domain' => $params['domain'],
                'secure' => $params['secure'],
                'httponly' => $params['httponly'],
                'samesite' => $params['samesite'] ?? 'Lax',
            ]);
        }
        session_destroy();
    }

    public static function isOwner(array $admin): bool
    {
        return ($admin['role'] ?? '') === 'owner';
    }

    /** @param array<string, mixed> $admin */
    public static function requireOwner(array $admin): void
    {
        if (!self::isOwner($admin)) {
            Http::error('Owner permissions required.', 403);
        }
    }
}
