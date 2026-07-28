/**
 * Company branding for LinkedIn-style job cards (logo, color, display name).
 */

const BRANDS = [
  {
    match: [/indigo/i, /goindigo/i, /interglobe/i],
    name: 'IndiGo',
    domain: 'goindigo.in',
    color: '#EF5B25',
    tagline: 'India’s largest airline',
  },
  {
    match: [/spice\s*jet/i, /spicejet/i],
    name: 'SpiceJet',
    domain: 'spicejet.com',
    color: '#E31837',
    tagline: 'Domestic airline',
  },
  {
    match: [/air\s*india\s*express/i, /aix/i],
    name: 'Air India Express',
    domain: 'airindiaexpress.com',
    color: '#C8102E',
    tagline: 'Low-cost carrier',
  },
  {
    match: [/air\s*india/i, /airindia/i],
    name: 'Air India',
    domain: 'airindia.com',
    color: '#DA0E29',
    tagline: 'National carrier',
  },
  {
    match: [/akasa/i],
    name: 'Akasa Air',
    domain: 'akasaair.com',
    color: '#FF6B00',
    tagline: 'Indian airline',
  },
  {
    match: [/vistara/i],
    name: 'Vistara',
    domain: 'airvistara.com',
    color: '#4B0082',
    tagline: 'Full-service airline',
  },
  {
    match: [/alliance\s*air/i],
    name: 'Alliance Air',
    domain: 'allianceair.in',
    color: '#003366',
    tagline: 'Regional airline',
  },
  {
    match: [/emirates/i],
    name: 'Emirates',
    domain: 'emirates.com',
    color: '#D71921',
    tagline: 'Global airline',
  },
  {
    match: [/qatar\s*airways/i],
    name: 'Qatar Airways',
    domain: 'qatarairways.com',
    color: '#5C0632',
    tagline: 'Global airline',
  },
  {
    match: [/etihad/i],
    name: 'Etihad',
    domain: 'etihad.com',
    color: '#BD8B13',
    tagline: 'Global airline',
  },
  {
    match: [/ai\s*sats/i, /aisats/i],
    name: 'AI SATS',
    domain: 'aisats.in',
    color: '#1B4F72',
    tagline: 'Ground handling',
  },
  {
    match: [/celebi/i],
    name: 'Celebi',
    domain: 'celebiaviation.com',
    color: '#0066A1',
    tagline: 'Ground handling',
  },
  {
    match: [/bird\s*group/i, /bird airport/i],
    name: 'Bird Group',
    domain: 'bird.in',
    color: '#E67E22',
    tagline: 'Airport services',
  },
  {
    match: [/blue\s*dart/i],
    name: 'Blue Dart Aviation',
    domain: 'bluedart.com',
    color: '#0033A0',
    tagline: 'Air cargo',
  },
  {
    match: [/runway2sky/i],
    name: 'Runway2Sky',
    domain: 'runway2sky.online',
    color: '#0284c7',
    tagline: 'Aviation careers',
  },
  {
    match: [/gmr/i, /hyderabad airport/i, /rgia/i],
    name: 'GMR Airports',
    domain: 'gmrgroup.in',
    color: '#C41230',
    tagline: 'Airport operator',
  },
  {
    match: [/adani/i],
    name: 'Adani Airport Holdings',
    domain: 'adani.com',
    color: '#1B4F9C',
    tagline: 'Airport operator',
  },
  {
    match: [/delhi\s*airport/i, /dial/i, /igia/i],
    name: 'Delhi Airport (DIAL)',
    domain: 'newdelhiairport.in',
    color: '#003366',
    tagline: 'Airport',
  },
  {
    match: [/mumbai\s*airport/i, /csmia/i, /miav/i],
    name: 'Mumbai Airport',
    domain: 'csia.in',
    color: '#8B0000',
    tagline: 'Airport',
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
 * Resolve brand + logo URLs for a job company string.
 */
export function getCompanyBrand(companyName = '') {
  const raw = String(companyName || 'Company').trim();
  const found = BRANDS.find((b) => b.match.some((re) => re.test(raw)));

  const name = found?.name || raw.split(/[|/–—-]/)[0].trim() || 'Company';
  const domain = found?.domain || null;
  const color = found?.color || '#0f172a';
  const tagline = found?.tagline || 'Hiring on Runway2Sky';

  // Primary: Clearbit; fallbacks: Google s2 favicon; final: UI Avatars
  const logoCandidates = [];
  if (domain) {
    logoCandidates.push(`https://logo.clearbit.com/${domain}`);
    logoCandidates.push(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
  }
  logoCandidates.push(
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${color.replace('#', '')}&color=fff&size=128&bold=true&format=png`
  );

  return {
    name,
    originalName: raw,
    domain,
    color,
    tagline,
    initials: initials(name),
    logoUrl: logoCandidates[0],
    logoCandidates,
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
