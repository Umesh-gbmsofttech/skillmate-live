import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [ react() ],
  define: {
    global: {}, // 👈 This defines `global` to prevent errors
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    hmr: { overlay: false },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache',
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
