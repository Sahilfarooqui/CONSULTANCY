import React from 'react';
import { Link } from 'react-router-dom';
import CompanyLogo from './CompanyLogo';
import JobPoster from './JobPoster';
import { getCompanyBrand } from '../../utils/companyBranding';
import { COURSES_PLATFORM, getCertificatesForJob } from '../../data/courses';
import { safeHttpUrl } from '../../utils/safeUrl';

/** Friendly level wording for freshers. */
function friendlyLevel(level) {
  if (!level) return null;
  const l = String(level).toLowerCase();
  if (l.includes('fresher') || l.includes('entry')) return 'Fresher welcome';
  if (l.includes('junior')) return 'Junior level';
  if (l.includes('mid') || l.includes('experienced')) return 'Experience preferred';
  if (l.includes('senior')) return 'Senior role';
  return level;
}

/** Short location — first city / place before long lists. */
function shortLocation(location) {
  if (!location) return null;
  const first = String(location).split(/[,/—–-]/)[0].trim();
  return first || location;
}

/** Plain job-type words. */
function friendlyType(type) {
  if (!type) return null;
  const t = String(type).toLowerCase();
  if (t.includes('full')) return 'Full-time';
  if (t.includes('part')) return 'Part-time';
  if (t.includes('contract')) return 'Contract';
  if (t.includes('intern')) return 'Internship';
  return type;
}

/** Optional airport hint from category/tags. */
function roleHint(job) {
  const cat = (job.category || '').toLowerCase();
  const tags = (job.tags || []).map((t) => String(t).toLowerCase());
  if (cat.includes('cabin') || tags.some((t) => t.includes('cabin'))) return null;
  if (
    cat.includes('ground') ||
    cat.includes('customer') ||
    cat.includes('airport') ||
    tags.some((t) => t.includes('airport') || t.includes('ground'))
  ) {
    return 'Airport role';
  }
  return null;
}

const VISIBLE_ELIGIBILITY = 3;

const JobCard = ({ job, applyViaUs, officialHref }) => {
  const brand = getCompanyBrand(job.company);
  const certs = getCertificatesForJob(job);
  const viaUs = applyViaUs(job);
  const official = officialHref(job);
  const eligibility = Array.isArray(job.eligibility) ? job.eligibility : [];
  const logoUrl = safeHttpUrl(job.logo || job.companyLogo || job.company_logo || job.logoUrl) || undefined;

  const metaLine = [
    shortLocation(job.location),
    friendlyLevel(job.level),
    friendlyType(job.type),
    roleHint(job),
  ]
    .filter(Boolean)
    .filter((v, i, arr) => arr.indexOf(v) === i)
    .join(' · ');

  const visibleEligibility = eligibility.slice(0, VISIBLE_ELIGIBILITY);
  const moreCount = Math.max(0, eligibility.length - VISIBLE_ELIGIBILITY);
  const trainingUrl = safeHttpUrl(certs[0]?.url) || (certs.length ? COURSES_PLATFORM : null);

  return (
    <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-sky-300 hover:shadow-lg transition-all shadow-sm">
      <div className="rounded-t-2xl overflow-hidden">
        <JobPoster job={job} />
      </div>

      <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-left">
        <div className="-mt-6 mb-2 inline-block relative z-10">
          <CompanyLogo
            company={job.company}
            logoUrl={logoUrl}
            size={48}
            className="ring-2 ring-white shadow-md"
          />
        </div>

        <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug tracking-tight">
          {job.title}
        </h2>
        <p className="mt-0.5 text-sm font-medium text-slate-700">{brand.name}</p>
        {metaLine && (
          <p className="mt-1 text-sm text-slate-500 line-clamp-1">{metaLine}</p>
        )}

        {job.description && (
          <div className="mt-3">
            <p className="text-sm font-semibold text-slate-800">About this role</p>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed line-clamp-2">
              {job.description}
            </p>
          </div>
        )}

        {eligibility.length > 0 && (
          <div className="mt-3">
            <p className="text-sm font-semibold text-slate-800">Who can apply</p>
            <ul className="mt-1.5 space-y-1 text-sm text-slate-700">
              {visibleEligibility.map((item) => (
                <li key={item} className="flex gap-2 leading-snug">
                  <span className="text-sky-600 shrink-0" aria-hidden>
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {moreCount > 0 && (
              <p className="mt-1 text-xs text-slate-500">+{moreCount} more</p>
            )}
          </div>
        )}

        {job.salary && (
          <p className="mt-3 text-sm font-semibold text-slate-800">{job.salary}</p>
        )}

        <div className="mt-4 flex flex-col gap-2">
          <Link
            to={viaUs}
            className="inline-flex justify-center items-center h-11 px-4 rounded-xl text-sm font-bold text-white shadow-sm"
            style={{ backgroundColor: brand.color }}
          >
            Apply
          </Link>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            {official && (
              <a
                href={official}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-slate-600 underline-offset-2 hover:underline hover:text-slate-900"
              >
                Company site
              </a>
            )}
            {trainingUrl && (
              <a
                href={trainingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-amber-800 underline-offset-2 hover:underline"
              >
                Training tips
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default JobCard;
