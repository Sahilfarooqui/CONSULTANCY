import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadJobs } from '../../services/jobsApi';
import fallbackJobs from '../../data/jobs';
import CompanyLogo from '../jobs/CompanyLogo';
import { getCompanyBrand, getPosterLabel } from '../../utils/companyBranding';

const FeaturedJobs = () => {
  const [featured, setFeatured] = useState(
    [...fallbackJobs].sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt)).slice(0, 4)
  );

  useEffect(() => {
    let cancelled = false;
    loadJobs().then((result) => {
      if (cancelled) return;
      const top = result.jobs.slice(0, 4);
      if (top.length) setFeatured(top);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div className="text-left">
            <h2 className="text-sm font-semibold tracking-wide uppercase text-sky-600">Latest openings</h2>
            <p className="mt-2 text-3xl font-extrabold text-slate-900">Jobs from top airlines</p>
          </div>
          <Link to="/jobs" className="text-sky-700 font-semibold hover:text-sky-900">
            View all jobs →
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((job) => {
            const brand = getCompanyBrand(job.company);
            const poster = getPosterLabel(job);
            return (
              <Link
                key={job.id}
                to="/jobs"
                className="rounded-2xl border border-slate-200 bg-white p-5 text-left hover:border-sky-300 hover:shadow-md transition-all block"
              >
                <div className="flex gap-3">
                  <CompanyLogo company={job.company} size={52} />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-slate-900 leading-snug">{job.title}</h3>
                    <p className="text-sm font-semibold mt-0.5" style={{ color: brand.color }}>
                      {brand.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">{job.location}</p>
                    <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                      <span
                        className="h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: brand.color }}
                      />
                      {poster.line}
                    </p>
                  </div>
                  {job.level && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 h-fit shrink-0">
                      {job.level}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
