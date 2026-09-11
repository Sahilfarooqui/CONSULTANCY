#!/usr/bin/env node
/**
 * LEGACY — landscape SVG posters (1200×628).
 * Prefer: npm run posters  →  scripts/generate_hiring_posters.py (Pillow, 1080×1350 JPEG).
 * Kept only so old references don't break; new automation uses run-posters.js.
 */
console.warn(
  '[posters] generate-job-posters.js is legacy. Use: npm run posters (Pillow hiring posters).'
);
const { spawnSync } = require('child_process');
const path = require('path');
const res = spawnSync(process.execPath, [path.join(__dirname, 'run-posters.js'), '--force'], {
  stdio: 'inherit',
  cwd: path.join(__dirname, '..'),
});
process.exit(res.status == null ? 1 : res.status);
