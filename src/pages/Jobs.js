import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { loadJobs, extractFilterOptions } from '../services/jobsApi';
import JobCard from '../components/jobs/JobCard';

const Jobs = () => {
  const location = useLocation();
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    category: 'All',
    type: 'All',
    level: 'All',
    source: 'All',
  });
  const [searchTerm, setSearchTerm] = useState(location.state?.q || '');

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await loadJobs();
      setAllJobs(result.jobs);
    } catch (e) {
      setError(e.message || 'Could not load jobs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    if (location.state?.q) setSearchTerm(location.state.q);
  }, [location.state]);

  const options = useMemo(() => extractFilterOptions(allJobs), [allJobs]);

  const filteredJobs = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return allJobs.filter((job) => {
      if (filter.category !== 'All' && job.category !== filter.category) return false;
      if (filter.type !== 'All' && job.type !== filter.type) return false;
      if (filter.level !== 'All' && job.level !== filter.level) return false;
      if (filter.source !== 'All' && job.source !== filter.source) return false;
      if (
        q &&
        !(
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.location.toLowerCase().includes(q) ||
          (job.category || '').toLowerCase().includes(q) ||
          (job.tags || []).some((t) => t.toLowerCase().includes(q))
        )
      ) {
        return false;
      }
      return true;
    });
  }, [allJobs, filter, searchTerm]);

  const resetFilters = () => {
    setFilter({ category: 'All', type: 'All', level: 'All', source: 'All' });
    setSearchTerm('');
  };

  const applyViaUs = (job) => {
    const q = new URLSearchParams({
      jobId: job.id || '',
      title: job.title || '',
      company: job.company || '',
      location: job.location || '',
      level: job.level || '',
      category: job.category || '',
    });
    if (job.applyUrl && !job.applyUrl.startsWith('/')) q.set('external', job.applyUrl);
    return `/apply?${q.toString()}`;
  };

  const officialHref = (job) =>
    job.applyUrl && !job.applyUrl.startsWith('/') ? job.applyUrl : null;

  return (
    <div className="py-8 sm:py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-5 text-left sm:text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Airline jobs</h1>
          <p className="mt-1 text-sm sm:text-base text-slate-600">
            Search and apply. Top airlines show first.
          </p>
          {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
        </div>

        <div className="sticky top-16 z-30 bg-slate-50/95 backdrop-blur pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 mb-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-2.5 sm:p-3">
            <input
              type="search"
              placeholder="Search airline, job, city…"
              className="w-full border border-slate-300 rounded-lg py-2.5 px-3 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="mt-2 flex gap-2 overflow-x-auto pb-0.5">
              <select
                aria-label="Category"
                className="shrink-0 border border-slate-300 rounded-lg py-2 px-2 text-sm bg-white"
                value={filter.category}
                onChange={(e) => setFilter({ ...filter, category: e.target.value })}
              >
                {options.categories.map((c) => (
                  <option key={c} value={c}>
                    {c === 'All' ? 'All roles' : c}
                  </option>
                ))}
              </select>
              <select
                aria-label="Level"
                className="shrink-0 border border-slate-300 rounded-lg py-2 px-2 text-sm bg-white"
                value={filter.level}
                onChange={(e) => setFilter({ ...filter, level: e.target.value })}
              >
                {options.levels.map((l) => (
                  <option key={l} value={l}>
                    {l === 'All' ? 'Any level' : l}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={resetFilters}
                className="shrink-0 text-sm font-semibold text-sky-700 px-2"
              >
                Clear
              </button>
            </div>
            <div className="mt-2 flex gap-1.5 overflow-x-auto">
              {['IndiGo', 'Air India', 'SpiceJet', 'Akasa', 'Cabin Crew'].map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setSearchTerm(name)}
                  className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                    searchTerm === name
                      ? 'bg-sky-600 text-white border-sky-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-500 px-0.5">
            Showing <strong className="text-slate-800">{filteredJobs.length}</strong> jobs
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-slate-500">Loading jobs…</div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid gap-3 sm:gap-4">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} applyViaUs={applyViaUs} officialHref={officialHref} />
            ))}
          </div>
        ) : (
          <div className="text-center py-14 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-700 font-medium">No jobs match your search.</p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-3 text-sky-700 font-semibold"
            >
              Clear filters
            </button>
          </div>
        )}

        <div className="mt-10 rounded-2xl bg-sky-900 text-white p-6 text-center">
          <p className="font-bold text-lg">Need help applying?</p>
          <p className="mt-1 text-sky-100 text-sm">WhatsApp or contact us — we guide freshers.</p>
          <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              to="/contact"
              className="inline-flex justify-center px-5 py-2.5 rounded-xl bg-white text-sky-900 font-semibold text-sm"
            >
              Contact
            </Link>
            <Link
              to="/courses"
              className="inline-flex justify-center px-5 py-2.5 rounded-xl border border-white/40 font-semibold text-sm"
            >
              Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
