#!/usr/bin/env node
/**
 * Fetch latest aviation jobs and write public/data/live-jobs.json
 * Usage: node scripts/fetch-jobs.js
 * Schedule via GitHub Actions, cron, or npm run fetch-jobs
 *
 * After writing live-jobs, regenerates LinkedIn-style hiring posters
 * for any NEW / missing job ids (public/job-posters/*.jpg + job-posters.json).
 */
const path = require('path');
const { spawnSync } = require('child_process');
const { aggregateJobs, writeJobsFile } = require('../server/jobAggregator');

function runPosters(extraArgs = []) {
  console.log('\nGenerating hiring posters (missing ids)…');
  const posters = spawnSync(process.execPath, [path.join(__dirname, 'run-posters.js'), ...extraArgs], {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, POSTERS_ONLY_MISSING: '1' },
  });
  if (posters.status !== 0) {
    console.warn('Poster generation failed (non-fatal). Run: npm run posters');
  }
}

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

  // Auto: every new job gets a LinkedIn-style hiring poster
  runPosters(['--only-missing']);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
