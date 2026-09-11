import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CompanyLogo from './CompanyLogo';
import { getCompanyBrand, getPosterLabel, formatPostedLabel } from '../../utils/companyBranding';
import { COURSES_PLATFORM, getCertificatesForJob } from '../../data/courses';

const JobCard = ({ job, applyViaUs, officialHref }) => {
  const brand = getCompanyBrand(job.company);
  const poster = getPosterLabel(job);
  const certs = getCertificatesForJob(job);
  const viaUs = applyViaUs(job);
  const official = officialHref(job);
  const [showEligibility, setShowEligibility] = useState(false);
  const eligibility = Array.isArray(job.eligibility) ? job.eligibility : [];
  const posted = formatPostedLabel(job.postedAt);
  const logoUrl = job.logo || job.companyLogo || job.company_logo || job.logoUrl;

  const metaParts = [job.location, job.region, posted].filter(Boolean);

  return (
    <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-sky-300 hover:shadow-lg transition-all shadow-sm">
      {/* Soft brand banner */}
      <div
        className="relative h-14 sm:h-[4.25rem] w-full overflow-hidden"
        style={{
          background: `linear-gradient(125deg, ${brand.color} 0%, ${brand.color2 || brand.color} 55%, ${brand.color}cc 100%)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 18% 40%, rgba(255,255,255,0.4) 0%, transparent 55%), linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.14) 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.1] pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(255,255,255,0.4) 8px, rgba(255,255,255,0.4) 9px)',
          }}
        />
      </div>

      <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-left">
        <div className="-mt-8 mb-3 inline-block">
          <CompanyLogo company={job.company} logoUrl={logoUrl} size={60} className="ring-2 ring-white" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {job.department && (
            <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
              {job.department}
            </span>
          )}
          {job.category && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-sky-50 text-sky-800">
              {job.category}
            </span>
          )}
        </div>

        <h2 className="mt-2 text-base sm:text-lg font-bold text-slate-900 leading-snug tracking-tight">
          {job.title}
        </h2>
        <p className="mt-0.5 text-sm font-semibold text-slate-700">{brand.name}</p>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 line-clamp-1">
          {metaParts.join(' · ')}
          {job.level ? ` · ${job.level}` : ''}
        </p>
        <p className="mt-1.5 text-[11px] text-slate-400 line-clamp-1">{poster.line}</p>

        <div className="mt-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Job description</p>
          <p className="mt-1 text-sm text-slate-600 leading-relaxed">{job.description}</p>
        </div>

        {eligibility.length > 0 && (
          <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <button
              type="button"
              onClick={() => setShowEligibility((v) => !v)}
              className="flex w-full items-center justify-between gap-2 text-left"
            >
              <span className="text-xs font-bold uppercase tracking-wide text-slate-800">
                Eligibility criteria
              </span>
              <span className="text-xs font-semibold text-sky-700">
                {showEligibility ? 'Hide' : 'View'}
              </span>
            </button>
            {showEligibility && (
              <ul className="mt-2 space-y-1.5 list-disc list-inside text-sm text-slate-700">
                {eligibility.map((item) => (
                  <li key={item} className="leading-snug">
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {!showEligibility && (
              <p className="mt-1.5 text-xs text-slate-500 line-clamp-1">
                {eligibility.slice(0, 2).join(' · ')}
                {eligibility.length > 2 ? '…' : ''}
              </p>
            )}
          </div>
        )}

        {certs.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {certs.slice(0, 2).map((c) => (
              <a
                key={c.id}
                href={c.url || COURSES_PLATFORM}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-medium px-2 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-100 hover:bg-amber-100"
              >
                {c.title.replace(' Certificate', '')}
              </a>
            ))}
          </div>
        )}

        {job.salary && (
          <p className="mt-3 text-sm font-semibold text-slate-800">{job.salary}</p>
        )}

        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <Link
            to={viaUs}
            className="flex-1 inline-flex justify-center items-center h-11 px-4 rounded-xl text-sm font-bold text-white shadow-sm"
            style={{ backgroundColor: brand.color }}
          >
            Apply now
          </Link>
          {official && (
            <a
              href={official}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex justify-center items-center h-11 px-4 rounded-xl text-sm font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Company site
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default JobCard;
