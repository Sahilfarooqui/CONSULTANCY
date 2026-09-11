import React, { useEffect, useMemo, useState } from 'react';
import { getCompanyBrand } from '../../utils/companyBranding';

let posterMapPromise = null;

function loadPosterMap() {
  if (!posterMapPromise) {
    posterMapPromise = fetch('/data/job-posters.json', { cache: 'force-cache' })
      .then((r) => (r.ok ? r.json() : {}))
      .catch(() => ({}));
  }
  return posterMapPromise;
}

/** Category → Unsplash aviation photos (must match public/job-photos/). */
const PHOTO_SETS = {
  cabin: ['/job-photos/cabin-1.jpg', '/job-photos/cabin-2.jpg', '/job-photos/crew/crew-1.jpg'],
  ground: ['/job-photos/airport-1.jpg', '/job-photos/airport-2.jpg', '/job-photos/ground-1.jpg'],
  pilot: ['/job-photos/cockpit-1.jpg', '/job-photos/runway-1.jpg'],
  maintenance: ['/job-photos/hangar-1.jpg', '/job-photos/ground-1.jpg'],
  default: ['/job-photos/plane-1.jpg', '/job-photos/plane-2.jpg', '/job-photos/runway-1.jpg', '/job-photos/airport-1.jpg'],
};

function hashId(id) {
  let h = 0;
  const s = String(id || '');
  for (let i = 0; i < s.length; i += 1) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function categorizeJob(job) {
  const tags = Array.isArray(job.tags) ? job.tags.join(' ') : '';
  const blob = `${job.title || ''} ${job.category || ''} ${job.department || ''} ${tags} ${job.level || ''}`.toLowerCase();
  if (/cabin|flight\s*attendant|in[- ]?flight|cabin\s*crew|purser|steward/.test(blob)) return 'cabin';
  if (/pilot|flight\s*ops|cockpit|captain|first\s*officer|fo\b|type\s*rating/.test(blob)) return 'pilot';
  if (/maintenance|ame|a\.?m\.?e|engineer|mro|hangar|technic|avionics/.test(blob)) return 'maintenance';
  if (
    /ground|airport|ramp|customer\s*experience|customer\s*service|check[- ]?in|passenger|handler|load\s*control|operations\s*agent|csc|csa/.test(
      blob
    )
  ) {
    return 'ground';
  }
  return 'default';
}

function pickCategoryPhoto(job) {
  const cat = categorizeJob(job);
  const set = PHOTO_SETS[cat] || PHOTO_SETS.default;
  return set[hashId(job.id) % set.length];
}

function sanitizeId(id) {
  return String(id || 'job')
    .trim()
    .replace(/[^a-zA-Z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'job';
}

function normalizeMapEntry(entry) {
  if (!entry) return { poster: null, photo: null };
  if (typeof entry === 'string') return { poster: entry, photo: null };
  return {
    poster: entry.poster || entry.src || null,
    photo: entry.photo || null,
  };
}

function synthesizeCriteria(job) {
  const items = [];
  const level = job.level || '';
  if (/fresher|entry|trainee|junior/i.test(level) || /fresher/i.test(job.title || '')) {
    items.push('Freshers / entry-level welcome');
    items.push('Min. 10+2 or diploma as per role');
  } else if (level) {
    items.push(`${level} level`);
    items.push('Relevant aviation experience preferred');
  } else {
    items.push('Qualified aviation candidates');
  }
  if (job.location) items.push(String(job.location).slice(0, 56));
  if (job.category) items.push(`Role: ${job.category}`);
  items.push('Shifts / rostered duties as required');
  return items.slice(0, 5);
}

function criteriaFor(job) {
  if (Array.isArray(job.eligibility) && job.eligibility.length) {
    return job.eligibility.map((x) => String(x).slice(0, 72)).slice(0, 5);
  }
  return synthesizeCriteria(job);
}

function candidatePosterUrls(job, mappedPoster) {
  const sid = sanitizeId(job.id);
  const urls = [];
  if (job.posterImage) urls.push(job.posterImage);
  if (mappedPoster) urls.push(mappedPoster);
  // Prefer rich JPEG hiring posters; fall back to legacy SVG/PNG
  urls.push(`/job-posters/${sid}.jpg`);
  urls.push(`/job-posters/${sid}.png`);
  urls.push(`/job-posters/${sid}.svg`);
  return [...new Set(urls.filter(Boolean))];
}

/**
 * LinkedIn-style hiring poster for job cards.
 * Prefers generated 1080×1350 JPEG from /job-posters/{id}.jpg
 * (full recruitment-ad graphic). Falls back to category photo + CSS overlay.
 */
const JobPoster = ({ job, compact = false }) => {
  const brand = getCompanyBrand(job.company);
  const [candidates, setCandidates] = useState(() => candidatePosterUrls(job, null));
  const [idx, setIdx] = useState(0);
  const [fallbackPhoto, setFallbackPhoto] = useState(() => pickCategoryPhoto(job));
  const [exhausted, setExhausted] = useState(false);
  const criteria = useMemo(() => criteriaFor(job), [job]);
  const badge = /fresher|open|welcome/i.test(`${job.title} ${job.level}`)
    ? 'NOW OPEN'
    : 'WE ARE HIRING';

  useEffect(() => {
    let cancelled = false;
    setExhausted(false);
    setIdx(0);
    setFallbackPhoto(pickCategoryPhoto(job));
    if (job.posterImage) {
      setCandidates(candidatePosterUrls(job, null));
      return undefined;
    }
    loadPosterMap().then((map) => {
      if (cancelled) return;
      const { poster, photo } = normalizeMapEntry(map && (map[job.id] || map[String(job.id)]));
      setFallbackPhoto(photo || pickCategoryPhoto(job));
      setCandidates(candidatePosterUrls(job, poster));
      setIdx(0);
      setExhausted(false);
    });
    return () => {
      cancelled = true;
    };
  }, [job.id, job.posterImage, job.title, job.category, job.department, job.level]);

  const src = !exhausted && candidates[idx] ? candidates[idx] : null;

  if (src) {
    return (
      <div
        className={`relative w-full overflow-hidden bg-slate-900 ${
          compact ? 'aspect-[4/5]' : 'aspect-[4/5]'
        }`}
      >
        <img
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top"
          loading="lazy"
          decoding="async"
          onError={() => {
            if (idx + 1 < candidates.length) setIdx((i) => i + 1);
            else setExhausted(true);
          }}
        />
      </div>
    );
  }

  // CSS fallback: category aviation photo + text overlay (portrait)
  return (
    <div
      className="relative w-full overflow-hidden text-left text-white aspect-[4/5] min-h-[16rem]"
      style={{
        backgroundColor: brand.color2 || brand.color,
        backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0.55) 0%, rgba(2,6,23,0.35) 40%, rgba(2,6,23,0.88) 100%), url(${fallbackPhoto})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      role="img"
      aria-label={`${job.title} hiring poster`}
    >
      <div className="absolute inset-x-0 top-0 h-14" style={{ backgroundColor: brand.color }} aria-hidden />
      <div className={`relative flex h-full flex-col ${compact ? 'p-3 pt-4' : 'p-4'}`}>
        <div className="flex items-center justify-between gap-2">
          <span
            className="inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white"
            style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}
          >
            {badge}
          </span>
        </div>
        <p className="mt-1 text-xs font-semibold text-white/95">{brand.name}</p>
        <h3 className="mt-auto font-extrabold leading-snug text-white text-base sm:text-lg line-clamp-3 drop-shadow">
          {job.title}
        </h3>
        <p className="mt-1 text-[11px] text-white/85 line-clamp-1">
          {[job.location, job.salary || 'As per airline norms'].filter(Boolean).join(' · ')}
        </p>
        <ul className="mt-2 space-y-0.5 text-[10px] leading-snug">
          {criteria.slice(0, compact ? 3 : 4).map((item) => (
            <li key={item} className="flex gap-1.5 text-white/95">
              <span className="mt-[0.35em] h-1 w-1 shrink-0 rounded-full bg-white/90" />
              <span className="line-clamp-1">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-right text-[9px] font-medium text-white/75">runway2sky.online</p>
      </div>
    </div>
  );
};

export default JobPoster;
export { loadPosterMap, criteriaFor, pickCategoryPhoto, categorizeJob };
