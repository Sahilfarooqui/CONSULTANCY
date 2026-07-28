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

/**
 * LinkedIn-style job card: logo, company, posted-by, certs, apply.
 */
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
      {/* Top brand strip */}
      <div className="h-1.5 w-full" style={{ backgroundColor: brand.color }} />

      <div className="p-5 sm:p-6">
        {/* Header: logo + title + meta */}
        <div className="flex gap-4 text-left">
          <CompanyLogo company={job.company} size={64} />

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {job.title}
                </h2>
                <p className="mt-1 text-base font-semibold text-slate-800 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span style={{ color: brand.color }}>{brand.name}</span>
                  {brand.isKnownAirline && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      Verified airline brand
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-sm text-slate-500 flex flex-wrap items-center gap-x-2">
                  <span className="inline-flex items-center gap-1">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    {job.location}
                  </span>
                  {job.category && (
                    <>
                      <span className="text-slate-300">·</span>
                      <span>{job.category}</span>
                    </>
                  )}
                </p>
              </div>

              <div className="text-right shrink-0">
                <p className="text-sm font-semibold text-slate-900">{job.salary || 'As per norms'}</p>
                {postedLabel && <p className="text-xs text-slate-400 mt-0.5">{postedLabel}</p>}
              </div>
            </div>

            {/* Posted by row — LinkedIn style */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: brand.color }}
                />
                {poster.line}
              </span>
              {job.level && (
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    levelColors[job.level] || 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {job.level}
                </span>
              )}
              {job.type && (
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                  {job.type}
                </span>
              )}
              {job.live && (
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  Live feed
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed text-left line-clamp-3">
          {job.description}
        </p>

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

        {/* Certificates */}
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/90 p-3.5 text-left">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-bold uppercase tracking-wide text-amber-950">
              QATI certificates required
            </p>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white text-amber-900 border border-amber-200">
              Mandatory
            </span>
          </div>
          <ul className="mt-2 space-y-1.5">
            {certs.slice(0, 3).map((c, idx) => (
              <li key={c.id} className="flex items-center justify-between gap-2 text-sm">
                <span className="text-slate-800 truncate">
                  {idx === 0 && <span className="font-semibold text-sky-900">Primary · </span>}
                  {c.title}
                </span>
                <a
                  href={c.url || COURSES_PLATFORM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-700 font-semibold hover:underline shrink-0 text-xs"
                >
                  Enrol →
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-500 text-left">
            Hiring: <strong className="text-slate-700">{brand.name}</strong>
            {brand.tagline ? ` · ${brand.tagline}` : ''}
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Link
              to={viaUs}
              className="inline-flex justify-center items-center px-5 py-2.5 rounded-full text-sm font-semibold text-white shadow-sm transition-colors"
              style={{ backgroundColor: brand.color }}
            >
              Easy Apply via Runway2Sky
            </Link>
            {official && (
              <a
                href={official}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center px-5 py-2.5 rounded-full text-sm font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50"
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
