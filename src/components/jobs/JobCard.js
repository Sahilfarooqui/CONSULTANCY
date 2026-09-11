import React from 'react';
import { Link } from 'react-router-dom';
import JobPoster from './JobPoster';
import { getCompanyBrand } from '../../utils/companyBranding';
import { COURSES_PLATFORM, getCertificatesForJob } from '../../data/courses';
import { safeHttpUrl } from '../../utils/safeUrl';

const JobCard = ({ job, applyViaUs, officialHref }) => {
  const brand = getCompanyBrand(job.company);
  const certs = getCertificatesForJob(job);
  const viaUs = applyViaUs(job);
  const official = officialHref(job);
  const eligibility = Array.isArray(job.eligibility) ? job.eligibility : [];
  const trainingUrl = safeHttpUrl(certs[0]?.url) || (certs.length ? COURSES_PLATFORM : null);

  const whoCanApply = eligibility.slice(0, 2);

  return (
    <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-sky-300 hover:shadow-lg transition-all shadow-sm flex flex-col">
      <div className="overflow-hidden">
        <JobPoster job={job} />
      </div>

      <div className="px-4 pt-3 pb-4 flex flex-col gap-3 flex-1">
        {whoCanApply.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Who can apply</p>
            <ul className="mt-1 space-y-0.5 text-sm text-slate-700">
              {whoCanApply.map((item) => (
                <li key={item} className="flex gap-2 leading-snug line-clamp-1">
                  <span className="text-sky-600 shrink-0" aria-hidden>
                    •
                  </span>
                  <span className="line-clamp-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto flex flex-col gap-2">
          <Link
            to={viaUs}
            className="inline-flex justify-center items-center h-11 px-4 rounded-xl text-sm font-bold text-white shadow-sm"
            style={{ backgroundColor: brand.color }}
          >
            Apply
          </Link>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            {official && (
              <a
                href={official}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-slate-500 underline-offset-2 hover:underline hover:text-slate-800"
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
