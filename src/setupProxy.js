const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * Dev proxy: React (3000) → Jobs API server (4000)
 * Run: npm run server (terminal 1) + npm start (terminal 2)
 * Or: npm run dev
 */
module.exports = function setupProxy(app) {
  const raw = process.env.JOBS_API_PROXY || 'http://localhost:4000';
  let target = 'http://localhost:4000';
  try {
    const u = new URL(raw);
    const host = u.hostname;
    const local =
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '::1';
    if (u.protocol === 'http:' && local) {
      target = u.origin;
    } else {
      console.warn('[setupProxy] Ignoring non-local JOBS_API_PROXY:', raw);
    }
  } catch {
    console.warn('[setupProxy] Invalid JOBS_API_PROXY, using localhost:4000');
  }

  app.use(
    '/api',
    createProxyMiddleware({
      target,
      changeOrigin: true,
    })
  );
};
