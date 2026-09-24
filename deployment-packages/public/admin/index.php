<?php
declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/config/bootstrap.php';

use Joozz\App\Http;

Http::securityHeaders();
header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-store, max-age=0');

$appShell = dirname(__DIR__) . '/index.html';
if (!is_file($appShell)) {
    http_response_code(503);
    echo 'The admin application has not been built yet. Run npm run build.';
    exit;
}

readfile($appShell);
