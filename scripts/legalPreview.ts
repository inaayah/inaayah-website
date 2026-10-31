import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Plugin, PreviewServer, ViteDevServer } from 'vite';

const root = '/games/vigilante-red-city';
const routes: Record<string, string> = {
  [`${root}/privacy`]: 'games/vigilante-red-city/privacy.html',
  [`${root}/terms`]: 'games/vigilante-red-city/terms.html',
  [`${root}/delete-data`]: 'games/vigilante-red-city/delete-data.html',
};
const legacy: Record<string, string> = {
  '/privacy/vigilante-red-city.html': `${root}/privacy`,
  '/privacy/vigilante-red-city': `${root}/privacy`,
  '/privacy/vigilante-red-city-delete-data.html': `${root}/delete-data`,
  '/privacy/vigilante-red-city-delete-data': `${root}/delete-data`,
  '/terms/vigilante-red-city.html': `${root}/terms`,
  '/terms/vigilante-red-city': `${root}/terms`,
};

// Local review only. .legal-preview is ignored by Git and never emitted by Vite.
// Production policy files must be exported through the approved document workflow.
export function legalPreview(): Plugin {
  function install(server: ViteDevServer | PreviewServer) {
    server.middlewares.use((req, res, next) => {
      const url = new URL(req.url ?? '/', 'http://localhost');
      const normalized = url.pathname.replace(/\/$/, '');
      const alias = legacy[url.pathname] ?? (routes[normalized] && normalized !== url.pathname ? normalized : undefined)
        ?? (normalized.endsWith('.html') && routes[normalized.slice(0, -5)] ? normalized.slice(0, -5) : undefined);
      if (alias) {
        res.writeHead(301, { Location: alias + url.search });
        res.end();
        return;
      }
      const file = routes[normalized];
      if (!file) { next(); return; }
      if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); res.end(); return; }
      const approved = resolve(server.config.root, 'public', file);
      const preview = resolve(server.config.root, '.legal-preview', file);
      const source = existsSync(approved) ? approved : existsSync(preview) ? preview : null;
      if (!source) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('Document not available.'); return; }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', ...(source === preview ? { 'X-Robots-Tag': 'noindex, nofollow' } : {}) });
      res.end(req.method === 'HEAD' ? undefined : readFileSync(source));
    });
  }
  return { name: 'local-game-document-review', configureServer: install, configurePreviewServer: install };
}
