#!/usr/bin/env node
/**
 * Fetch latest aviation jobs and write public/data/live-jobs.json
 * Usage: node scripts/fetch-jobs.js
 * Schedule via GitHub Actions, cron, or npm run fetch-jobs
 *
 * After writing live-jobs, regenerates LinkedIn-style job posters
 * (public/job-posters/*.svg + public/data/job-posters.json).
 */
const path = require('path');
const { spawnSync } = require('child_process');
const { aggregateJobs, writeJobsFile } = require('../server/jobAggregator');

async function main() {
  console.log('Runway2Sky — fetching latest aviation jobs…');
  const payload = await aggregateJobs();
  const out = path.join(__dirname, '..', 'public', 'data', 'live-jobs.json');
  writeJobsFile(payload, out);
  console.log(`Wrote ${payload.count} jobs (${payload.liveCount} live) → ${out}`);
  console.log(`Sources: ${payload.sources.join(', ') || 'none'}`);
  console.log(`Updated: ${payload.updatedAt}`);
  if (payload.liveCount === 0) {
    console.log('\nTip: Free public APIs often have few traditional aviation roles.');
    console.log('Add free Adzuna keys for automatic airline/airport/cabin crew feeds:');
    console.log('  1. Sign up at https://developer.adzuna.com/ (free)');
    console.log('  2. Set ADZUNA_APP_ID and ADZUNA_APP_KEY in .env');
    console.log('  3. Optional: RAPIDAPI_KEY for JSearch (Google Jobs / LinkedIn-indexed)');
  }

  // Regenerate LinkedIn-style eligibility posters for job cards
  console.log('\nGenerating job posters…');
  const posters = spawnSync(process.execPath, [path.join(__dirname, 'generate-job-posters.js')], {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
  });
  if (posters.status !== 0) {
    console.warn('Poster generation failed (non-fatal). Run: npm run posters');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
