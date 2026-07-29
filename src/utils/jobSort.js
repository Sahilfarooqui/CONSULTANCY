/**
 * Sort: Gulf majors first, then India, US, UK, Australia, then others.
 */
const FAMOUS_AIRLINE_RANK = [
  { re: /emirates/i, rank: 120 },
  { re: /qatar\s*airways/i, rank: 118 },
  { re: /etihad/i, rank: 116 },
  { re: /flydubai/i, rank: 110 },
  { re: /air\s*arabia/i, rank: 108 },
  { re: /saudia/i, rank: 106 },
  { re: /indigo|goindigo|interglobe/i, rank: 100 },
  { re: /air\s*india\s*express/i, rank: 92 },
  { re: /air\s*india|airindia/i, rank: 95 },
  { re: /spice\s*jet|spicejet/i, rank: 90 },
  { re: /akasa/i, rank: 85 },
  { re: /american\s*airlines/i, rank: 84 },
  { re: /delta\s*air/i, rank: 83 },
  { re: /united\s*airlines/i, rank: 82 },
  { re: /british\s*airways/i, rank: 81 },
  { re: /qantas/i, rank: 80 },
  { re: /virgin\s*atlantic|virgin\s*australia/i, rank: 78 },
  { re: /easyjet|ryanair|southwest|jetblue|lufthansa|singapore|cathay/i, rank: 74 },
  { re: /vistara|alliance\s*air/i, rank: 70 },
  { re: /ai\s*sats|aisats|celebi|bird|dnata|globe\s*ground|menzies/i, rank: 55 },
  { re: /customer experience|guest experience/i, rank: 52 },
  { re: /runway2sky/i, rank: 40 },
];

const REGION_RANK = {
  'Middle East': 50,
  India: 45,
  USA: 40,
  UK: 38,
  Australia: 36,
  Europe: 30,
  Asia: 28,
  Americas: 26,
  Africa: 24,
};

export function airlineRank(job) {
  const text = `${job.company || ''} ${job.title || ''} ${(job.tags || []).join(' ')}`;
  for (const { re, rank } of FAMOUS_AIRLINE_RANK) {
    if (re.test(text)) return rank;
  }
  const regionBonus = REGION_RANK[job.region] || 10;
  return regionBonus;
}

export function sortJobsFamousFirst(jobs) {
  return [...jobs].sort((a, b) => {
    const ra = airlineRank(a);
    const rb = airlineRank(b);
    if (rb !== ra) return rb - ra;
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.postedAt || 0) - new Date(a.postedAt || 0);
  });
}

export default sortJobsFamousFirst;
