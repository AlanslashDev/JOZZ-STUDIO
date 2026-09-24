<?php
declare(strict_types=1);

// Moves legacy root-level media into storage/uploads/general and updates media URLs.
// Run once from the backend directory after setting .env:
//   php scripts/organize-media.php
require_once __DIR__ . '/../config/bootstrap.php';

$directory = BASE_PATH . '/storage/uploads/general';
if (!is_dir($directory) && !mkdir($directory, 0775, true) && !is_dir($directory)) {
    fwrite(STDERR, "Could not create the general media folder.\n");
    exit(1);
}

$rows = db()->query("SELECT id, path FROM media WHERE path REGEXP '^/uploads/[a-f0-9]{32}\\.(jpg|png|webp|gif|mp4|webm)$'")->fetchAll();
$updated = 0;
$skipped = 0;
$connection = db();
$connection->beginTransaction();
try {
    $update = $connection->prepare('UPDATE media SET path = :newPath WHERE id = :id');
    foreach ($rows as $row) {
        $oldPath = (string) $row['path'];
        $filename = basename($oldPath);
        $source = BASE_PATH . '/storage/uploads/' . $filename;
        $target = $directory . '/' . $filename;
        if (!is_file($source)) {
            $skipped++;
            continue;
        }
        if (!is_file($target) && !rename($source, $target)) {
            throw new RuntimeException("Could not move {$filename}.");
        }
        $update->execute(['newPath' => '/uploads/general/' . $filename, 'id' => (int) $row['id']]);
        $updated++;
    }
    $connection->commit();
} catch (Throwable $error) {
    if ($connection->inTransaction()) $connection->rollBack();
    fwrite(STDERR, $error->getMessage() . "\n");
    exit(1);
}

printf("Organized %d media item(s); skipped %d missing file(s).\n", $updated, $skipped);
