import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { loadJobs, extractFilterOptions } from '../services/jobsApi';
import JobCard from '../components/jobs/JobCard';
import { sanitizeSearchQuery, safeHttpUrl } from '../utils/safeUrl';

const Jobs = () => {
  const location = useLocation();
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [filter, setFilter] = useState({
    category: 'All',
    type: 'All',
    level: 'All',
    source: 'All',
    region: 'All',
  });
  const [searchTerm, setSearchTerm] = useState(sanitizeSearchQuery(location.state?.q || ''));

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
    if (location.state?.q) setSearchTerm(sanitizeSearchQuery(location.state.q));
  }, [location.state]);

  const options = useMemo(() => extractFilterOptions(allJobs), [allJobs]);

  const filteredJobs = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return allJobs.filter((job) => {
      if (filter.category !== 'All' && job.category !== filter.category) return false;
      if (filter.type !== 'All' && job.type !== filter.type) return false;
      if (filter.level !== 'All' && job.level !== filter.level) return false;
      if (filter.source !== 'All' && job.source !== filter.source) return false;
      if (filter.region !== 'All' && job.region !== filter.region) return false;
      if (
        q &&
        !(
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.location.toLowerCase().includes(q) ||
          (job.category || '').toLowerCase().includes(q) ||
          (job.region || '').toLowerCase().includes(q) ||
          (job.country || '').toLowerCase().includes(q) ||
          (job.tags || []).some((t) => t.toLowerCase().includes(q))
        )
      ) {
        return false;
      }
      return true;
    });
  }, [allJobs, filter, searchTerm]);

  const moreFiltersActive =
    filter.type !== 'All' || filter.source !== 'All' || filter.region !== 'All';

  const resetFilters = () => {
    setFilter({ category: 'All', type: 'All', level: 'All', source: 'All', region: 'All' });
    setSearchTerm('');
    setShowMoreFilters(false);
  };

  const applyViaUs = (job) => {
    const q = new URLSearchParams({
      jobId: sanitizeSearchQuery(job.id || '', { maxLength: 80 }),
      title: sanitizeSearchQuery(job.title || '', { maxLength: 200 }),
      company: sanitizeSearchQuery(job.company || '', { maxLength: 120 }),
      location: sanitizeSearchQuery(job.location || '', { maxLength: 120 }),
      level: sanitizeSearchQuery(job.level || '', { maxLength: 60 }),
      category: sanitizeSearchQuery(job.category || '', { maxLength: 80 }),
    });
    const ext = safeHttpUrl(job.applyUrl);
    if (ext) q.set('external', ext);
    return `/apply?${q.toString()}`;
  };

  const officialHref = (job) => safeHttpUrl(job.applyUrl);

  const resultsLabel =
    filteredJobs.length === 1 ? '1 job found' : `${filteredJobs.length} jobs found`;

  return (
    <div className="py-8 sm:py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-5 text-left sm:text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Find aviation jobs</h1>
          <p className="mt-1 text-sm sm:text-base text-slate-600">
            Cabin crew, airport & airline roles — see who can apply on each card.
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
            <div className="mt-2 flex gap-2 overflow-x-auto pb-0.5 items-center">
              <select
                aria-label="Role"
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
                    {l === 'All' ? 'Any level' : l === 'Fresher' ? 'Fresher welcome' : l}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setShowMoreFilters((v) => !v)}
                className={`shrink-0 text-sm font-semibold px-2 py-2 rounded-lg border ${
                  showMoreFilters || moreFiltersActive
                    ? 'border-sky-300 bg-sky-50 text-sky-800'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                More filters{moreFiltersActive ? ' •' : ''}
              </button>
              <button
                type="button"
                onClick={resetFilters}
                className="shrink-0 text-sm font-semibold text-sky-700 px-2"
              >
                Clear
              </button>
            </div>

            {showMoreFilters && (
              <div className="mt-2 flex gap-2 overflow-x-auto pb-0.5">
                <select
                  aria-label="Region"
                  className="shrink-0 border border-slate-300 rounded-lg py-2 px-2 text-sm bg-white"
                  value={filter.region}
                  onChange={(e) => setFilter({ ...filter, region: e.target.value })}
                >
                  {(options.regions || ['All']).map((r) => (
                    <option key={r} value={r}>
                      {r === 'All' ? 'All regions' : r}
                    </option>
                  ))}
                </select>
                <select
                  aria-label="Job type"
                  className="shrink-0 border border-slate-300 rounded-lg py-2 px-2 text-sm bg-white"
                  value={filter.type}
                  onChange={(e) => setFilter({ ...filter, type: e.target.value })}
                >
                  {(options.types || ['All']).map((t) => (
                    <option key={t} value={t}>
                      {t === 'All' ? 'Any type' : t}
                    </option>
                  ))}
                </select>
                <select
                  aria-label="Source"
                  className="shrink-0 border border-slate-300 rounded-lg py-2 px-2 text-sm bg-white"
                  value={filter.source}
                  onChange={(e) => setFilter({ ...filter, source: e.target.value })}
                >
                  {(options.sources || ['All']).map((s) => (
                    <option key={s} value={s}>
                      {s === 'All' ? 'Any source' : s}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="mt-2 flex gap-1.5 overflow-x-auto">
              {[
                { label: 'Emirates', type: 'search' },
                { label: 'Qatar Airways', type: 'search' },
                { label: 'Etihad', type: 'search' },
                { label: 'IndiGo', type: 'search' },
                { label: 'Cabin Crew', type: 'category' },
                { label: 'Customer Experience', type: 'category' },
                { label: 'Ground Handling', type: 'category' },
              ].map(({ label, type }) => {
                const active =
                  (type === 'search' && searchTerm === label) ||
                  (type === 'category' && filter.category === label);
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => {
                      if (type === 'category') {
                        setFilter((f) => ({ ...f, category: label }));
                        setSearchTerm('');
                      } else {
                        setSearchTerm(label);
                        setFilter((f) => ({ ...f, category: 'All' }));
                      }
                    }}
                    className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                      active
                        ? 'bg-sky-600 text-white border-sky-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
          <p className="mt-2 text-sm text-slate-600 px-0.5">{resultsLabel}</p>
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
          <div className="text-center py-14 bg-white rounded-2xl border border-slate-200 px-4">
            <p className="text-slate-800 font-semibold text-lg">No jobs match right now</p>
            <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
              Try a different airline name, clear filters, or check back soon — new roles are added
              often.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 inline-flex justify-center px-4 py-2 rounded-xl bg-sky-600 text-white text-sm font-semibold"
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
