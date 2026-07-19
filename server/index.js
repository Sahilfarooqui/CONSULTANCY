/**
 * Runway2Sky production server
 * - Serves React build
 * - /api/jobs returns auto-aggregated aviation jobs (cached)
 * - Refreshes on an interval so latest openings stay fresh
 */

const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const { aggregateJobs, writeJobsFile } = require('./jobAggregator');

const PORT = process.env.PORT || 4000;
const CACHE_MS = Number(process.env.JOBS_CACHE_MS || 60 * 60 * 1000); // 1 hour
const PUBLIC_JOBS = path.join(__dirname, '..', 'public', 'data', 'live-jobs.json');
const BUILD_DIR = path.join(__dirname, '..', 'build');

const app = express();
app.use(cors());
app.use(express.json());

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

app.get('/api/jobs', async (req, res) => {
  try {
    const force = req.query.refresh === '1';
    const payload = await refreshJobs(force);
    res.set('Cache-Control', 'public, max-age=300');
    res.json(payload);
  } catch (e) {
    const disk = readDiskJobs();
    if (disk) return res.json(disk);
    res.status(500).json({ error: 'Failed to load jobs', message: e.message });
  }
});

app.post('/api/jobs/refresh', async (req, res) => {
  const secret = process.env.REFRESH_SECRET;
  if (secret && req.headers['x-refresh-secret'] !== secret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const payload = await refreshJobs(true);
    res.json({ ok: true, count: payload.count, updatedAt: payload.updatedAt });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Static React build (production)
if (fs.existsSync(BUILD_DIR)) {
  app.use(express.static(BUILD_DIR));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(BUILD_DIR, 'index.html'));
  });
}

// Also serve public data in dev
app.use('/data', express.static(path.join(__dirname, '..', 'public', 'data')));

async function start() {
  // Warm cache on boot (non-blocking after first disk load)
  const disk = readDiskJobs();
  if (disk) {
    cache.payload = disk;
    cache.fetchedAt = Date.now() - CACHE_MS + 30_000; // refresh soon
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Runway2Sky listening on 0.0.0.0:${PORT}`);
    console.log(`Jobs API: /api/jobs`);
    console.log(`Adzuna: ${process.env.ADZUNA_APP_ID ? 'configured' : 'MISSING — set ADZUNA_APP_ID + ADZUNA_APP_KEY'}`);
  });

  // Background refresh
  refreshJobs(true).catch((e) => console.warn('[server] initial refresh:', e.message));
  setInterval(() => {
    refreshJobs(true).catch((e) => console.warn('[server] scheduled refresh:', e.message));
  }, CACHE_MS);
}

start();
