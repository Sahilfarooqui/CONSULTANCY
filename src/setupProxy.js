const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * Dev proxy: React (3000) → Jobs API server (4000)
 * Run: npm run server (terminal 1) + npm start (terminal 2)
 * Or: npm run dev
 */
module.exports = function setupProxy(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.JOBS_API_PROXY || 'http://localhost:4000',
      changeOrigin: true,
    })
  );
};
