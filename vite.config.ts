import { defineConfig } from 'vite';
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: { host: 'localhost' },
    cors: true,
    headers: { 'X-Frame-Options': 'ALLOWALL' },
    // @ts-ignore — allow e2b preview host
    allowedHosts: true
  },
  preview: {
    host: '0.0.0.0',
    port: 4173
  },
  build: {
    target: 'esnext'
  }
});
