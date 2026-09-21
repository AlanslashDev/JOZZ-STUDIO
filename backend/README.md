# Joozz PHP API and admin foundation

This directory is the PHP/MySQL backend for the React site. It is deliberately separate from the Vite source so the public website can remain a fast static build while PHP owns the API, content management and authentication.

## Local setup

1. Copy `.env.example` to `.env` and set the actual local MySQL credentials.
2. In phpMyAdmin, select `jooz_db` and import these files in order:

   1. `database/migrations/001_initial.sql`
   2. `database/migrations/002_content_modules.sql`
   3. `database/migrations/003_seed_existing_content.sql`

   The third migration copies the website's current services, portfolio,
   statistics, team, reviews, studio details, process and FAQs into MySQL. It
   uses stable service/project keys, so importing it again does not create
   duplicate services or portfolio projects.
3. Create the first owner from a PHP terminal:

   ```sh
   php scripts/create-owner.php owner-name a-strong-password
   ```

   The script never stores the plaintext password.

4. Point a PHP-capable local virtual host at `backend/public`. For Vite development, set `VITE_API_BASE_URL` to that virtual host plus `/api/v1`.

## cPanel deployment

Use PHP 8.2 or newer. Put the non-public folders (`app`, `config`, `database`, `scripts`, `storage`) outside the web document root when cPanel permits it. Point the website/API document root to `public`. Point `admin.yourdomain.com` to the same public entry point and configure `APP_URL` and `ADMIN_ORIGIN` with HTTPS URLs.

The `storage/cache` directory must be writable by PHP. Cache files are regenerated after content changes; no cron or Redis is required.

## Refreshing the initial content seed

If the bundled fallback content changes before launch, regenerate the seed:

```sh
node backend/scripts/generate-seed.mjs
```

Do not run the generated seed over a live site after editors have started
making changes, because its purpose is to establish the initial content.
