#!/usr/bin/env node
/**
 * Cross-platform runner for LinkedIn-style hiring poster generator.
 * Prefers repo .venv, then python3, then python.
 *
 * Env:
 *   POSTERS_FORCE=1     regenerate all
 *   POSTERS_ONLY_MISSING=1  (default) only missing ids
 *   POSTERS_JOB_ID=id   single job
 */
const path = require('path');
const fs = require('fs');
const { spawnSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const SCRIPT = path.join(__dirname, 'generate_hiring_posters.py');

function resolvePython() {
  const venvUnix = path.join(ROOT, '.venv', 'bin', 'python');
  const venvWin = path.join(ROOT, '.venv', 'Scripts', 'python.exe');
  if (fs.existsSync(venvUnix)) return venvUnix;
  if (fs.existsSync(venvWin)) return venvWin;
  return process.platform === 'win32' ? 'python' : 'python3';
}

function main() {
  const args = [SCRIPT];
  if (process.env.POSTERS_FORCE === '1' || process.argv.includes('--force')) {
    args.push('--force');
  } else {
    args.push('--only-missing');
  }
  if (process.env.POSTERS_JOB_ID) {
    args.push('--job-id', process.env.POSTERS_JOB_ID);
  }
  const extra = process.argv.slice(2).filter((a) => a !== '--force');
  args.push(...extra);

  const py = resolvePython();
  console.log(`[posters] ${py} ${args.map((a) => path.basename(a) === 'generate_hiring_posters.py' ? a : a).join(' ')}`);
  const res = spawnSync(py, args, { stdio: 'inherit', cwd: ROOT, env: process.env });
  if (res.error) {
    console.warn('[posters] failed to spawn python:', res.error.message);
    console.warn('[posters] Create venv: python3 -m venv .venv && .venv/bin/pip install Pillow');
    process.exit(1);
  }
  process.exit(res.status == null ? 1 : res.status);
}

main();
