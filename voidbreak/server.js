/**
 * VOIDBREAK — minimal static file server.
 *
 * Zero-dependency Node HTTP server used for development and for serving the
 * game in the browser preview. Serves files from the directory this file
 * lives in, with correct MIME types for ES modules (.js), and no-cache
 * headers so iterating on source is painless.
 */

import http from 'node:http';
import { promises as fs, createReadStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number.parseInt(process.env.PORT ?? '8080', 10);
const HOST = process.env.HOST ?? '0.0.0.0';

const MIME = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.mjs', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.svg', 'image/svg+xml'],
  ['.ico', 'image/x-icon'],
  ['.wasm', 'application/wasm'],
  ['.ogg', 'audio/ogg'],
  ['.wav', 'audio/wav'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
  ['.ttf', 'font/ttf'],
  ['.map', 'application/json'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.md', 'text/markdown; charset=utf-8'],
]);

/** Prevent path traversal: normalize and verify the resolved path stays under ROOT. */
function resolveSafe(urlPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(urlPath);
  } catch {
    decoded = urlPath;
  }
  const normalized = path.normalize(decoded).replace(/^([/\\])+/, '');
  const resolved = path.join(ROOT, normalized);
  if (!resolved.startsWith(ROOT)) return null;
  return resolved;
}

const server = http.createServer(async (req, res) => {
  const urlPath = (req.url ?? '/').split('?')[0].split('#')[0];
  const filePath = resolveSafe(urlPath === '/' ? '/index.html' : urlPath);
  if (!filePath) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }
  try {
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      const indexPath = path.join(filePath, 'index.html');
      await fs.stat(indexPath);
      return serveFile(res, indexPath, stat);
    }
    return serveFile(res, filePath, stat);
  } catch {
    if (!urlPath.includes('.')) {
      try {
        const indexPath = path.join(ROOT, 'index.html');
        const stat = await fs.stat(indexPath);
        return serveFile(res, indexPath, stat);
      } catch { /* fall through to 404 */ }
    }
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

function serveFile(res, filePath, stat) {
  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME.get(ext) ?? 'application/octet-stream';
  res.writeHead(200, {
    'Content-Type': mime,
    'Content-Length': stat.size,
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*',
  });
  createReadStream(filePath).pipe(res);
}

server.listen(PORT, HOST, () => {
  console.log(`[voidbreak] server listening on http://${HOST}:${PORT}`);
  console.log(`[voidbreak] serving ${ROOT}`);
});

server.on('error', (err) => {
  console.error('[voidbreak] server error:', err.message);
  process.exit(1);
});
