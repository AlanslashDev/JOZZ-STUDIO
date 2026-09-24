<?php
declare(strict_types=1);

namespace Joozz\App;

final class Http
{
    public static function securityHeaders(): void
    {
        header_remove('X-Powered-By');
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: SAMEORIGIN');
        header('Referrer-Policy: strict-origin-when-cross-origin');
        header('Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()');
        header("Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https:; media-src 'self' blob: https:; connect-src 'self'; font-src 'self' data: https://fonts.gstatic.com; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com; object-src 'none'; base-uri 'self'; frame-ancestors 'self'; form-action 'self'");
        $forwardedProto = filter_var(\env_value('TRUST_PROXY', 'false'), FILTER_VALIDATE_BOOL)
            ? strtolower(trim(explode(',', $_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '')[0]))
            : '';
        if ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || $forwardedProto === 'https') {
            header('Strict-Transport-Security: max-age=31536000; includeSubDomains');
        }
    }

    /** @return array<string, mixed> */
    public static function jsonBody(): array
    {
        $maximumBytes = 1024 * 1024;
        if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > $maximumBytes) {
            self::error('Request body is too large.', 413);
        }
        $raw = file_get_contents('php://input') ?: '';
        if (strlen($raw) > $maximumBytes) {
            self::error('Request body is too large.', 413);
        }
        if ($raw === '') {
            return [];
        }
        try {
            $decoded = json_decode($raw, true, 512, JSON_THROW_ON_ERROR);
        } catch (\JsonException) {
            self::error('Malformed JSON request body.', 400);
        }
        if (!is_array($decoded)) {
            self::error('JSON request body must be an object.', 400);
        }
        return $decoded;
    }

    /** @param array<string, mixed> $data */
    public static function ok(array $data, int $status = 200, array $headers = []): never
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        header('X-Content-Type-Options: nosniff');
        foreach ($headers as $name => $value) {
            header($name . ': ' . $value);
        }
        echo json_encode(['data' => $data], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit;
    }

    /** @param array<string, mixed> $details */
    public static function error(string $message, int $status, array $details = []): never
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        header('X-Content-Type-Options: nosniff');
        echo json_encode(['error' => ['message' => $message, 'details' => $details]], JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
        exit;
    }

    public static function allowConfiguredOrigin(): void
    {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        $configuredOrigins = \env_value('ALLOWED_ORIGINS', \env_value('ADMIN_ORIGIN', '')) ?? '';
        $allowedOrigins = array_filter(array_map('trim', explode(',', $configuredOrigins)));
        if ($origin !== '' && in_array($origin, $allowedOrigins, true)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Vary: Origin');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token');
            header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');
        }
        if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
            http_response_code(204);
            exit;
        }
    }
}
