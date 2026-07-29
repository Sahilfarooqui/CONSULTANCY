/**
 * Company branding — India + 100+ global airlines (local colour tiles).
 */
import globalAirlines from '../data/globalAirlines';

const LOCAL_BRANDS = [
  {
    match: [/indigo|goindigo|interglobe/i],
    name: 'IndiGo',
    short: '6E',
    color: '#EF5B25',
    color2: '#0B1F3A',
    tagline: 'India’s largest airline',
  },
  {
    match: [/spice\s*jet|spicejet/i],
    name: 'SpiceJet',
    short: 'SG',
    color: '#E31837',
    color2: '#B01028',
    tagline: 'Domestic airline',
  },
  {
    match: [/air\s*india\s*express/i],
    name: 'Air India Express',
    short: 'IX',
    color: '#C8102E',
    color2: '#8B0A1E',
    tagline: 'Low-cost carrier',
  },
  {
    match: [/air\s*india|airindia/i],
    name: 'Air India',
    short: 'AI',
    color: '#DA0E29',
    color2: '#8B0000',
    tagline: 'National carrier',
  },
  {
    match: [/akasa/i],
    name: 'Akasa Air',
    short: 'QP',
    color: '#FF6B00',
    color2: '#C45400',
    tagline: 'Indian airline',
  },
  {
    match: [/vistara/i],
    name: 'Vistara',
    short: 'UK',
    color: '#5B2C6F',
    color2: '#4B0082',
    tagline: 'Full-service airline',
  },
  {
    match: [/ai\s*sats|aisats|air india sats/i],
    name: 'AI SATS',
    short: 'AS',
    color: '#1B4F72',
    color2: '#0E2F45',
    tagline: 'Ground handling agency',
  },
  {
    match: [/celebi/i],
    name: 'Celebi Aviation',
    short: 'CB',
    color: '#0066A1',
    color2: '#004466',
    tagline: 'Ground handling agency',
  },
  {
    match: [/bird\s*group|bird airport/i],
    name: 'Bird Group',
    short: 'BD',
    color: '#E67E22',
    color2: '#B35F12',
    tagline: 'Ground handling agency',
  },
  {
    match: [/dnata/i],
    name: 'dnata',
    short: 'DN',
    color: '#C8102E',
    color2: '#8B0A1E',
    tagline: 'Ground handling agency',
  },
  {
    match: [/globe\s*ground/i],
    name: 'Globe Ground India',
    short: 'GG',
    color: '#0F766E',
    color2: '#115E59',
    tagline: 'Ground handling agency',
  },
  {
    match: [/menzies/i],
    name: 'Menzies Aviation',
    short: 'MZ',
    color: '#1E3A5F',
    color2: '#0F2744',
    tagline: 'Ground handling agency',
  },
  {
    match: [/runway2sky/i],
    name: 'Runway2Sky',
    short: 'R2',
    color: '#0284c7',
    color2: '#0369a1',
    tagline: 'Aviation careers',
  },
];

// Auto brands from global airline directory
const GLOBAL_BRANDS = globalAirlines.map((a) => ({
  match: [new RegExp(a.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')],
  name: a.name,
  short: a.code,
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

export function getCompanyBrand(companyName = '') {
  const raw = String(companyName || 'Company').trim();
  const found = BRANDS.find((b) => b.match.some((re) => re.test(raw)));

  const name = found?.name || raw.split(/[|/–—]/)[0].trim() || 'Company';
  const color = found?.color || '#0ea5e9';
  const color2 = found?.color2 || '#0369a1';
  const short = found?.short || initials(name);
  const tagline = found?.tagline || 'Airline employer';

  return {
    name,
    originalName: raw,
    short,
    color,
    color2,
    tagline,
    initials: short,
    isKnownAirline: Boolean(found),
  };
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
