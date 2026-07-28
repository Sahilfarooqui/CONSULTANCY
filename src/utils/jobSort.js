/**
 * Sort jobs so famous Indian airlines appear first.
 */
const FAMOUS_AIRLINE_RANK = [
  { re: /indigo|goindigo|interglobe/i, rank: 100 },
  { re: /air\s*india\s*express/i, rank: 92 },
  { re: /air\s*india|airindia/i, rank: 95 },
  { re: /spice\s*jet|spicejet/i, rank: 90 },
  { re: /akasa/i, rank: 85 },
  { re: /vistara/i, rank: 80 },
  { re: /alliance\s*air/i, rank: 75 },
  { re: /emirates/i, rank: 70 },
  { re: /qatar\s*airways/i, rank: 68 },
  { re: /etihad/i, rank: 66 },
  { re: /ai\s*sats|aisats|celebi|bird/i, rank: 50 },
  { re: /runway2sky/i, rank: 40 },
];

export function airlineRank(job) {
  const text = `${job.company || ''} ${job.title || ''} ${(job.tags || []).join(' ')}`;
  for (const { re, rank } of FAMOUS_AIRLINE_RANK) {
    if (re.test(text)) return rank;
  }
  return 10;
}

export function sortJobsFamousFirst(jobs) {
  return [...jobs].sort((a, b) => {
    const ra = airlineRank(a);
    const rb = airlineRank(b);
    if (rb !== ra) return rb - ra;
    // Featured pin next
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.postedAt || 0) - new Date(a.postedAt || 0);
  });
}

export default sortJobsFamousFirst;
