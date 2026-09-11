/**
 * Company branding — India + 100+ global airlines (colours + logo domains).
 */
import globalAirlines from '../data/globalAirlines';

/** Prefer these domains for logo CDNs (Clearbit / Google favicons). */
const DOMAIN_BY_CODE = {
  '6E': 'goindigo.in',
  SG: 'spicejet.com',
  AI: 'airindia.com',
  IX: 'airindiaexpress.com',
  QP: 'akasaair.com',
  UK: 'airvistara.com',
  EK: 'emirates.com',
  QR: 'qatarairways.com',
  EY: 'etihad.com',
  FZ: 'flydubai.com',
  G9: 'airarabia.com',
  SV: 'saudia.com',
  GF: 'gulfair.com',
  WY: 'omanair.com',
  KU: 'kuwaitairways.com',
  RJ: 'rj.com',
  AA: 'aa.com',
  DL: 'delta.com',
  UA: 'united.com',
  WN: 'southwest.com',
  B6: 'jetblue.com',
  AS: 'alaskaair.com',
  BA: 'britishairways.com',
  U2: 'easyjet.com',
  FR: 'ryanair.com',
  VS: 'virginatlantic.com',
  LH: 'lufthansa.com',
  AF: 'airfrance.com',
  KL: 'klm.com',
  TK: 'turkishairlines.com',
  QF: 'qantas.com',
  SQ: 'singaporeair.com',
  CX: 'cathaypacific.com',
  NH: 'ana.co.jp',
  JL: 'jal.com',
  KE: 'koreanair.com',
  NZ: 'airnewzealand.com',
  VA: 'virginaustralia.com',
  JQ: 'jetstar.com',
  AK: 'airasia.com',
  TG: 'thaiairways.com',
  GA: 'garuda-indonesia.com',
  MH: 'malaysiaairlines.com',
  PR: 'philippineairlines.com',
  CI: 'china-airlines.com',
  BR: 'evaair.com',
  AC: 'aircanada.com',
  WS: 'westjet.com',
  LA: 'latam.com',
  AM: 'aeromexico.com',
  AV: 'avianca.com',
  SA: 'flysaa.com',
  ET: 'ethiopianairlines.com',
  MS: 'egyptair.com',
  KQ: 'kenya-airways.com',
};

const LOCAL_BRANDS = [
  {
    match: [/indigo|goindigo|interglobe/i],
    name: 'IndiGo',
    short: '6E',
    domain: 'goindigo.in',
    color: '#EF5B25',
    color2: '#0B1F3A',
    tagline: 'India’s largest airline',
  },
  {
    match: [/spice\s*jet|spicejet/i],
    name: 'SpiceJet',
    short: 'SG',
    domain: 'spicejet.com',
    color: '#E31837',
    color2: '#B01028',
    tagline: 'Domestic airline',
  },
  {
    match: [/air\s*india\s*express/i],
    name: 'Air India Express',
    short: 'IX',
    domain: 'airindiaexpress.com',
    color: '#C8102E',
    color2: '#8B0A1E',
    tagline: 'Low-cost carrier',
  },
  {
    match: [/air\s*india|airindia/i],
    name: 'Air India',
    short: 'AI',
    domain: 'airindia.com',
    color: '#DA0E29',
    color2: '#8B0000',
    tagline: 'National carrier',
  },
  {
    match: [/akasa/i],
    name: 'Akasa Air',
    short: 'QP',
    domain: 'akasaair.com',
    color: '#FF6B00',
    color2: '#C45400',
    tagline: 'Indian airline',
  },
  {
    match: [/vistara/i],
    name: 'Vistara',
    short: 'UK',
    domain: 'airvistara.com',
    color: '#5B2C6F',
    color2: '#4B0082',
    tagline: 'Full-service airline',
  },
  {
    match: [/ai\s*sats|aisats|air india sats/i],
    name: 'AI SATS',
    short: 'AS',
    domain: 'aisats.in',
    color: '#1B4F72',
    color2: '#0E2F45',
    tagline: 'Ground handling agency',
  },
  {
    match: [/celebi/i],
    name: 'Celebi Aviation',
    short: 'CB',
    domain: 'celebiaviation.com',
    color: '#0066A1',
    color2: '#004466',
    tagline: 'Ground handling agency',
  },
  {
    match: [/bird\s*group|bird airport/i],
    name: 'Bird Group',
    short: 'BD',
    domain: 'bird.in',
    color: '#E67E22',
    color2: '#B35F12',
    tagline: 'Ground handling agency',
  },
  {
    match: [/dnata/i],
    name: 'dnata',
    short: 'DN',
    domain: 'dnata.com',
    color: '#C8102E',
    color2: '#8B0A1E',
    tagline: 'Ground handling agency',
  },
  {
    match: [/globe\s*ground/i],
    name: 'Globe Ground India',
    short: 'GG',
    domain: 'globegroundindia.com',
    color: '#0F766E',
    color2: '#115E59',
    tagline: 'Ground handling agency',
  },
  {
    match: [/menzies/i],
    name: 'Menzies Aviation',
    short: 'MZ',
    domain: 'menziesaviation.com',
    color: '#1E3A5F',
    color2: '#0F2744',
    tagline: 'Ground handling agency',
  },
  {
    match: [/runway2sky/i],
    name: 'Runway2Sky',
    short: 'R2',
    domain: 'runway2sky.online',
    color: '#0284c7',
    color2: '#0369a1',
    tagline: 'Aviation careers',
  },
];

function domainFromCareersUrl(url) {
  if (!url) return null;
  try {
    const host = new URL(url).hostname.replace(/^www\./i, '');
    // careers.goindigo.in → goindigo.in; jobs.aa.com → aa.com
    return host
      .replace(/^(careers|jobs|careersgroup|groupcareers)\./i, '')
      .replace(/groupcareers\.com$/i, '.com');
  } catch {
    return null;
  }
}

// Auto brands from global airline directory
const GLOBAL_BRANDS = globalAirlines.map((a) => ({
  match: [new RegExp(a.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')],
  name: a.name,
  short: a.code,
  domain: DOMAIN_BY_CODE[a.code] || domainFromCareersUrl(a.careers) || null,
  color: a.color,
  color2: a.color2,
  tagline: `${a.region} · ${a.country}`,
}));

const BRANDS = [...LOCAL_BRANDS, ...GLOBAL_BRANDS];

function initials(name) {
  const parts = String(name || 'Job')
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (!parts.length) return 'JB';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

/**
 * Ordered logo URL candidates for a brand / optional job-provided logo.
 * (a) job logo fields → (b) Clearbit → (c) Google favicon sz=128
 */
export function getLogoCandidates({ domain, logoUrl } = {}) {
  const urls = [];
  if (logoUrl && typeof logoUrl === 'string' && /^https?:\/\//i.test(logoUrl)) {
    urls.push(logoUrl);
  }
  if (domain) {
    const d = String(domain).replace(/^https?:\/\//i, '').replace(/\/.*$/, '').replace(/^www\./i, '');
    if (d) {
      urls.push(`https://logo.clearbit.com/${d}`);
      urls.push(`https://www.google.com/s2/favicons?domain=${encodeURIComponent(d)}&sz=128`);
    }
  }
  return [...new Set(urls)];
}

export function getCompanyBrand(companyName = '') {
  const raw = String(companyName || 'Company').trim();
  const found = BRANDS.find((b) => b.match.some((re) => re.test(raw)));

  const name = found?.name || raw.split(/[|/–—]/)[0].trim() || 'Company';
  const color = found?.color || '#0ea5e9';
  const color2 = found?.color2 || '#0369a1';
  const short = found?.short || initials(name);
  const tagline = found?.tagline || 'Airline employer';
  const domain = found?.domain || DOMAIN_BY_CODE[short] || null;

  return {
    name,
    originalName: raw,
    short,
    domain,
    color,
    color2,
    tagline,
    initials: short,
    isKnownAirline: Boolean(found),
  };
}

export function formatPostedLabel(postedAt) {
  if (!postedAt) return null;
  const d = new Date(postedAt);
  if (Number.isNaN(d.getTime())) return String(postedAt);
  const now = new Date();
  const diffMs = now - d;
  const days = Math.floor(diffMs / 86400000);
  if (days < 0) return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
}

export function getPosterLabel(job) {
  const brand = getCompanyBrand(job.company);
  const source = job.source || 'Company';

  if (source === 'Direct' || /runway2sky/i.test(job.company || '')) {
    return {
      postedBy: 'Runway2Sky',
      hiringFor: brand.name,
      line: `Posted by Runway2Sky · Hiring for ${brand.name}`,
    };
  }

  if (source === 'Company' || brand.isKnownAirline) {
    return {
      postedBy: brand.name,
      hiringFor: brand.name,
      line: `Posted by ${brand.name} · Official careers`,
    };
  }

  return {
    postedBy: source,
    hiringFor: brand.name,
    line: `Listed via ${source} · ${brand.name}`,
  };
}

export default getCompanyBrand;
