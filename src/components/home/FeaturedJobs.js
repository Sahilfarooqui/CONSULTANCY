import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadJobs } from '../../services/jobsApi';
import fallbackJobs from '../../data/jobs';
import JobPoster from '../jobs/JobPoster';
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
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
              Featured jobs
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Hiring posters — tap a card to view openings and apply.
            </p>
          </div>
          <Link
            to="/jobs"
            className="inline-flex items-center justify-center h-11 px-5 rounded-lg bg-[#0a1628] text-white text-sm font-semibold hover:bg-slate-800"
          >
            See all jobs
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((job) => {
            const brand = getCompanyBrand(job.company);
            const caption = [brand.name, job.location?.split(/[,/—–-]/)[0]?.trim()]
              .filter(Boolean)
              .join(' · ');
            return (
              <Link
                key={job.id}
                to="/jobs"
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left hover:border-sky-300 hover:shadow-lg transition-all shadow-sm"
              >
                <JobPoster job={job} compact />
                {caption && (
                  <p className="px-3 py-2 text-xs text-slate-600 line-clamp-1 group-hover:text-sky-800">
                    {caption}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
