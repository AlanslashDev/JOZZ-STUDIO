<?php
declare(strict_types=1);

// This package is installed directly in public_html, so admin/ is one level
// below the application root.
require_once dirname(__DIR__) . '/config/bootstrap.php';

use Joozz\App\Http;

Http::securityHeaders();
header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('X-Robots-Tag: noindex, nofollow');

$escape = static fn(string $value): string => htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$errorMessage = '';
$complete = false;

try {
    $complete = (int) db()->query('SELECT COUNT(*) FROM admins')->fetchColumn() > 0;
    if (!$complete && ($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
        $configuredToken = env_value('ADMIN_SETUP_TOKEN', '') ?? '';
        $submittedToken = (string) ($_POST['setupToken'] ?? '');
        $username = trim((string) ($_POST['username'] ?? ''));
        $password = (string) ($_POST['password'] ?? '');
        $confirmation = (string) ($_POST['passwordConfirmation'] ?? '');

        if (strlen($configuredToken) < 32 || str_starts_with($configuredToken, 'REPLACE_') || !hash_equals($configuredToken, $submittedToken)) {
            $errorMessage = 'The setup token is invalid. Check ADMIN_SETUP_TOKEN in your .env file.';
        } elseif (!preg_match('/^[a-zA-Z0-9._-]{3,60}$/', $username)) {
            $errorMessage = 'Use a username with 3–60 letters, numbers, dots, underscores, or hyphens.';
        } elseif (strlen($password) < 14) {
            $errorMessage = 'Choose a password with at least 14 characters.';
        } elseif (!hash_equals($password, $confirmation)) {
            $errorMessage = 'The password confirmation does not match.';
        } else {
            $statement = db()->prepare("INSERT INTO admins (username, password_hash, role) VALUES (:username, :password_hash, 'owner')");
            $statement->execute([
                'username' => $username,
                'password_hash' => Joozz\App\Auth::hashPassword($password),
            ]);
            $complete = true;
        }
    }
} catch (Throwable $error) {
    error_log(sprintf('%s: %s in %s:%d', get_class($error), $error->getMessage(), $error->getFile(), $error->getLine()));
    http_response_code(500);
    $errorMessage = 'The setup could not be completed. Check the hosting PHP error log.';
}

?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Set up Joozz admin</title>
  <style>
    *{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;background:#11100d;color:#f5f1e9;font:16px/1.55 system-ui,sans-serif}.card{width:min(100%,520px);padding:36px;border:1px solid #302d26;border-radius:22px;background:#171612}h1{font:40px/1.1 Georgia,serif;margin:0 0 12px}p{color:#c8c1b3;margin:0 0 24px}label{display:block;margin:16px 0 6px}input{width:100%;padding:13px 14px;border:1px solid #302d26;border-radius:10px;background:#0c0c0a;color:#fff;font:inherit}button{width:100%;margin-top:24px;padding:14px;border:0;border-radius:10px;background:#e0b15f;color:#17120a;font:inherit;font-weight:600;cursor:pointer}.error{padding:12px;border:1px solid #754137;border-radius:10px;background:#2a1c18;color:#ff9c89;margin:18px 0}.success{padding:14px;border:1px solid #426044;border-radius:10px;background:#18221a;color:#b9e3b8;margin-top:18px}
  </style>
</head>
<body><main class="card">
  <h1>Set up the first admin</h1>
  <?php if ($complete): ?>
    <div class="success">An admin account already exists, or setup is complete. This page can no longer create another account. Go to <a href="/admin" style="color:inherit">/admin</a> to sign in.</div>
    <p style="margin-top:20px">For extra protection, remove ADMIN_SETUP_TOKEN from .env after setup.</p>
  <?php else: ?>
    <p>Create the single owner account for the new site. This page closes automatically after the first account is created.</p>
    <?php if ($errorMessage !== ''): ?><div class="error"><?= $escape($errorMessage) ?></div><?php endif; ?>
    <form method="post" autocomplete="off">
      <label for="setupToken">Setup token</label><input id="setupToken" name="setupToken" type="password" required autocomplete="off">
      <label for="username">Admin username</label><input id="username" name="username" required minlength="3" maxlength="60" pattern="[A-Za-z0-9._-]+" autocomplete="username">
      <label for="password">New password</label><input id="password" name="password" type="password" required minlength="14" autocomplete="new-password">
      <label for="passwordConfirmation">Confirm password</label><input id="passwordConfirmation" name="passwordConfirmation" type="password" required minlength="14" autocomplete="new-password">
      <button type="submit">Create owner account</button>
    </form>
  <?php endif; ?>
</main></body></html>
