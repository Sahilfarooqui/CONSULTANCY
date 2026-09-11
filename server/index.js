/**
 * Runway2Sky production server
 * - Serves React build
 * - /api/jobs returns auto-aggregated aviation jobs (cached)
 * - Refreshes on an interval so latest openings stay fresh
 * - Hardened: helmet, CORS allowlist, rate limits, refresh auth, trust proxy
 */

const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { aggregateJobs, writeJobsFile } = require('./jobAggregator');

const PORT = process.env.PORT || 4000;
const CACHE_MS = Number(process.env.JOBS_CACHE_MS || 60 * 60 * 1000); // 1 hour
const IS_PROD = process.env.NODE_ENV === 'production';
const PUBLIC_JOBS = path.join(__dirname, '..', 'public', 'data', 'live-jobs.json');
const BUILD_DIR = path.join(__dirname, '..', 'build');
const PUBLIC_DATA_DIR = path.join(__dirname, '..', 'public', 'data');

const DEFAULT_ORIGINS = [
  'https://runway2sky.online',
  'https://www.runway2sky.online',
  'https://runway2sky.onrender.com',
];

const DEV_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:4000',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:4000',
];

function buildAllowedOrigins() {
  const extra = String(process.env.CORS_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const list = [...DEFAULT_ORIGINS, ...extra];
  if (!IS_PROD) list.push(...DEV_ORIGINS);
  return new Set(list);
}

const ALLOWED_ORIGINS = buildAllowedOrigins();

function secretsEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

function isWeakRefreshSecret(secret) {
  if (!secret) return true;
  const weak = new Set(['change-me', 'change-me-for-manual-refresh', 'secret', 'password']);
  return weak.has(secret);
}

/** Force refresh requires a configured, non-placeholder REFRESH_SECRET. */
function isAuthorizedRefresh(req) {
  const secret = process.env.REFRESH_SECRET;
  if (isWeakRefreshSecret(secret)) {
    // Fail closed for force-refresh when secret missing/placeholder (esp. production)
    return false;
  }
  const provided =
    (typeof req.headers['x-refresh-secret'] === 'string' && req.headers['x-refresh-secret']) ||
    (typeof req.query.secret === 'string' && req.query.secret) ||
    '';
  return secretsEqual(provided, secret);
}

function parseRefreshFlag(raw) {
  if (raw === undefined || raw === null || raw === '') return false;
  if (Array.isArray(raw)) raw = raw[0];
  if (typeof raw !== 'string') return false;
  return raw === '1' || raw.toLowerCase() === 'true';
}

const app = express();

// Render / reverse proxies
app.set('trust proxy', 1);

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'default-src': ["'self'"],
        'script-src': ["'self'", "'unsafe-inline'"],
        'style-src': ["'self'", "'unsafe-inline'"],
        'img-src': ["'self'", 'data:', 'https:'],
        'font-src': ["'self'", 'data:'],
        'connect-src': ["'self'", 'https://formspree.io'],
        'form-action': ["'self'", 'https://formspree.io'],
        'frame-ancestors': ["'none'"],
        'object-src': ["'none'"],
        'base-uri': ["'self'"],
        'upgrade-insecure-requests': null,
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

app.use(
  cors({
    origin(origin, callback) {
      // Non-browser / same-origin requests often omit Origin
      if (!origin) return callback(null, true);
      if (ALLOWED_ORIGINS.has(origin)) return callback(null, true);
      return callback(new Error('CORS origin not allowed'));
    },
    methods: ['GET', 'HEAD', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'X-Refresh-Secret'],
    maxAge: 86400,
  })
);

// Reject oversized JSON bodies
app.use(express.json({ limit: '32kb' }));

const jobsReadLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests' },
});

const jobsWriteLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many refresh requests' },
});

let cache = {
  payload: null,
  fetchedAt: 0,
  refreshing: false,
};

function readDiskJobs() {
  try {
    if (fs.existsSync(PUBLIC_JOBS)) {
      return JSON.parse(fs.readFileSync(PUBLIC_JOBS, 'utf8'));
    }
  } catch (e) {
    console.warn('[server] disk jobs read failed:', e.message);
  }
  return null;
}

async function refreshJobs(force = false) {
  const age = Date.now() - cache.fetchedAt;
  if (!force && cache.payload && age < CACHE_MS) return cache.payload;
  if (cache.refreshing) return cache.payload || readDiskJobs();

  cache.refreshing = true;
  try {
    console.log('[server] Refreshing aviation jobs…');
    const payload = await aggregateJobs();
    cache.payload = payload;
    cache.fetchedAt = Date.now();
    writeJobsFile(payload, PUBLIC_JOBS);
    console.log(`[server] Jobs refreshed: ${payload.count} roles (${payload.liveCount} live)`);
    return payload;
  } catch (e) {
    console.error('[server] Refresh failed:', e.message);
    const disk = readDiskJobs();
    if (disk) {
      cache.payload = disk;
      return disk;
    }
    throw e;
  } finally {
    cache.refreshing = false;
  }
}

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    brand: 'Runway2Sky',
    domain: 'runway2sky.online',
    jobsCachedAt: cache.fetchedAt ? new Date(cache.fetchedAt).toISOString() : null,
    jobsCount: cache.payload ? cache.payload.count : null,
  });
});

// Public GET — force refresh only with REFRESH_SECRET
app.get('/api/jobs', jobsReadLimiter, async (req, res) => {
  try {
    const wantsForce = parseRefreshFlag(req.query.refresh);
    if (wantsForce && !isAuthorizedRefresh(req)) {
      return res.status(401).json({ error: 'Unauthorized — force refresh requires REFRESH_SECRET' });
    }
    const payload = await refreshJobs(wantsForce);
    res.set('Cache-Control', wantsForce ? 'no-store' : 'public, max-age=300');
    res.json(payload);
  } catch (e) {
    const disk = readDiskJobs();
    if (disk) return res.json(disk);
    res.status(500).json({ error: 'Failed to load jobs', message: e.message });
  }
});

app.post('/api/jobs/refresh', jobsWriteLimiter, async (req, res) => {
  if (!isAuthorizedRefresh(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const payload = await refreshJobs(true);
    res.json({ ok: true, count: payload.count, updatedAt: payload.updatedAt });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Static React build (production) — no path traversal via catch-all
if (fs.existsSync(BUILD_DIR)) {
  app.use(
    express.static(BUILD_DIR, {
      dotfiles: 'deny',
      index: false,
      fallthrough: true,
    })
  );
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    // Only SPA shell — never reflect user path into filesystem
    res.sendFile(path.join(BUILD_DIR, 'index.html'));
  });
}

// Public data JSON (fixed directory; express.static rejects ..)
app.use(
  '/data',
  express.static(PUBLIC_DATA_DIR, {
    dotfiles: 'deny',
    index: false,
    fallthrough: false,
  })
);

// CORS error → 403 JSON (avoid Express default HTML stack)
app.use((err, _req, res, next) => {
  if (err && err.message === 'CORS origin not allowed') {
    return res.status(403).json({ error: 'Origin not allowed' });
  }
  return next(err);
});

async function start() {
  const disk = readDiskJobs();
  if (disk) {
    cache.payload = disk;
    cache.fetchedAt = Date.now() - CACHE_MS + 30_000; // refresh soon
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Runway2Sky listening on 0.0.0.0:${PORT}`);
    console.log(`Jobs API: /api/jobs`);
    console.log(`Adzuna: ${process.env.ADZUNA_APP_ID ? 'configured' : 'MISSING — set ADZUNA_APP_ID + ADZUNA_APP_KEY'}`);
    if (isWeakRefreshSecret(process.env.REFRESH_SECRET)) {
      console.warn('[server] REFRESH_SECRET missing or placeholder — force refresh disabled');
    }
  });

  refreshJobs(true).catch((e) => console.warn('[server] initial refresh:', e.message));
  setInterval(() => {
    refreshJobs(true).catch((e) => console.warn('[server] scheduled refresh:', e.message));
  }, CACHE_MS);
}

start();
