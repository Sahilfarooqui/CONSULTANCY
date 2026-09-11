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
  cabin: ['/job-photos/cabin-1.jpg', '/job-photos/cabin-2.jpg'],
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

/**
 * LinkedIn-style eligibility poster for job cards.
 * Prefers generated photo-backed SVG from /job-posters; falls back to
 * category aviation photo + CSS overlay.
 */
const JobPoster = ({ job, compact = false }) => {
  const brand = getCompanyBrand(job.company);
  const [src, setSrc] = useState(job.posterImage || null);
  const [fallbackPhoto, setFallbackPhoto] = useState(() => pickCategoryPhoto(job));
  const [imgFailed, setImgFailed] = useState(false);
  const criteria = useMemo(() => criteriaFor(job), [job]);
  const badge = /fresher|open|welcome/i.test(`${job.title} ${job.level}`)
    ? 'NOW OPEN'
    : "WE'RE HIRING";

  useEffect(() => {
    let cancelled = false;
    if (job.posterImage) {
      setSrc(job.posterImage);
      setFallbackPhoto(pickCategoryPhoto(job));
      setImgFailed(false);
      return undefined;
    }
    loadPosterMap().then((map) => {
      if (cancelled) return;
      const { poster, photo } = normalizeMapEntry(map && (map[job.id] || map[String(job.id)]));
      setFallbackPhoto(photo || pickCategoryPhoto(job));
      if (poster) {
        setSrc(poster);
        setImgFailed(false);
      } else {
        setSrc(`/job-posters/${String(job.id).replace(/[^a-zA-Z0-9_-]+/g, '-')}.svg`);
        setImgFailed(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [job.id, job.posterImage, job.title, job.category, job.department, job.level]);

  const showImg = src && !imgFailed;

  if (showImg) {
    return (
      <div
        className={`relative w-full overflow-hidden bg-slate-900 ${
          compact ? 'aspect-[16/9]' : 'aspect-[1.91/1]'
        }`}
      >
        <img
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          onError={() => setImgFailed(true)}
        />
      </div>
    );
  }

  // CSS fallback: category aviation photo + text overlay
  return (
    <div
      className={`relative w-full overflow-hidden text-left text-white ${
        compact ? 'aspect-[16/9] min-h-[7.5rem]' : 'aspect-[1.91/1] min-h-[9.5rem]'
      }`}
      style={{
        backgroundColor: brand.color2 || brand.color,
        backgroundImage: `linear-gradient(105deg, rgba(2,6,23,0.88) 0%, rgba(2,6,23,0.55) 48%, rgba(2,6,23,0.25) 100%), url(${fallbackPhoto})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      role="img"
      aria-label={`${job.title} eligibility poster`}
    >
      <div
        className="absolute inset-y-0 left-0 w-1.5"
        style={{ backgroundColor: brand.color }}
        aria-hidden
      />
      <div className={`relative flex h-full flex-col ${compact ? 'p-3' : 'p-3.5 sm:p-4'}`}>
        <div className="flex items-center justify-between gap-2">
          <span
            className={`inline-flex rounded-md px-2 py-0.5 font-bold uppercase tracking-[0.14em] text-white ${
              compact ? 'text-[9px]' : 'text-[10px] sm:text-xs'
            }`}
            style={{ backgroundColor: brand.color }}
          >
            {badge}
          </span>
          <span
            className={`rounded-full bg-black/40 px-2 py-0.5 font-semibold text-white/90 ${
              compact ? 'text-[8px]' : 'text-[9px]'
            }`}
          >
            Aviation
          </span>
        </div>
        <h3
          className={`mt-1.5 font-extrabold leading-snug text-white line-clamp-2 drop-shadow ${
            compact ? 'text-sm' : 'text-base sm:text-lg'
          }`}
        >
          {job.title}
        </h3>
        <p className={`mt-0.5 font-semibold text-white/95 ${compact ? 'text-[11px]' : 'text-xs sm:text-sm'}`}>
          {brand.name}
        </p>
        <p className={`text-white/80 line-clamp-1 ${compact ? 'text-[10px]' : 'text-[11px]'}`}>
          {[job.location, job.level].filter(Boolean).join(' · ')}
        </p>
        <p
          className={`mt-auto pt-1.5 font-bold uppercase tracking-wider text-white/85 ${
            compact ? 'text-[8px]' : 'text-[9px] sm:text-[10px]'
          }`}
        >
          Eligibility / Criteria
        </p>
        <ul className={`mt-0.5 space-y-0.5 ${compact ? 'text-[9px] leading-tight' : 'text-[10px] sm:text-[11px] leading-snug'}`}>
          {criteria.slice(0, compact ? 3 : 4).map((item) => (
            <li key={item} className="flex gap-1.5 text-white/95">
              <span className="mt-[0.35em] h-1 w-1 shrink-0 rounded-full bg-white/90" />
              <span className="line-clamp-1">{item}</span>
            </li>
          ))}
        </ul>
        <p className={`mt-1 text-right font-medium text-white/75 ${compact ? 'text-[8px]' : 'text-[9px]'}`}>
          runway2sky.online
        </p>
      </div>
    </div>
  );
};

export default JobPoster;
export { loadPosterMap, criteriaFor, pickCategoryPhoto, categorizeJob };
