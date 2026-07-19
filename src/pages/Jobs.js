import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { loadJobs, extractFilterOptions } from '../services/jobsApi';

const sourceColors = {
  LinkedIn: 'bg-blue-100 text-blue-800',
  Indeed: 'bg-indigo-100 text-indigo-800',
  Company: 'bg-slate-100 text-slate-800',
  GulfTalent: 'bg-amber-100 text-amber-900',
  Bayt: 'bg-orange-100 text-orange-900',
  Direct: 'bg-emerald-100 text-emerald-800',
  Adzuna: 'bg-rose-100 text-rose-800',
  Remotive: 'bg-violet-100 text-violet-800',
  RemoteOK: 'bg-fuchsia-100 text-fuchsia-800',
  Arbeitnow: 'bg-cyan-100 text-cyan-800',
  Jobicy: 'bg-teal-100 text-teal-800',
  'The Muse': 'bg-pink-100 text-pink-800',
  'Google Jobs': 'bg-blue-100 text-blue-900',
  'Live Feed': 'bg-sky-100 text-sky-800',
};

const levelColors = {
  Fresher: 'bg-sky-100 text-sky-800',
  Junior: 'bg-cyan-100 text-cyan-800',
  Mid: 'bg-violet-100 text-violet-800',
  Senior: 'bg-rose-100 text-rose-800',
  Any: 'bg-slate-100 text-slate-700',
};

const Jobs = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [meta, setMeta] = useState({ updatedAt: null, liveCount: 0, from: '', offline: false });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    category: 'All',
    type: 'All',
    level: 'All',
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

  const applyHref = (job) => job.applyUrl || '/contact';
  const isInternal = (url) => url && url.startsWith('/');

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold tracking-wide uppercase text-sky-600">Aviation Careers</p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">Open Aviation Jobs</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Latest roles auto-updated from global job feeds — plus Runway2Sky featured placements. Freshers and
            experienced professionals welcome.
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
            {filteredJobs.map((job) => {
              const href = applyHref(job);
              const internal = isInternal(href);
              return (
                <article
                  key={job.id}
                  className="bg-white shadow-soft rounded-2xl border border-slate-100 overflow-hidden hover:shadow-card transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                      <div className="text-left">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {job.live && (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                              Live
                            </span>
                          )}
                          {job.featured && !job.live && (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900">
                              Featured
                            </span>
                          )}
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                              levelColors[job.level] || 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {job.level}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                              sourceColors[job.source] || 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            via {job.source}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                            {job.type}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">{job.title}</h2>
                        <p className="text-slate-600 mt-1">
                          {job.company} · {job.location}
                        </p>
                        <p className="text-slate-500 text-sm mt-1">{job.category}</p>
                      </div>
                      <div className="text-left lg:text-right shrink-0">
                        <p className="text-slate-900 font-semibold">{job.salary}</p>
                        {job.postedAt && (
                          <p className="text-xs text-slate-400 mt-1">
                            Posted {new Date(job.postedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>

                    <p className="text-slate-700 mt-4 text-left leading-relaxed">{job.description}</p>

                    {job.tags?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {job.tags.slice(0, 8).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2.5 py-1 rounded-md bg-slate-50 text-slate-600 border border-slate-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                      <p className="text-xs text-slate-400 text-left">
                        Apply on the original platform. Runway2Sky aggregates listings for discovery.
                      </p>
                      {internal ? (
                        <Link
                          to={href}
                          className="inline-flex justify-center items-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 shadow-sm transition-colors"
                        >
                          Apply via Runway2Sky
                        </Link>
                      ) : (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex justify-center items-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 shadow-sm transition-colors"
                        >
                          Apply on {job.source}
                          <svg className="ml-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
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
