JOOZZ STUDIO - CPANEL UPDATE FOR AN EXISTING SITE

This archive is a flat public_html package. Extract its contents directly into
the current domain document root, the folder that already contains index.html,
index.php, .env, app/, config/, and storage/. Do not put these files into a new
subfolder.

Before updating, download a backup of the current site files and export the
current database in phpMyAdmin.

Upload the archive's contents and replace matching application files. Keep the
existing .env file, storage/uploads directory, and database. This archive has
no .env, no uploaded files, and no SQL seed or database replacement.

The package includes the built public website, /admin application, /api/v1 PHP
API, application code, and bundled website media. The root .htaccess file is
required for API and page routes on Apache/cPanel, so include hidden files
when extracting or uploading. The storage/cache and storage/sessions folders
must be writable by PHP; existing uploaded files remain in storage/uploads.

For a site where the admin and public content already use the current database,
no database import is needed. Existing admin accounts and content stay in that
database. If the API reports a missing table, check the actual table name and
hosting PHP error log before applying a migration.

After updating, visit /, /admin/, /api/v1/public/bootstrap, and a known
uploaded image under /uploads/. Sign in and check a draft save, publish, Media
Library, and the public page affected by that publish.

PHP 8.2+ with PDO MySQL, mbstring, and fileinfo is required. Use the existing
HTTPS domain in .env. Do not upload the local development .env from a computer.

VIDEO UPLOADS
The app accepts MP4 and WebM videos up to 100 MB by default. In cPanel's
MultiPHP INI Editor for this domain, set upload_max_filesize to at least 100M
and post_max_size to at least 110M. Also allow enough max_input_time and
max_execution_time for the connection to finish (300 seconds is a starting
point). The hosting provider may enforce a lower limit outside PHP. If the
current .env contains VIDEO_UPLOAD_MAX_BYTES, its value overrides the app's
100 MB default. Keep storage/uploads writable by PHP.
