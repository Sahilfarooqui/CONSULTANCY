/**
 * Company branding for LinkedIn-style job cards.
 * Logos are rendered locally (no Clearbit) so they always show.
 */

const BRANDS = [
  {
    match: [/indigo/i, /goindigo/i, /interglobe/i],
    name: 'IndiGo',
    short: '6E',
    color: '#EF5B25',
    color2: '#0B1F3A',
    tagline: 'India’s largest airline',
  },
  {
    match: [/spice\s*jet/i, /spicejet/i],
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
    match: [/air\s*india/i, /airindia/i],
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
    match: [/alliance\s*air/i],
    name: 'Alliance Air',
    short: '9I',
    color: '#003366',
    color2: '#001a33',
    tagline: 'Regional airline',
  },
  {
    match: [/emirates/i],
    name: 'Emirates',
    short: 'EK',
    color: '#D71921',
    color2: '#8B0000',
    tagline: 'Global airline',
  },
  {
    match: [/qatar\s*airways/i],
    name: 'Qatar Airways',
    short: 'QR',
    color: '#5C0632',
    color2: '#3D0421',
    tagline: 'Global airline',
  },
  {
    match: [/etihad/i],
    name: 'Etihad',
    short: 'EY',
    color: '#BD8B13',
    color2: '#8B6914',
    tagline: 'Global airline',
  },
  {
    match: [/ai\s*sats/i, /aisats/i, /air india sats/i],
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
    match: [/bird\s*group/i, /bird airport/i, /bird\s*\//i, /bird airport services/i],
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
    match: [/blue\s*dart/i],
    name: 'Blue Dart Aviation',
    short: 'BZ',
    color: '#0033A0',
    color2: '#001F66',
    tagline: 'Air cargo',
  },
  {
    match: [/runway2sky/i],
    name: 'Runway2Sky',
    short: 'R2',
    color: '#0284c7',
    color2: '#0369a1',
    tagline: 'Aviation careers',
  },
  {
    match: [/gmr/i, /hyderabad airport/i, /rgia/i],
    name: 'GMR Airports',
    short: 'GM',
    color: '#C41230',
    color2: '#8B0C22',
    tagline: 'Airport operator',
  },
  {
    match: [/adani/i],
    name: 'Adani Airport Holdings',
    short: 'AD',
    color: '#1B4F9C',
    color2: '#0F2F66',
    tagline: 'Airport operator',
  },
  {
    match: [/delhi\s*airport/i, /dial/i, /igia/i, /new delhi airport/i],
    name: 'Delhi Airport',
    short: 'DL',
    color: '#003366',
    color2: '#001a33',
    tagline: 'Airport',
  },
  {
    match: [/mumbai\s*airport/i, /csmia/i, /miav/i],
    name: 'Mumbai Airport',
    short: 'MB',
    color: '#8B0000',
    color2: '#5C0000',
    tagline: 'Airport',
  },
  {
    match: [/travel\s*agency/i, /gsa/i],
    name: 'Travel / GSA Partner',
    short: 'TA',
    color: '#0f766e',
    color2: '#115e59',
    tagline: 'Ticketing partner',
  },
  {
    match: [/ground\s*handler/i, /ground\s*handling/i, /groundforce/i],
    name: 'Ground Handler',
    short: 'GH',
    color: '#475569',
    color2: '#334155',
    tagline: 'Airport ground services',
  },
  {
    match: [/bpo/i, /call\s*centre/i, /call\s*center/i],
    name: 'Airline BPO Partner',
    short: 'BP',
    color: '#7c3aed',
    color2: '#5b21b6',
    tagline: 'Customer care',
  },
  {
    match: [/cisf/i, /security/i, /avsec/i],
    name: 'Airport Security',
    short: 'SC',
    color: '#1e3a5f',
    color2: '#0f2744',
    tagline: 'Security services',
  },
  {
    match: [/lounge/i, /hospitality/i],
    name: 'Airport Lounge',
    short: 'LV',
    color: '#92400e',
    color2: '#78350f',
    tagline: 'Premium lounge',
  },
  {
    match: [/mro/i, /maintenance/i, /ame/i],
    name: 'MRO / Engineering',
    short: 'MR',
    color: '#0e7490',
    color2: '#155e75',
    tagline: 'Aircraft maintenance',
  },
  {
    match: [/cargo/i],
    name: 'Air Cargo',
    short: 'CG',
    color: '#1d4ed8',
    color2: '#1e3a8a',
    tagline: 'Cargo operations',
  },
  {
    match: [/naukri/i],
    name: 'Naukri listing',
    short: 'NK',
    color: '#4f46e5',
    color2: '#3730a3',
    tagline: 'Job portal',
  },
  {
    match: [/indeed/i],
    name: 'Indeed listing',
    short: 'IN',
    color: '#2557a7',
    color2: '#1a3d75',
    tagline: 'Job portal',
  },
  {
    match: [/linkedin/i],
    name: 'LinkedIn listing',
    short: 'LI',
    color: '#0A66C2',
    color2: '#004182',
    tagline: 'Job portal',
  },
];

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
 * Resolve brand for a job company string — always has color + short code for logo tile.
 */
export function getCompanyBrand(companyName = '') {
  const raw = String(companyName || 'Company').trim();
  const found = BRANDS.find((b) => b.match.some((re) => re.test(raw)));

  const name = found?.name || raw.split(/[|/–—]/)[0].trim() || 'Company';
  const color = found?.color || '#0ea5e9';
  const color2 = found?.color2 || '#0369a1';
  const short = found?.short || initials(name);
  const tagline = found?.tagline || 'Hiring on Runway2Sky';

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

/**
 * Who posted / listed this role (for “Posted by” line).
 */
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
      line: `Posted by ${brand.name} · Official / careers listing`,
    };
  }

  return {
    postedBy: source,
    hiringFor: brand.name,
    line: `Listed via ${source} · ${brand.name}`,
  };
}

export default getCompanyBrand;
