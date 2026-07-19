/**
 * Client-side jobs loader for Runway2Sky
 * Prefers live API, falls back to static JSON, then curated featured list.
 */

import featuredJobs from '../data/jobs';

const API_CANDIDATES = [
  process.env.REACT_APP_JOBS_API_URL,
  '/api/jobs',
  `${typeof window !== 'undefined' ? window.location.origin : ''}/api/jobs`,
  '/data/live-jobs.json',
].filter(Boolean);

// Deduplicate consecutive same URLs
const uniqueUrls = [...new Set(API_CANDIDATES)];

function mergeJobs(livePayload, featured) {
  const live = (livePayload && livePayload.jobs) || [];
  const map = new Map();

  // Featured / direct roles first (pin partner placements)
  for (const job of featured) {
    map.set(`${job.title}|${job.company}`.toLowerCase(), { ...job, featured: true });
  }
  for (const job of live) {
    const key = `${job.title}|${job.company}`.toLowerCase();
    if (!map.has(key)) map.set(key, job);
  }

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.postedAt || 0) - new Date(a.postedAt || 0)
  );
}

export async function loadJobs({ forceRefresh = false } = {}) {
  const errors = [];

  for (const url of uniqueUrls) {
    try {
      const endpoint =
        forceRefresh && url.includes('/api/jobs')
          ? `${url}${url.includes('?') ? '&' : '?'}refresh=1`
          : url;

      const res = await fetch(endpoint, {
        headers: { Accept: 'application/json' },
        cache: forceRefresh ? 'no-store' : 'default',
      });
      if (!res.ok) throw new Error(`${endpoint} → ${res.status}`);
      const data = await res.json();

      // Static file or API both supported
      const payload = Array.isArray(data)
        ? { jobs: data, updatedAt: null, count: data.length, liveCount: data.length }
        : data;

      if (!payload.jobs && !Array.isArray(data)) continue;

      const jobs = mergeJobs(payload, featuredJobs);
      return {
        jobs,
        updatedAt: payload.updatedAt || null,
        sources: payload.sources || [...new Set(jobs.map((j) => j.source))],
        liveCount: payload.liveCount ?? jobs.filter((j) => j.live).length,
        from: endpoint,
        offline: false,
      };
    } catch (e) {
      errors.push(e.message);
    }
  }

  // Offline / first-run fallback — curated featured only
  return {
    jobs: featuredJobs.map((j) => ({ ...j, featured: true })),
    updatedAt: null,
    sources: [...new Set(featuredJobs.map((j) => j.source))],
    liveCount: 0,
    from: 'featured-fallback',
    offline: true,
    errors,
  };
}

export function extractFilterOptions(jobs) {
  const categories = ['All', ...new Set(jobs.map((j) => j.category).filter(Boolean))].sort((a, b) =>
    a === 'All' ? -1 : b === 'All' ? 1 : a.localeCompare(b)
  );
  const levels = ['All', ...new Set(jobs.map((j) => j.level).filter(Boolean))];
  const types = ['All', ...new Set(jobs.map((j) => j.type).filter(Boolean))];
  const sources = ['All', ...new Set(jobs.map((j) => j.source).filter(Boolean))].sort((a, b) =>
    a === 'All' ? -1 : b === 'All' ? 1 : a.localeCompare(b)
  );
  return { categories, levels, types, sources };
}
