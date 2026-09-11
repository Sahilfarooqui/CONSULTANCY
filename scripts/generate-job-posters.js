#!/usr/bin/env node
/**
 * Generate LinkedIn-style job poster SVGs (1200×628) for Runway2Sky job cards.
 * Usage: node scripts/generate-job-posters.js
 * Output: public/job-posters/{id}.svg + public/data/job-posters.json
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const LIVE_JOBS = path.join(ROOT, 'public', 'data', 'live-jobs.json');
const FEATURED_JSON = path.join(ROOT, 'public', 'data', 'featured-jobs.json');
const SRC_JOBS = path.join(ROOT, 'src', 'data', 'jobs.js');
const OUT_DIR = path.join(ROOT, 'public', 'job-posters');
const MAP_PATH = path.join(ROOT, 'public', 'data', 'job-posters.json');

const BRANDS = [
  { re: /indigo|goindigo|interglobe/i, name: 'IndiGo', color: '#EF5B25', color2: '#0B1F3A' },
  { re: /spice\s*jet|spicejet/i, name: 'SpiceJet', color: '#E31837', color2: '#B01028' },
  { re: /air\s*india\s*express/i, name: 'Air India Express', color: '#C8102E', color2: '#8B0A1E' },
  { re: /air\s*india|airindia/i, name: 'Air India', color: '#DA0E29', color2: '#8B0000' },
  { re: /akasa/i, name: 'Akasa Air', color: '#FF6B00', color2: '#C45400' },
  { re: /vistara/i, name: 'Vistara', color: '#5B2C6F', color2: '#4B0082' },
  { re: /emirates/i, name: 'Emirates', color: '#D71921', color2: '#8B0000' },
  { re: /qatar/i, name: 'Qatar Airways', color: '#5C0A2C', color2: '#8B1538' },
  { re: /etihad/i, name: 'Etihad', color: '#BD8B13', color2: '#1A1A1A' },
  { re: /ai\s*sats|aisats/i, name: 'AI SATS', color: '#1B4F72', color2: '#0E2F45' },
  { re: /celebi/i, name: 'Celebi Aviation', color: '#0066A1', color2: '#004466' },
  { re: /bird/i, name: 'Bird Group', color: '#E67E22', color2: '#B35F12' },
  { re: /dnata/i, name: 'dnata', color: '#C8102E', color2: '#8B0A1E' },
  { re: /globe\s*ground/i, name: 'Globe Ground India', color: '#0F766E', color2: '#115E59' },
  { re: /menzies/i, name: 'Menzies Aviation', color: '#1E3A5F', color2: '#0F2744' },
  { re: /runway2sky/i, name: 'Runway2Sky', color: '#0284c7', color2: '#0369a1' },
];

function getBrand(company) {
  const raw = String(company || 'Company');
  const found = BRANDS.find((b) => b.re.test(raw));
  return {
    name: found?.name || raw.split(/[|/–—]/)[0].trim() || 'Company',
    color: found?.color || '#0ea5e9',
    color2: found?.color2 || '#0369a1',
  };
}

function sanitizeId(id) {
  return String(id || 'job')
    .trim()
    .replace(/[^a-zA-Z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'job';
}

function escapeXml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function truncate(s, max) {
  const t = String(s || '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trim()}…`;
}

function synthesizeEligibility(job) {
  const items = [];
  const level = job.level || '';
  const loc = job.location || '';
  const cat = job.category || job.department || '';
  if (/fresher|entry|trainee|junior/i.test(level) || /fresher/i.test(job.title || '')) {
    items.push('Freshers / entry-level candidates welcome');
    items.push('Minimum 10+2 or diploma as per role');
  } else if (/senior|lead|manager|captain/i.test(level) || /experienced|pilot/i.test(job.title || '')) {
    items.push(`${level || 'Experienced'} level — relevant aviation experience preferred`);
    items.push('Valid licences / certifications as applicable');
  } else {
    items.push(level ? `${level} level` : 'Open to qualified aviation candidates');
    items.push('Meet airline / airport medical & background checks');
  }
  if (loc) items.push(`Based in / willing to relocate: ${truncate(loc, 70)}`);
  if (cat) items.push(`Role family: ${cat}`);
  items.push('Strong communication & customer-service mindset');
  items.push('Willing to work shifts / rostered duties as required');
  return items.slice(0, 6);
}

function criteriaFor(job) {
  if (Array.isArray(job.eligibility) && job.eligibility.length) {
    return job.eligibility.map((x) => truncate(x, 78)).slice(0, 6);
  }
  return synthesizeEligibility(job).map((x) => truncate(x, 78));
}

function wrapTitle(title, maxChars, maxLines) {
  const words = String(title || 'Open Position').split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length > maxChars && cur) {
      lines.push(cur);
      cur = w;
      if (lines.length >= maxLines) break;
    } else {
      cur = next;
    }
  }
  if (lines.length < maxLines && cur) lines.push(cur);
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = truncate(lines[maxLines - 1], maxChars);
  }
  return lines.map((l) => truncate(l, maxChars));
}

function buildSvg(job) {
  const brand = getBrand(job.company);
  const criteria = criteriaFor(job);
  const titleLines = wrapTitle(job.title, 36, 2);
  const meta = [job.location && truncate(job.location, 48), job.level]
    .filter(Boolean)
    .join(' · ');
  const badge = /fresher|open|welcome/i.test(`${job.title} ${job.level}`)
    ? 'NOW OPEN'
    : "WE'RE HIRING";

  const W = 1200;
  const H = 628;
  const headerH = 72;

  const titleStartY = 150;
  const titleTspans = titleLines
    .map((line, i) => {
      const y = titleStartY + i * 48;
      return `<tspan x="56" y="${y}">${escapeXml(line)}</tspan>`;
    })
    .join('');

  const companyY = titleStartY + titleLines.length * 48 + 8;
  const metaY = companyY + 36;
  const sectionY = metaY + 44;
  const bulletsStart = sectionY + 36;

  const bullets = criteria
    .map((c, i) => {
      const y = bulletsStart + i * 28;
      return `
      <circle cx="68" cy="${y - 4}" r="4" fill="#ffffff" fill-opacity="0.95"/>
      <text x="84" y="${y}" font-family="Inter,Segoe UI,Helvetica,Arial,sans-serif" font-size="18" fill="#f8fafc">${escapeXml(c)}</text>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${escapeXml(job.title)} — ${escapeXml(brand.name)}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${brand.color}"/>
      <stop offset="55%" stop-color="${brand.color2}"/>
      <stop offset="100%" stop-color="${brand.color}"/>
    </linearGradient>
    <linearGradient id="shade" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.35"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#shade)"/>
  <rect x="0" y="0" width="${W}" height="${headerH}" fill="#000000" fill-opacity="0.28"/>
  <text x="56" y="46" font-family="Inter,Segoe UI,Helvetica,Arial,sans-serif" font-size="22" font-weight="700" letter-spacing="3" fill="#ffffff">${escapeXml(badge)}</text>
  <rect x="${W - 220}" y="22" width="164" height="28" rx="14" fill="#ffffff" fill-opacity="0.18"/>
  <text x="${W - 138}" y="42" text-anchor="middle" font-family="Inter,Segoe UI,Helvetica,Arial,sans-serif" font-size="13" font-weight="600" fill="#ffffff">AVIATION CAREERS</text>
  <text font-family="Inter,Segoe UI,Helvetica,Arial,sans-serif" font-size="42" font-weight="800" fill="#ffffff">${titleTspans}</text>
  <text x="56" y="${companyY}" font-family="Inter,Segoe UI,Helvetica,Arial,sans-serif" font-size="26" font-weight="600" fill="#ffffff" fill-opacity="0.95">${escapeXml(truncate(brand.name, 42))}</text>
  <text x="56" y="${metaY}" font-family="Inter,Segoe UI,Helvetica,Arial,sans-serif" font-size="18" fill="#e2e8f0">${escapeXml(meta || 'India · Aviation')}</text>
  <text x="56" y="${sectionY}" font-family="Inter,Segoe UI,Helvetica,Arial,sans-serif" font-size="14" font-weight="700" letter-spacing="2" fill="#ffffff" fill-opacity="0.85">ELIGIBILITY / CRITERIA</text>
  ${bullets}
  <rect x="0" y="${H - 44}" width="${W}" height="44" fill="#000000" fill-opacity="0.4"/>
  <text x="56" y="${H - 18}" font-family="Inter,Segoe UI,Helvetica,Arial,sans-serif" font-size="15" font-weight="600" fill="#ffffff">Runway2Sky</text>
  <text x="${W - 56}" y="${H - 18}" text-anchor="end" font-family="Inter,Segoe UI,Helvetica,Arial,sans-serif" font-size="15" fill="#cbd5e1">runway2sky.online</text>
</svg>
`;
}

function loadJsonJobs(filePath) {
  if (!fs.existsSync(filePath)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.jobs)) return data.jobs;
    return [];
  } catch (e) {
    console.warn(`Could not parse ${filePath}:`, e.message);
    return [];
  }
}

/** Best-effort extract of job objects from src/data/jobs.js without a full JS parse. */
function loadSrcJobsFallback() {
  if (!fs.existsSync(SRC_JOBS)) return [];
  // Prefer live/featured JSON; src/jobs.js is ES module — skip heavy parse.
  return [];
}

function mergeJobs(...lists) {
  const map = new Map();
  for (const list of lists) {
    for (const job of list) {
      if (!job || !job.id) continue;
      if (!map.has(job.id)) map.set(job.id, job);
    }
  }
  return Array.from(map.values());
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const live = loadJsonJobs(LIVE_JOBS);
  const featured = loadJsonJobs(FEATURED_JSON);
  const jobs = mergeJobs(live, featured, loadSrcJobsFallback());

  if (!jobs.length) {
    console.error('No jobs found in live-jobs.json / featured-jobs.json');
    process.exit(1);
  }

  // Prefer featured first, then rest — generate for all available (typically ~20–40)
  const sorted = [...jobs].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  const map = {};
  let count = 0;

  for (const job of sorted) {
    const sid = sanitizeId(job.id);
    const file = `${sid}.svg`;
    const abs = path.join(OUT_DIR, file);
    const svg = buildSvg(job);
    fs.writeFileSync(abs, svg, 'utf8');
    map[job.id] = `/job-posters/${file}`;
    count += 1;
  }

  fs.writeFileSync(MAP_PATH, `${JSON.stringify(map, null, 2)}\n`, 'utf8');
  console.log(`Generated ${count} LinkedIn-style posters → public/job-posters/`);
  console.log(`Wrote map → public/data/job-posters.json`);
}

main();
