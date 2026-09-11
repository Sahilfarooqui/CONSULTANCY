import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadJobs } from '../../services/jobsApi';
import fallbackJobs from '../../data/jobs';
import CompanyLogo from '../jobs/CompanyLogo';
import JobPoster from '../jobs/JobPoster';
import { getCompanyBrand } from '../../utils/companyBranding';
import { safeHttpUrl } from '../../utils/safeUrl';
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
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
              Featured jobs
            </h2>
            <p className="mt-1 text-sm text-slate-600">Fresh aviation openings — open a card to see who can apply.</p>
          </div>
          <Link
            to="/jobs"
            className="inline-flex items-center justify-center h-11 px-5 rounded-lg bg-[#0a1628] text-white text-sm font-semibold hover:bg-slate-800"
          >
            See all jobs
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((job) => {
            const brand = getCompanyBrand(job.company);
            const logoUrl = safeHttpUrl(job.logo || job.companyLogo || job.company_logo || job.logoUrl) || undefined;
            const level =
              job.level && /fresher|entry/i.test(job.level) ? 'Fresher welcome' : job.level;
            return (
              <Link
                key={job.id}
                to="/jobs"
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left hover:border-sky-300 hover:shadow-lg transition-all shadow-sm"
              >
                <JobPoster job={job} compact />
                <div className="px-4 pb-4">
                  <div className="-mt-6 mb-2 inline-block relative z-10">
                    <CompanyLogo
                      company={job.company}
                      logoUrl={logoUrl}
                      size={44}
                      className="ring-2 ring-white shadow-md"
                    />
                  </div>
                  <p className="font-semibold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-sky-800">
                    {job.title}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-700">{brand.name}</p>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {[job.location?.split(/[,/—–-]/)[0]?.trim(), level].filter(Boolean).join(' · ')}
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
