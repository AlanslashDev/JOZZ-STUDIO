<?php
declare(strict_types=1);

namespace Joozz\App;

final class Http
{
    /** @return array<string, mixed> */
    public static function jsonBody(): array
    {
        $raw = file_get_contents('php://input') ?: '';
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
        $allowed = \env_value('ADMIN_ORIGIN', '');
        if ($origin !== '' && hash_equals($allowed, $origin)) {
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
