import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import courses, { COURSES_PLATFORM } from '../data/courses';
import appConfig from '../config/appConfig';

const Courses = () => {
  const [category, setCategory] = useState('All');
  const categories = ['All', ...new Set(courses.map((c) => c.category))];

  const filtered =
    category === 'All' ? courses : courses.filter((c) => c.category === category);

  const partner = appConfig.partners.courses;

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-sky-900 via-slate-900 to-slate-800 text-white mb-10">
          <div className="px-6 py-12 sm:px-10 sm:py-14 grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <p className="text-sky-300 text-sm font-semibold tracking-wide uppercase">Training Partner</p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold leading-tight">
                Upskill with {partner.name}
              </h1>
              <p className="mt-4 text-sky-100 text-lg leading-relaxed">{partner.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={COURSES_PLATFORM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-lg font-semibold bg-sky-500 hover:bg-sky-400 text-white shadow-lg"
                >
                  Open Courses Platform
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
                <Link
                  to="/jobs"
                  className="inline-flex items-center px-6 py-3 rounded-lg font-semibold bg-white/10 hover:bg-white/20 border border-white/20"
                >
                  Browse Jobs After Training
                </Link>
              </div>
              <p className="mt-4 text-sm text-sky-200/80 break-all">{COURSES_PLATFORM}</p>
            </div>
            <div className="hidden lg:block">
              <div className="rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur">
                <h2 className="text-lg font-semibold text-sky-200">Why train with us?</h2>
                <ul className="mt-4 space-y-3 text-sky-50">
                  <li className="flex gap-3">
                    <span className="text-sky-400">✓</span>
                    Aviation-focused courses for cabin crew, ground ops, GDS & more
                  </li>
                  <li className="flex gap-3">
                    <span className="text-sky-400">✓</span>
                    Learn on QATI platform, get placement support on Runway2Sky
                  </li>
                  <li className="flex gap-3">
                    <span className="text-sky-400">✓</span>
                    Built for freshers and career switchers entering aviation
                  </li>
                  <li className="flex gap-3">
                    <span className="text-sky-400">✓</span>
                    Based in Doha — serving GCC aviation talent
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="text-left">
            <h2 className="text-2xl font-bold text-slate-900">Featured Courses</h2>
            <p className="text-slate-600 mt-1">Enrolment is completed on the {partner.shortName} platform.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  category === cat
                    ? 'bg-sky-600 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-sky-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <article
              key={course.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden flex flex-col hover:shadow-card transition-shadow"
            >
              <div
                className="h-44 bg-cover bg-center"
                style={{ backgroundImage: `url('${course.image}')` }}
                role="img"
                aria-label={course.title}
              >
                <div className="h-full w-full bg-gradient-to-t from-slate-900/70 to-transparent flex items-end p-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/90 text-slate-800">
                    {course.category}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow text-left">
                <h3 className="text-lg font-bold text-slate-900">{course.title}</h3>
                <p className="text-sm text-sky-700 mt-1">{course.partner}</p>
                <p className="text-slate-600 text-sm mt-3 flex-grow leading-relaxed">{course.description}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                  <span className="px-2 py-1 rounded bg-slate-50 border border-slate-100">{course.duration}</span>
                  <span className="px-2 py-1 rounded bg-slate-50 border border-slate-100">{course.mode}</span>
                  <span className="px-2 py-1 rounded bg-slate-50 border border-slate-100">{course.level}</span>
                </div>
                {course.outcomes?.length > 0 && (
                  <ul className="mt-3 text-xs text-slate-500 space-y-1">
                    {course.outcomes.map((o) => (
                      <li key={o}>• {o}</li>
                    ))}
                  </ul>
                )}
                <a
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex justify-center items-center w-full px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700"
                >
                  Enrol on {partner.shortName}
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-2xl border border-slate-100 p-8 text-center shadow-soft">
          <h2 className="text-xl font-bold text-slate-900">Full course catalogue lives on QATI</h2>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto">
            Runway2Sky showcases training that boosts your aviation employability. Payments, lessons, and certificates
            are managed on{' '}
            <a
              href={COURSES_PLATFORM}
              className="text-sky-700 font-medium underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              qataradvancedtraininginstitute.store
            </a>
            .
          </p>
          <a
            href={COURSES_PLATFORM}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center px-6 py-3 rounded-lg font-semibold bg-slate-900 text-white hover:bg-slate-800"
          >
            Visit Qatar Advanced Training Institute
          </a>
        </div>
      </div>
    </div>
  );
};

export default Courses;
