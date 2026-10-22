import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Run the repository PHP API with:
// php -S 127.0.0.1:8000 -t backend/public backend/router.php
const phpBackend = 'http://127.0.0.1:8000'
const proxy = {
  '/api': { target: phpBackend, changeOrigin: false },
  '/uploads': { target: phpBackend, changeOrigin: false },
}

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
    proxy,
  },
  preview: {
    proxy,
  },
  build: {
    // React and PHP share one production document root. Keep PHP's index.php,
    // .htaccess and /admin intact while replacing the generated React files.
    outDir: 'backend/public',
    assetsDir: 'site-assets',
    emptyOutDir: false,
  },
})
