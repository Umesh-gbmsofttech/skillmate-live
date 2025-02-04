import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    hmr: { overlay: false },
    headers: {
      'Access-Control-Allow-Origin': '*', // Allows cross-origin requests (if needed)
      'Cache-Control': 'no-cache', // Ensures no caching issues
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Your backend API server
        changeOrigin: true, // Ensures proper handling of cookies and headers
        secure: false, // If you're dealing with HTTP (not HTTPS) during development
      },
    },
  },
});
