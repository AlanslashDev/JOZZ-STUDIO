# Security audit

Audit scope: React frontend, PHP API, authentication/session handling, CMS editing, MySQL access, contact forms, media uploads, routing, and deployment configuration.

## Fixed and verified

- SQL values use PDO prepared statements or strict integer/whitelist handling. Dynamic query fragments are limited to internal resource/table maps; no request value is used as SQL syntax.
- Admin routes independently authenticate on the server. State-changing admin requests require the session CSRF token.
- Login uses `password_verify()` with Argon2id-created hashes, session ID rotation, strict cookie sessions, idle/absolute expiry, active-account checks, and login rate limiting.
- Destructive editorial/media deletion is owner-only. Settings writes were already owner-only.
- Uploads validate actual MIME type, size, allowed extensions, random server filenames, and are delivered through a constrained media route rather than executable public paths.
- CMS content rejects control characters and executable/protocol-relative link schemes. React output is escaped and the codebase contains no `dangerouslySetInnerHTML`, shell execution, or eval usage.
- Contact submissions validate server-side, use a honeypot and IP rate limit, and insert through a prepared statement. CSV export protects against spreadsheet formula injection.
- Sensitive runtime errors are logged server-side and return safe generic API/site responses.
- Security headers include CSP, nosniff, frame protection, referrer and permissions policies; HSTS is emitted only over HTTPS.
- Proxy protocol headers are ignored unless `TRUST_PROXY=true` is explicitly configured. Session/cache directories are created with private permissions.
- An additional `backend/.htaccess` deny layer protects app/config/database/scripts/storage and environment files if the Apache document root is accidentally broadened.

## Deployment requirements

- Keep `backend/public` as the only web document root.
- Keep `APP_ENV=production`, HTTPS, `SESSION_SECURE=true`, a dedicated non-root MySQL account, and a strong database password.
- Set `TRUST_PROXY=true` only behind a trusted reverse proxy that overwrites forwarding headers.
- Keep `.env`, storage, migrations and scripts outside the document root where the host permits it.

## Verification

- PHP syntax checks passed for the changed backend files.
- TypeScript/Vite production build passed.
- Static second pass found no SQL string interpolation from request data, shell execution, unsafe HTML injection, or exposed credentials/API keys.
