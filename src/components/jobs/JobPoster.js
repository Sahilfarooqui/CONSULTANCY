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
 * Prefers generated SVG from /job-posters; falls back to inline CSS graphic.
 */
const JobPoster = ({ job, compact = false }) => {
  const brand = getCompanyBrand(job.company);
  const [src, setSrc] = useState(job.posterImage || null);
  const [imgFailed, setImgFailed] = useState(false);
  const criteria = useMemo(() => criteriaFor(job), [job]);
  const badge = /fresher|open|welcome/i.test(`${job.title} ${job.level}`)
    ? 'NOW OPEN'
    : "WE'RE HIRING";

  useEffect(() => {
    let cancelled = false;
    if (job.posterImage) {
      setSrc(job.posterImage);
      setImgFailed(false);
      return undefined;
    }
    loadPosterMap().then((map) => {
      if (cancelled) return;
      const path = map && (map[job.id] || map[String(job.id)]);
      if (path) {
        setSrc(path);
        setImgFailed(false);
      } else {
        // Convention path — if file exists browser shows it; onError → CSS fallback
        setSrc(`/job-posters/${String(job.id).replace(/[^a-zA-Z0-9_-]+/g, '-')}.svg`);
        setImgFailed(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [job.id, job.posterImage]);

  const showImg = src && !imgFailed;

  if (showImg) {
    return (
      <div
        className={`relative w-full overflow-hidden bg-slate-200 ${
          compact ? 'aspect-[16/9]' : 'aspect-[1.91/1]'
        }`}
      >
        <img
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          onError={() => setImgFailed(true)}
        />
      </div>
    );
  }

  // Inline CSS LinkedIn-style eligibility poster (always available)
  return (
    <div
      className={`relative w-full overflow-hidden text-left text-white ${
        compact ? 'aspect-[16/9] min-h-[7.5rem]' : 'aspect-[1.91/1] min-h-[9.5rem]'
      }`}
      style={{
        background: `linear-gradient(125deg, ${brand.color} 0%, ${brand.color2 || brand.color} 55%, ${brand.color} 100%)`,
      }}
      aria-hidden={false}
      role="img"
      aria-label={`${job.title} eligibility poster`}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 15% 30%, rgba(255,255,255,0.35) 0%, transparent 50%), linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.4) 100%)',
        }}
      />
      <div className={`relative flex h-full flex-col ${compact ? 'p-3' : 'p-3.5 sm:p-4'}`}>
        <div className="flex items-center justify-between gap-2">
          <span
            className={`font-bold uppercase tracking-[0.18em] text-white/95 ${
              compact ? 'text-[9px]' : 'text-[10px] sm:text-xs'
            }`}
          >
            {badge}
          </span>
          <span
            className={`rounded-full bg-white/15 px-2 py-0.5 font-semibold text-white/90 ${
              compact ? 'text-[8px]' : 'text-[9px]'
            }`}
          >
            Aviation
          </span>
        </div>
        <h3
          className={`mt-1.5 font-extrabold leading-snug text-white line-clamp-2 ${
            compact ? 'text-sm' : 'text-base sm:text-lg'
          }`}
        >
          {job.title}
        </h3>
        <p className={`mt-0.5 font-semibold text-white/90 ${compact ? 'text-[11px]' : 'text-xs sm:text-sm'}`}>
          {brand.name}
        </p>
        <p className={`text-white/75 line-clamp-1 ${compact ? 'text-[10px]' : 'text-[11px]'}`}>
          {[job.location, job.level].filter(Boolean).join(' · ')}
        </p>
        <p
          className={`mt-auto pt-1.5 font-bold uppercase tracking-wider text-white/80 ${
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
        <p className={`mt-1 text-right font-medium text-white/70 ${compact ? 'text-[8px]' : 'text-[9px]'}`}>
          runway2sky.online
        </p>
      </div>
    </div>
  );
};

export default JobPoster;
export { loadPosterMap, criteriaFor };
