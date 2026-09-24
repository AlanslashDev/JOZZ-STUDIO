<?php
declare(strict_types=1);

require_once __DIR__ . '/config/bootstrap.php';
\Joozz\App\Http::securityHeaders();

// Router for PHP's built-in development server. This mirrors the production
// Apache layout: React at /, the CMS at /admin, and PHP at /api/v1 + /uploads.
$path = rawurldecode(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/');
if (preg_match('#(?:^|/)\.\.(?:/|$)#', $path)) {
    http_response_code(400);
    echo 'Invalid path.';
    return true;
}

if (preg_match('#^/admin(?:/|$)#', $path)) {
    require __DIR__ . '/public/admin/index.php';
    return true;
}

$staticFile = __DIR__ . '/public' . $path;
if ($path !== '/' && is_file($staticFile)) {
    return false;
}

if (preg_match('#^/(?:api/v1|uploads)(?:/|$)#', $path)) {
    require __DIR__ . '/public/index.php';
    return true;
}

$reactIndex = __DIR__ . '/public/index.html';
if (is_file($reactIndex)) {
    header('Content-Type: text/html; charset=utf-8');
    readfile($reactIndex);
    return true;
}

http_response_code(404);
echo 'Run npm run build to create the React production site.';
return true;
