import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadJobs } from '../../services/jobsApi';
import fallbackJobs from '../../data/jobs';
import CompanyLogo from '../jobs/CompanyLogo';
import JobPoster from '../jobs/JobPoster';
import { getCompanyBrand, formatPostedLabel } from '../../utils/companyBranding';
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
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div className="text-left">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-sky-600">Openings</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
              Featured airline roles
            </h2>
          </div>
          <Link
            to="/jobs"
            className="inline-flex items-center justify-center h-11 px-5 rounded-lg bg-[#0a1628] text-white text-sm font-semibold hover:bg-slate-800"
          >
            View all positions
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((job) => {
            const brand = getCompanyBrand(job.company);
            const posted = formatPostedLabel(job.postedAt);
            const logoUrl = job.logo || job.companyLogo || job.company_logo || job.logoUrl;
            return (
              <Link
                key={job.id}
                to="/jobs"
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left hover:border-sky-300 hover:shadow-lg transition-all shadow-sm"
              >
                <JobPoster job={job} compact />
                <div className="px-4 pb-4">
                  <div className="-mt-7 mb-2 inline-block relative z-10">
                    <CompanyLogo
                      company={job.company}
                      logoUrl={logoUrl}
                      size={52}
                      className="ring-2 ring-white shadow-md"
                    />
                  </div>
                  <p className="font-semibold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-sky-800">
                    {job.title}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-700">{brand.name}</p>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {[job.location, posted].filter(Boolean).join(' · ')}
                  </p>
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
