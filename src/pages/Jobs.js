import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { loadJobs, extractFilterOptions } from '../services/jobsApi';
import JobCard from '../components/jobs/JobCard';

const Jobs = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [meta, setMeta] = useState({ updatedAt: null, liveCount: 0, from: '', offline: false });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    category: 'All',
    type: 'All',
    level: 'All', // show all airline jobs; user can filter to Fresher
    source: 'All',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const fetchJobs = useCallback(async (force = false) => {
    if (force) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const result = await loadJobs({ forceRefresh: force });
      setAllJobs(result.jobs);
      setMeta({
        updatedAt: result.updatedAt,
        liveCount: result.liveCount,
        from: result.from,
        offline: result.offline,
      });
    } catch (e) {
      setError(e.message || 'Could not load jobs');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs(false);
    // Auto re-check every 30 minutes while page is open
    const id = setInterval(() => fetchJobs(false), 30 * 60 * 1000);
    return () => clearInterval(id);
  }, [fetchJobs]);

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
    if (job.applyUrl && !job.applyUrl.startsWith('/')) {
      q.set('external', job.applyUrl);
    }
    return `/apply?${q.toString()}`;
  };

  const officialHref = (job) => {
    if (job.applyUrl && !job.applyUrl.startsWith('/')) return job.applyUrl;
    return null;
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold tracking-wide uppercase text-sky-600">India Aviation · All airline jobs</p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            IndiGo, Air India, SpiceJet & more
          </h1>
          <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto">
            Famous airlines first — cabin crew, ground staff & airport roles. Apply via Runway2Sky.
          </p>
          {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
        </div>

        {/* Compact filter bar */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-6 p-3">
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <input
              type="search"
              id="search"
              placeholder="Search jobs, airline, city…"
              className="flex-1 min-w-0 border border-slate-300 rounded-lg py-2 px-3 text-sm focus:ring-sky-500 focus:border-sky-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              <select
                id="category"
                aria-label="Category"
                className="border border-slate-300 rounded-lg py-2 px-2 text-sm focus:ring-sky-500 focus:border-sky-500 max-w-[9.5rem]"
                value={filter.category}
                onChange={(e) => setFilter({ ...filter, category: e.target.value })}
              >
                {options.categories.map((c) => (
                  <option key={c} value={c}>
                    {c === 'All' ? 'Category' : c}
                  </option>
                ))}
              </select>
              <select
                id="level"
                aria-label="Experience"
                className="border border-slate-300 rounded-lg py-2 px-2 text-sm focus:ring-sky-500 focus:border-sky-500 max-w-[7.5rem]"
                value={filter.level}
                onChange={(e) => setFilter({ ...filter, level: e.target.value })}
              >
                {options.levels.map((l) => (
                  <option key={l} value={l}>
                    {l === 'All' ? 'Level' : l}
                  </option>
                ))}
              </select>
              <select
                id="type"
                aria-label="Job type"
                className="border border-slate-300 rounded-lg py-2 px-2 text-sm focus:ring-sky-500 focus:border-sky-500 max-w-[7.5rem]"
                value={filter.type}
                onChange={(e) => setFilter({ ...filter, type: e.target.value })}
              >
                {options.types.map((t) => (
                  <option key={t} value={t}>
                    {t === 'All' ? 'Type' : t}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={resetFilters}
                className="text-sm font-medium text-sky-700 hover:text-sky-900 px-2 py-2"
              >
                Reset
              </button>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>
              <strong className="text-slate-800">{filteredJobs.length}</strong> / {allJobs.length} jobs
            </span>
            {['IndiGo', 'Air India', 'SpiceJet', 'Akasa'].map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setSearchTerm(name)}
                className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-sky-100 text-slate-700"
              >
                {name}
              </button>
            ))}
            <button
              type="button"
              onClick={() => fetchJobs(true)}
              disabled={refreshing || loading}
              className="ml-auto text-sky-700 font-medium disabled:opacity-50"
            >
              {refreshing ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-soft">
            <div className="inline-block h-10 w-10 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin" />
            <p className="mt-4 text-slate-600">Fetching latest aviation jobs…</p>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid gap-5">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                applyViaUs={applyViaUs}
                officialHref={officialHref}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white shadow-soft rounded-2xl border border-slate-100">
            <p className="text-slate-600 text-lg">No jobs match your filters.</p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-sky-600 hover:bg-sky-700"
            >
              Reset Filters
            </button>
          </div>
        )}

        <div className="mt-12 rounded-2xl bg-gradient-to-r from-sky-900 to-slate-900 text-white p-8 text-center">
          <h2 className="text-2xl font-bold">Employers — get your vacancy on runway2sky.online</h2>
          <p className="mt-2 text-sky-100 max-w-2xl mx-auto">
            Send openings from LinkedIn or any platform. We publish them so aviation candidates find them fast.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center px-6 py-3 rounded-lg font-semibold bg-white text-sky-900 hover:bg-sky-50"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
