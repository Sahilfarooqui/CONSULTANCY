import React from 'react';
import { Link } from 'react-router-dom';
import CompanyLogo from './CompanyLogo';
import { getCompanyBrand, getPosterLabel } from '../../utils/companyBranding';
import { COURSES_PLATFORM, getCertificatesForJob } from '../../data/courses';

const JobCard = ({ job, applyViaUs, officialHref }) => {
  const brand = getCompanyBrand(job.company);
  const poster = getPosterLabel(job);
  const certs = getCertificatesForJob(job);
  const viaUs = applyViaUs(job);
  const official = officialHref(job);

  return (
    <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-sky-300 hover:shadow-md transition-all">
      <div className="h-1 w-full" style={{ backgroundColor: brand.color }} />

      <div className="p-4 sm:p-5">
        <div className="flex gap-3 items-start text-left">
          <CompanyLogo company={job.company} size={52} />
          <div className="min-w-0 flex-1">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">{job.title}</h2>
            <p className="mt-0.5 text-sm font-semibold" style={{ color: brand.color }}>
              {brand.name}
            </p>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 line-clamp-1">
              {job.location}
              {job.level ? ` · ${job.level}` : ''}
              {job.type ? ` · ${job.type}` : ''}
            </p>
            <p className="mt-1.5 text-[11px] text-slate-400 line-clamp-1">{poster.line}</p>
          </div>
        </div>

        <p className="mt-3 text-sm text-slate-600 leading-relaxed text-left line-clamp-2">{job.description}</p>

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
                🎓 {c.title.replace(' Certificate', '')}
              </a>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <Link
            to={viaUs}
            className="flex-1 inline-flex justify-center items-center h-11 px-4 rounded-xl text-sm font-bold text-white"
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
