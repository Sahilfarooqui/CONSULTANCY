import React from 'react';
import { Link } from 'react-router-dom';
import CompanyLogo from './CompanyLogo';
import { getCompanyBrand, getPosterLabel } from '../../utils/companyBranding';
import { COURSES_PLATFORM, getCertificatesForJob } from '../../data/courses';

const levelColors = {
  Fresher: 'bg-sky-100 text-sky-800',
  Junior: 'bg-cyan-100 text-cyan-800',
  Mid: 'bg-violet-100 text-violet-800',
  Senior: 'bg-rose-100 text-rose-800',
  Any: 'bg-slate-100 text-slate-700',
};

const JobCard = ({ job, applyViaUs, officialHref }) => {
  const brand = getCompanyBrand(job.company);
  const poster = getPosterLabel(job);
  const certs = getCertificatesForJob(job);
  const viaUs = applyViaUs(job);
  const official = officialHref(job);
  const postedLabel = job.postedAt
    ? new Date(job.postedAt).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null;

  return (
    <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-sky-300 hover:shadow-lg transition-all duration-300">
      <div className="h-1.5 w-full" style={{ backgroundColor: brand.color }} />

      <div className="p-4 sm:p-6">
        {/* Header row: logo | content | salary */}
        <div className="flex gap-3 sm:gap-4 items-start text-left">
          <CompanyLogo company={job.company} size={56} className="sm:hidden" />
          <div className="hidden sm:block">
            <CompanyLogo company={job.company} size={64} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div className="min-w-0">
                <h2 className="text-base sm:text-xl font-bold text-slate-900 leading-snug break-words">
                  {job.title}
                </h2>
                <p className="mt-1 text-sm sm:text-base font-semibold break-words" style={{ color: brand.color }}>
                  {brand.name}
                  {brand.isKnownAirline && (
                    <span className="ml-2 align-middle text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 whitespace-nowrap">
                      Verified
                    </span>
                  )}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 break-words">
                  <span className="inline-flex items-start gap-1">
                    <svg className="h-3.5 w-3.5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>
                      {job.location}
                      {job.category ? ` · ${job.category}` : ''}
                    </span>
                  </span>
                </p>
              </div>

              <div className="sm:text-right shrink-0 sm:pl-3">
                <p className="text-sm font-semibold text-slate-900">{job.salary || 'As per norms'}</p>
                {postedLabel && <p className="text-xs text-slate-400 mt-0.5">{postedLabel}</p>}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 max-w-full px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: brand.color }} />
                <span className="truncate">{poster.line}</span>
              </span>
              {job.level && (
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                    levelColors[job.level] || 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {job.level}
                </span>
              )}
              {job.type && (
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 whitespace-nowrap">
                  {job.type}
                </span>
              )}
            </div>
          </div>
        </div>

        <p className="mt-4 text-slate-600 text-sm leading-relaxed text-left line-clamp-3">{job.description}</p>

        {job.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {job.tags.slice(0, 6).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-100"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-left">
          <p className="text-xs font-bold uppercase tracking-wide text-amber-950 mb-2">
            Recommended QATI certificates
          </p>
          <ul className="space-y-2">
            {certs.slice(0, 2).map((c) => (
              <li key={c.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-sm">
                <span className="text-slate-800 break-words">{c.title}</span>
                <a
                  href={c.url || COURSES_PLATFORM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-700 font-semibold hover:underline shrink-0 text-xs sm:text-sm"
                >
                  Enrol →
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 flex flex-col gap-3 pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-500 text-left">
            Hiring: <strong className="text-slate-700">{brand.name}</strong>
            {brand.tagline ? ` · ${brand.tagline}` : ''}
          </p>
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Link
              to={viaUs}
              className="inline-flex flex-1 justify-center items-center px-5 py-3 rounded-xl text-sm font-semibold text-white shadow-sm text-center"
              style={{ backgroundColor: brand.color }}
            >
              Easy Apply via Runway2Sky
            </Link>
            {official && (
              <a
                href={official}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 justify-center items-center px-5 py-3 rounded-xl text-sm font-semibold border-2 border-slate-300 text-slate-700 hover:bg-slate-50 text-center"
              >
                {brand.name} careers
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default JobCard;
