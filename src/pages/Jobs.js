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
    level: 'Fresher', // India domestic board defaults to fresher roles
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
    setFilter({ category: 'All', type: 'All', level: 'Fresher', source: 'All' });
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
          <p className="text-sm font-semibold tracking-wide uppercase text-sky-600">India Aviation · Domestic Airlines</p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">Jobs for Freshers</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Cabin crew, ground staff, airport and airline roles with IndiGo, SpiceJet, Air India, Akasa and partners.
            Mostly entry-level / fresher openings — apply on official careers pages or job portals.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200">
              <span className={`h-2 w-2 rounded-full ${meta.offline ? 'bg-amber-500' : 'bg-emerald-500'}`} />
              {loading ? 'Loading…' : `${allJobs.length} listings`}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200">
              {meta.liveCount || 0} live-feed roles
            </span>
            {meta.updatedAt && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200">
                Updated {new Date(meta.updatedAt).toLocaleString()}
              </span>
            )}
            <button
              type="button"
              onClick={() => fetchJobs(true)}
              disabled={refreshing || loading}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-60"
            >
              {refreshing ? 'Refreshing…' : 'Refresh latest'}
            </button>
          </div>
          {meta.offline && (
            <p className="mt-3 text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-4 py-2 inline-block">
              Showing featured roles. Start the API server or run <code className="font-mono">npm run fetch-jobs</code>{' '}
              to pull live openings. Free Adzuna keys unlock full auto-feed.
            </p>
          )}
          {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}
        </div>

        <div className="bg-white shadow-soft rounded-2xl border border-slate-100 mb-8 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-1">
                Search
              </label>
              <input
                type="search"
                id="search"
                placeholder="Title, company, city..."
                className="block w-full border border-slate-300 rounded-lg shadow-sm py-2.5 px-3 focus:ring-sky-500 focus:border-sky-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">
                Category
              </label>
              <select
                id="category"
                className="block w-full border border-slate-300 rounded-lg shadow-sm py-2.5 px-3 focus:ring-sky-500 focus:border-sky-500"
                value={filter.category}
                onChange={(e) => setFilter({ ...filter, category: e.target.value })}
              >
                {options.categories.map((c) => (
                  <option key={c} value={c}>
                    {c === 'All' ? 'All Categories' : c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="level" className="block text-sm font-medium text-slate-700 mb-1">
                Experience
              </label>
              <select
                id="level"
                className="block w-full border border-slate-300 rounded-lg shadow-sm py-2.5 px-3 focus:ring-sky-500 focus:border-sky-500"
                value={filter.level}
                onChange={(e) => setFilter({ ...filter, level: e.target.value })}
              >
                {options.levels.map((l) => (
                  <option key={l} value={l}>
                    {l === 'All' ? 'All Levels' : l}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-1">
                Job Type
              </label>
              <select
                id="type"
                className="block w-full border border-slate-300 rounded-lg shadow-sm py-2.5 px-3 focus:ring-sky-500 focus:border-sky-500"
                value={filter.type}
                onChange={(e) => setFilter({ ...filter, type: e.target.value })}
              >
                {options.types.map((t) => (
                  <option key={t} value={t}>
                    {t === 'All' ? 'All Types' : t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="source" className="block text-sm font-medium text-slate-700 mb-1">
                Source
              </label>
              <select
                id="source"
                className="block w-full border border-slate-300 rounded-lg shadow-sm py-2.5 px-3 focus:ring-sky-500 focus:border-sky-500"
                value={filter.source}
                onChange={(e) => setFilter({ ...filter, source: e.target.value })}
              >
                {options.sources.map((s) => (
                  <option key={s} value={s}>
                    {s === 'All' ? 'All Sources' : s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center text-sm text-slate-500">
            <span>
              Showing <strong className="text-slate-800">{filteredJobs.length}</strong> of {allJobs.length} jobs
            </span>
            <button type="button" onClick={resetFilters} className="text-sky-700 hover:text-sky-900 font-medium">
              Reset filters
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
