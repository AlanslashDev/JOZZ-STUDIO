<?php
declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    exit("This script can only run from the command line.\n");
}
if ($argc !== 3) {
    exit("Usage: php create-owner.php <username> <password>\n");
}

require __DIR__ . '/../config/bootstrap.php';
[$script, $username, $password] = $argv;
if (!preg_match('/^[a-zA-Z0-9._-]{3,60}$/', $username) || strlen($password) < 14) {
    exit("Username must be 3-60 safe characters and password must be at least 14 characters.\n");
}
$statement = db()->prepare('INSERT INTO admins (username, password_hash, role) VALUES (:username, :password_hash, \'owner\')');
$statement->execute([
    'username' => $username,
    'password_hash' => password_hash($password, PASSWORD_ARGON2ID),
]);
echo "Owner account created.\n";
