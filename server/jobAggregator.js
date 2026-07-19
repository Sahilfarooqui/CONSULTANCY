/**
 * Runway2Sky aviation job aggregator
 * Pulls latest openings from public job APIs + optional Adzuna / JSearch keys.
 * LinkedIn scraping is intentionally NOT used (ToS / legal). Adzuna & JSearch
 * surface many of the same roles that appear on LinkedIn and company boards.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const AVIATION_INCLUDE = [
  'aviation',
  'aerospace',
  'aircraft',
  'airline',
  'airlines',
  'airport',
  'airports',
  'avionics',
  'cabin crew',
  'flight attendant',
  'flight attendants',
  'pilot',
  'first officer',
  'captain',
  'air traffic',
  'flight operations',
  'flight ops',
  'ground handling',
  'ground operations',
  'ramp agent',
  'baggage handler',
  'air cargo',
  'cargo operations',
  'load controller',
  'load control',
  'mro',
  'aircraft maintenance',
  'aircraft engineer',
  'a&p mechanic',
  'licensed aircraft',
  'line maintenance',
  'base maintenance',
  'type rating',
  'cabin services',
  'in-flight',
  'inflight',
  'crew scheduling',
  'flight dispatcher',
  'aircraft dispatcher',
  'helicopter',
  'rotorcraft',
  'faa ',
  'easa',
  'icao',
  'gcaa',
  'qatar airways',
  'emirates',
  'etihad',
  'flydubai',
  'saudi airline',
  'saudia',
  'air arabia',
  'gulf air',
  'oman air',
  'hamad international',
  'dxb',
  'a320',
  'b737',
  'boeing',
  'airbus',
];

const AVIATION_EXCLUDE = [
  'air defense',
  'air force',
  'national guard',
  'army air',
  'air quality',
  'air conditioning',
  'open air',
  'on air',
  'hot air',
  'air fryer',
  'airbnb',
  'airtime',
  'airdrop',
  'airtable',
  'patient care',
  'nurse',
  'nursing',
  'planned parenthood',
];

const SEARCH_QUERIES = [
  'aviation',
  'airline',
  'aircraft maintenance',
  'cabin crew',
  'airport operations',
  'aerospace engineer',
  'flight attendant',
  'avionics',
  'pilot first officer',
  'ground handling airport',
];

const ADZUNA_COUNTRIES = ['ae', 'gb', 'us', 'in', 'sa', 'ca', 'au', 'de', 'fr', 'nl', 'qa', 'sg', 'ie', 'nz'];

function fetchJson(url, options = {}) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(
      url,
      {
        headers: {
          'User-Agent': 'Runway2SkyBot/1.0 (+https://runway2sky.online; aviation jobs aggregator)',
          Accept: 'application/json, text/plain, */*',
          ...(options.headers || {}),
        },
        timeout: options.timeout || 25000,
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchJson(res.headers.location, options).then(resolve).catch(reject);
          return;
        }
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          if (res.statusCode < 200 || res.statusCode >= 300) {
            reject(new Error(`HTTP ${res.statusCode} for ${url}`));
            return;
          }
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Invalid JSON from ${url}: ${e.message}`));
          }
        });
      }
    );
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Timeout ${url}`));
    });
  });
}

function stripHtml(html) {
  return String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function haystack(job) {
  // Do NOT include guessed category — that caused false positives (default "Aviation")
  return [job.title, job.company, job.location, job.description, ...(job.tags || [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

function hasPhrase(text, phrase) {
  // Word-boundary-ish match so "airline" does not fire only because a customer list says "United Airlines" in a SaaS blurb alone —
  // multi-word phrases match as substrings; single tokens use boundaries.
  const p = phrase.toLowerCase();
  if (p.includes(' ') || p.includes('&') || p.includes('-')) {
    return text.includes(p);
  }
  return new RegExp(`(^|[^a-z0-9])${p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z0-9]|$)`, 'i').test(text);
}

function isAviationRelated(job) {
  const text = haystack(job);
  if (!text || text.length < 8) return false;
  if (AVIATION_EXCLUDE.some((x) => hasPhrase(text, x) || text.includes(x))) return false;

  const titleCompany = `${job.title || ''} ${job.company || ''}`.toLowerCase();
  const strong = AVIATION_INCLUDE.filter((k) => k.length >= 4);

  const titleHits = strong.filter((x) => hasPhrase(titleCompany, x));
  if (titleHits.length >= 1) return true;

  // Body: require a clear aviation role phrase, not a brand name buried in marketing copy
  const rolePhrases = [
    'cabin crew',
    'flight attendant',
    'aircraft maintenance',
    'avionics',
    'first officer',
    'second officer',
    'airline pilot',
    'aerospace engineer',
    'air traffic controller',
    'air traffic control',
    'ground handling',
    'ground operations',
    'licensed aircraft',
    'flight operations',
    'aircraft engineer',
    'aircraft mechanic',
    'ramp agent',
    'load controller',
    'flight dispatcher',
    'aviation safety',
    'aviation security',
    'airport operations',
    'line maintenance',
    'base maintenance',
    'type rating',
  ];
  if (rolePhrases.some((x) => text.includes(x))) return true;

  // Multiple independent industry terms in body (not just "Airlines" as a customer logo)
  const industry = [
    'aviation',
    'aerospace',
    'aircraft',
    'avionics',
    'airport',
    'helicopter',
    'airbus',
    'boeing',
  ];
  const industryHits = industry.filter((x) => hasPhrase(text, x));
  if (industryHits.length >= 2) return true;

  return false;
}

function guessLevel(title, description) {
  const t = `${title} ${description}`.toLowerCase();
  if (/\b(senior|sr\.|lead|principal|head of|director|manager|chief)\b/.test(t)) return 'Senior';
  if (/\b(mid-level|intermediate|experienced)\b/.test(t)) return 'Mid';
  if (/\b(junior|jr\.|entry[- ]level|graduate|intern|trainee|apprentice|fresher|no experience)\b/.test(t)) {
    return 'Fresher';
  }
  if (/\b(1\+? year|2\+? years|minimum 2)\b/.test(t)) return 'Junior';
  return 'Any';
}

function guessCategory(title, description) {
  const t = `${title} ${description}`.toLowerCase();
  if (/cabin crew|flight attendant|purser|cabin service/.test(t)) return 'Cabin Crew';
  if (/pilot|first officer|captain|type rating|flight deck/.test(t)) return 'Flight Deck';
  if (/avionics|aircraft maintenance|a&p|mro|aircraft engineer|line maintenance|base maintenance/.test(t)) {
    return 'Engineering & MRO';
  }
  if (/ground|ramp|baggage|check-in|passenger service|gate agent|ground handling/.test(t)) {
    return 'Ground Operations';
  }
  if (/dispatch|flight ops|flight operations|load control|operations control/.test(t)) {
    return 'Flight Operations';
  }
  if (/cargo|freight|uld/.test(t)) return 'Cargo';
  if (/security|avsec|screener/.test(t)) return 'Security';
  if (/aerospace|design engineer|systems engineer/.test(t)) return 'Aerospace Engineering';
  if (/safety|compliance|sms|quality/.test(t)) return 'Safety & Compliance';
  if (/ticketing|reservations|sales|commercial|revenue/.test(t)) return 'Commercial';
  return 'Aviation';
}

function guessType(raw) {
  const t = String(raw || '').toLowerCase();
  if (t.includes('part')) return 'Part-time';
  if (t.includes('contract') || t.includes('temp')) return 'Contract';
  if (t.includes('intern')) return 'Internship';
  return 'Full-time';
}

function normalizeJob(partial) {
  const title = (partial.title || 'Aviation Role').trim();
  const company = (partial.company || 'Employer').trim();
  const description = stripHtml(partial.description || '').slice(0, 600);
  const applyUrl = partial.applyUrl || partial.url || '#';
  const idSeed = partial.id || `${title}-${company}-${applyUrl}`.toLowerCase();
  const id = `live-${Buffer.from(idSeed).toString('base64url').slice(0, 24)}`;
  const rawTags = Array.isArray(partial.tags) ? partial.tags.map(String) : [];

  const job = {
    id,
    title,
    company,
    location: partial.location || 'See listing',
    type: guessType(partial.type),
    category: partial.category || guessCategory(title, description),
    level: partial.level || guessLevel(title, description),
    salary: partial.salary || 'See listing',
    source: partial.source || 'Live Feed',
    postedAt: partial.postedAt || new Date().toISOString().slice(0, 10),
    applyUrl,
    description: description || 'Open aviation role — click Apply for full details on the source site.',
    // Keep raw tags only for matching/display — don't inject "Aviation" before filter
    tags: rawTags.length ? rawTags.slice(0, 8) : ['Live'],
    live: true,
  };
  return job;
}

function dedupeJobs(jobs) {
  const seen = new Set();
  const out = [];
  for (const job of jobs) {
    const key = `${job.title}|${job.company}`.toLowerCase().replace(/\s+/g, ' ');
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(job);
  }
  return out;
}

function passesAviationGate(partial) {
  // Filter on raw fields before normalize injects defaults
  return isAviationRelated({
    title: partial.title,
    company: partial.company,
    location: partial.location,
    description: stripHtml(partial.description || '').slice(0, 2000),
    tags: partial.tags || [],
  });
}

async function fetchRemotive() {
  const jobs = [];
  try {
    const data = await fetchJson('https://remotive.com/api/remote-jobs');
    for (const j of data.jobs || []) {
      const partial = {
        id: `remotive-${j.id}`,
        title: j.title,
        company: j.company_name,
        location: j.candidate_required_location || 'Remote',
        type: j.job_type,
        description: j.description,
        applyUrl: j.url,
        source: 'Remotive',
        postedAt: (j.publication_date || '').slice(0, 10),
        tags: j.tags || ['Remote'],
        salary: j.salary || 'See listing',
      };
      if (passesAviationGate(partial)) jobs.push(normalizeJob(partial));
    }
  } catch (e) {
    console.warn('[aggregator] Remotive:', e.message);
  }
  return jobs;
}

async function fetchRemoteOK() {
  const jobs = [];
  try {
    const data = await fetchJson('https://remoteok.com/api');
    const rows = Array.isArray(data) ? data.slice(1) : [];
    for (const j of rows) {
      const partial = {
        id: `remoteok-${j.id || j.slug}`,
        title: j.position || j.title,
        company: j.company,
        location: j.location || 'Remote',
        description: j.description,
        applyUrl: j.url || j.apply_url || (j.id ? `https://remoteok.com/remote-jobs/${j.id}` : 'https://remoteok.com'),
        source: 'RemoteOK',
        postedAt: j.date ? new Date(j.date).toISOString().slice(0, 10) : undefined,
        tags: j.tags || ['Remote'],
        salary: j.salary_min && j.salary_max ? `$${j.salary_min} – $${j.salary_max}` : 'See listing',
      };
      if (passesAviationGate(partial)) jobs.push(normalizeJob(partial));
    }
  } catch (e) {
    console.warn('[aggregator] RemoteOK:', e.message);
  }
  return jobs;
}

async function fetchArbeitnow() {
  const jobs = [];
  try {
    const data = await fetchJson('https://www.arbeitnow.com/api/job-board-api');
    for (const j of data.data || []) {
      const partial = {
        id: `arbeitnow-${j.slug}`,
        title: j.title,
        company: j.company_name,
        location: j.location || 'Europe',
        type: j.job_types && j.job_types[0],
        description: j.description,
        applyUrl: j.url,
        source: 'Arbeitnow',
        postedAt: j.created_at ? new Date(j.created_at * 1000).toISOString().slice(0, 10) : undefined,
        tags: j.tags || [],
      };
      if (passesAviationGate(partial)) jobs.push(normalizeJob(partial));
    }
  } catch (e) {
    console.warn('[aggregator] Arbeitnow:', e.message);
  }
  return jobs;
}

async function fetchJobicy() {
  const jobs = [];
  const tags = ['aviation', 'aerospace', 'airline'];
  for (const tag of tags) {
    try {
      const data = await fetchJson(`https://jobicy.com/api/v2/remote-jobs?count=50&tag=${encodeURIComponent(tag)}`);
      for (const j of data.jobs || []) {
        const partial = {
          id: `jobicy-${j.id}`,
          title: j.jobTitle,
          company: j.companyName,
          location: j.jobGeo || 'Remote',
          type: j.jobType && j.jobType[0],
          description: j.jobExcerpt || j.jobDescription,
          applyUrl: j.url,
          source: 'Jobicy',
          postedAt: (j.pubDate || '').slice(0, 10),
          tags: j.jobIndustry || ['Remote'],
          salary: j.annualSalaryMin
            ? `${j.salaryCurrency || ''} ${j.annualSalaryMin}${j.annualSalaryMax ? ` – ${j.annualSalaryMax}` : ''}`.trim()
            : 'See listing',
        };
        if (passesAviationGate(partial)) jobs.push(normalizeJob(partial));
      }
    } catch (e) {
      console.warn('[aggregator] Jobicy:', e.message);
    }
  }
  return jobs;
}

async function fetchTheMuse() {
  const jobs = [];
  try {
    for (let page = 0; page < 3; page += 1) {
      const data = await fetchJson(`https://www.themuse.com/api/public/jobs?page=${page}&descending=true`);
      for (const j of data.results || []) {
        const locs = (j.locations || []).map((l) => l.name).join(', ');
        const cats = (j.categories || []).map((c) => c.name);
        const partial = {
          id: `muse-${j.id}`,
          title: j.name,
          company: j.company && j.company.name,
          location: locs || 'See listing',
          description: j.contents,
          applyUrl: j.refs && j.refs.landing_page,
          source: 'The Muse',
          postedAt: (j.publication_date || '').slice(0, 10),
          tags: cats,
          category: cats[0],
        };
        if (passesAviationGate(partial)) jobs.push(normalizeJob(partial));
      }
    }
  } catch (e) {
    console.warn('[aggregator] The Muse:', e.message);
  }
  return jobs;
}

/**
 * Adzuna free developer API — best source for real aviation / airport / airline roles.
 * Free signup: https://developer.adzuna.com/
 * Env: ADZUNA_APP_ID, ADZUNA_APP_KEY
 */
async function fetchAdzuna() {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;
  if (!appId || !appKey) {
    console.warn('[aggregator] Adzuna skipped (set ADZUNA_APP_ID + ADZUNA_APP_KEY for full auto-feed)');
    return [];
  }

  const jobs = [];
  const countries = (process.env.ADZUNA_COUNTRIES || ADZUNA_COUNTRIES.join(',')).split(',').map((c) => c.trim()).filter(Boolean);
  const queries = (process.env.ADZUNA_QUERIES || SEARCH_QUERIES.join('|')).split('|').map((q) => q.trim()).filter(Boolean);

  // Limit calls to stay within free tier
  const maxCalls = Number(process.env.ADZUNA_MAX_CALLS || 24);
  let calls = 0;

  for (const country of countries) {
    for (const what of queries) {
      if (calls >= maxCalls) break;
      calls += 1;
      const url =
        `https://api.adzuna.com/v1/api/jobs/${country}/search/1` +
        `?app_id=${encodeURIComponent(appId)}` +
        `&app_key=${encodeURIComponent(appKey)}` +
        `&results_per_page=50` +
        `&what=${encodeURIComponent(what)}` +
        `&content-type=application/json` +
        `&sort_by=date`;
      try {
        const data = await fetchJson(url);
        for (const j of data.results || []) {
          const partial = {
            id: `adzuna-${j.id}`,
            title: j.title,
            company: (j.company && j.company.display_name) || 'Company',
            location: (j.location && j.location.display_name) || country.toUpperCase(),
            type: j.contract_time || j.contract_type,
            description: j.description,
            applyUrl: j.redirect_url,
            source: 'Adzuna',
            postedAt: (j.created || '').slice(0, 10),
            salary:
              j.salary_min && j.salary_max
                ? `${Math.round(j.salary_min).toLocaleString()} – ${Math.round(j.salary_max).toLocaleString()} ${j.salary_is_predicted === '1' ? '(est.)' : ''}`.trim()
                : 'See listing',
            tags: [what, country.toUpperCase()],
          };
          // Adzuna queries are already aviation-targeted — still gate to drop noise
          if (passesAviationGate(partial)) jobs.push(normalizeJob(partial));
        }
      } catch (e) {
        console.warn(`[aggregator] Adzuna ${country}/${what}:`, e.message);
      }
    }
  }
  return jobs;
}

/**
 * JSearch (RapidAPI) aggregates Google for Jobs — often includes LinkedIn & company pages.
 * Free tier available: https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch
 * Env: RAPIDAPI_KEY
 */
async function fetchJSearch() {
  const key = process.env.RAPIDAPI_KEY || process.env.JSEARCH_API_KEY;
  if (!key) {
    console.warn('[aggregator] JSearch skipped (set RAPIDAPI_KEY for Google/LinkedIn-indexed jobs)');
    return [];
  }

  const jobs = [];
  const queries = [
    'aviation jobs',
    'cabin crew',
    'aircraft maintenance engineer',
    'airport jobs Qatar',
    'airline ground staff',
    'aerospace engineer',
  ];

  for (const q of queries) {
    const url =
      `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(q)}` +
      `&page=1&num_pages=1&date_posted=month`;
    try {
      const data = await fetchJson(url, {
        headers: {
          'X-RapidAPI-Key': key,
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
        },
      });
      for (const j of data.data || []) {
        const partial = {
          id: `jsearch-${j.job_id}`,
          title: j.job_title,
          company: j.employer_name,
          location: [j.job_city, j.job_state, j.job_country].filter(Boolean).join(', ') || 'See listing',
          type: j.job_employment_type,
          description: j.job_description,
          applyUrl: j.job_apply_link || j.job_google_link,
          source: j.job_publisher || 'Google Jobs',
          postedAt: j.job_posted_at_datetime_utc
            ? j.job_posted_at_datetime_utc.slice(0, 10)
            : undefined,
          salary: j.job_min_salary
            ? `${j.job_min_salary}${j.job_max_salary ? ` – ${j.job_max_salary}` : ''} ${j.job_salary_currency || ''}`.trim()
            : 'See listing',
          tags: (j.job_required_skills || []).slice(0, 5),
        };
        if (passesAviationGate(partial)) jobs.push(normalizeJob(partial));
      }
    } catch (e) {
      console.warn('[aggregator] JSearch:', e.message);
    }
  }
  return jobs;
}

function loadFeaturedJobs() {
  try {
    // Optional: featured/manual jobs JSON for Direct + partner roles
    const p = path.join(__dirname, '..', 'public', 'data', 'featured-jobs.json');
    if (fs.existsSync(p)) {
      const data = JSON.parse(fs.readFileSync(p, 'utf8'));
      return Array.isArray(data) ? data.map((j) => ({ ...j, live: false, featured: true })) : [];
    }
  } catch (e) {
    console.warn('[aggregator] featured jobs:', e.message);
  }
  return [];
}

async function aggregateJobs() {
  const started = Date.now();
  const results = await Promise.allSettled([
    fetchAdzuna(),
    fetchJSearch(),
    fetchRemotive(),
    fetchRemoteOK(),
    fetchArbeitnow(),
    fetchJobicy(),
    fetchTheMuse(),
  ]);

  let live = [];
  for (const r of results) {
    if (r.status === 'fulfilled' && Array.isArray(r.value)) live = live.concat(r.value);
  }

  const featured = loadFeaturedJobs();
  const merged = dedupeJobs([...featured, ...live]).sort(
    (a, b) => new Date(b.postedAt || 0) - new Date(a.postedAt || 0)
  );

  const payload = {
    updatedAt: new Date().toISOString(),
    domain: 'runway2sky.online',
    count: merged.length,
    liveCount: merged.filter((j) => j.live).length,
    sources: [...new Set(merged.map((j) => j.source))],
    durationMs: Date.now() - started,
    jobs: merged,
  };

  return payload;
}

function writeJobsFile(payload, outPath) {
  const dir = path.dirname(outPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2), 'utf8');
  return outPath;
}

module.exports = {
  aggregateJobs,
  writeJobsFile,
  isAviationRelated,
  normalizeJob,
};
