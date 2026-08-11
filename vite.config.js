import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    cors: true,
    hmr: { clientPort: 443 },
    // Vite 5+ checks host via `server.allowedHosts` - allow the E2B preview host
    allowedHosts: true
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    cors: true
  },
  build: {
    target: 'esnext'
  }
});
