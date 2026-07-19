import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadJobs } from '../../services/jobsApi';
import fallbackJobs from '../../data/jobs';

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
            <p className="mt-2 text-3xl font-extrabold text-slate-900">Auto-updated aviation jobs</p>
          </div>
          <Link to="/jobs" className="text-sky-700 font-semibold hover:text-sky-900">
            View all jobs →
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5 text-left hover:border-sky-200 hover:bg-sky-50/40 transition-colors"
            >
              <div className="flex flex-wrap gap-2 mb-2">
                {job.live && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Live
                  </span>
                )}
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                  {job.level}
                </span>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200">
                  via {job.source}
                </span>
              </div>
              <h3 className="font-bold text-slate-900">{job.title}</h3>
              <p className="text-sm text-slate-600 mt-1">
                {job.company} · {job.location}
              </p>
              <p className="text-sm text-slate-500 mt-2 line-clamp-2">{job.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
