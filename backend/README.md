# Joozz website, API and admin deployment

The production site uses one domain and one public document root:

- `/` and all public page routes serve the React application.
- `/admin` serves the React CMS login and content manager through the same application shell.
- `/api/v1` serves the PHP JSON API.
- `/uploads` serves media uploaded through the admin.

The React source remains at the project root, while `npm run build` writes its
production files into `backend/public` alongside the PHP entry points.

## Local setup

1. Copy `.env.example` to `.env` and set the actual local MySQL credentials.
2. In phpMyAdmin, select `jooz_db` and import these files in order:

   1. `database/migrations/001_initial.sql`
   2. `database/migrations/002_content_modules.sql`
   3. `database/migrations/003_seed_existing_content.sql`
   4. `database/migrations/004_cms_documents.sql`

   The third migration copies the website's current services, portfolio,
   statistics, team, reviews, studio details, process and FAQs into MySQL. It
   uses stable service/project keys, so importing it again does not create
   duplicate services or portfolio projects.
3. Create the first owner from a PHP terminal:

   ```sh
   php scripts/create-owner.php owner-name a-strong-password
   ```

   The script never stores the plaintext password.

4. Start the PHP development server from the project root:

   ```sh
   php -S 127.0.0.1:8000 -t backend/public backend/router.php
   ```

5. In a second terminal, run `npm run dev`. Open `http://localhost:5173` for
   the website and `http://localhost:5173/admin` for the React CMS. Vite serves
   both React routes and proxies only API and upload requests to PHP, matching
   the production URL layout.

## cPanel deployment

Use PHP 8.2 or newer.

1. Run `npm ci` and `npm run build` locally. This creates the React
   `index.html` and `site-assets` inside `backend/public` without deleting the
   PHP admin or API files.
2. Upload the backend directory, including the generated files in `public`.
3. Point the main domain document root to `backend/public`.
4. Keep `app`, `config`, `scripts`, and `storage` outside the public document
   root when your host permits it. If the host requires this directory layout,
   `.htaccess` still prevents directory listing and only `public` is exposed.
5. Configure `APP_URL`, `ADMIN_ORIGIN`, and `ALLOWED_ORIGINS` as the same HTTPS
   main-domain URL. Keep `API_BASE_URL=/api/v1` and `SESSION_SECURE=true`.
6. Create a dedicated MySQL user with access only to `jooz_db`. Production
   startup intentionally refuses the MySQL `root` account or a blank password.
7. Keep `APP_ENV=production`, enable HTTPS, and never expose `npm run dev` or
   PHP's built-in development server to the internet.

No admin subdomain is required. Visit `https://yourdomain.com/admin` to sign in.

The `storage/cache` directory must be writable by PHP. Cache files are regenerated after content changes; no cron or Redis is required.

## Refreshing the initial content seed

If the bundled fallback content changes before launch, regenerate the seed:

```sh
node backend/scripts/generate-seed.mjs
```

Do not run the generated seed over a live site after editors have started
making changes, because its purpose is to establish the initial content.
