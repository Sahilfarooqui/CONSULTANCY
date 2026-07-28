import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadJobs } from '../../services/jobsApi';
import fallbackJobs from '../../data/jobs';
import CompanyLogo from '../jobs/CompanyLogo';
import { getCompanyBrand } from '../../utils/companyBranding';
import { sortJobsFamousFirst } from '../../utils/jobSort';

const FeaturedJobs = () => {
  const [featured, setFeatured] = useState(sortJobsFamousFirst([...fallbackJobs]).slice(0, 6));

  useEffect(() => {
    let cancelled = false;
    loadJobs().then((result) => {
      if (cancelled) return;
      const top = sortJobsFamousFirst(result.jobs).slice(0, 6);
      if (top.length) setFeatured(top);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="py-12 sm:py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
          <div className="text-left">
            <h2 className="text-sm font-semibold tracking-wide uppercase text-sky-600">Open now</h2>
            <p className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900">Popular airline jobs</p>
          </div>
          <Link
            to="/jobs"
            className="inline-flex items-center justify-center h-11 px-5 rounded-xl bg-sky-600 text-white text-sm font-semibold hover:bg-sky-700"
          >
            View all jobs →
          </Link>
        </div>

        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((job) => {
            const brand = getCompanyBrand(job.company);
            return (
              <Link
                key={job.id}
                to="/jobs"
                className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left hover:border-sky-300 hover:shadow-md transition-all"
              >
                <CompanyLogo company={job.company} size={48} />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2">
                    {job.title}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold" style={{ color: brand.color }}>
                    {brand.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{job.location}</p>
                  {job.level && (
                    <span className="inline-block mt-2 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-sky-50 text-sky-800">
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
