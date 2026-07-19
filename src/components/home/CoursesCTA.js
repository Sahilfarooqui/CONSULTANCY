import React from 'react';
import { Link } from 'react-router-dom';
import appConfig from '../../config/appConfig';

const CoursesCTA = () => {
  const partner = appConfig.partners.courses;

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-sky-700 to-slate-900 p-8 sm:p-12 text-white overflow-hidden relative">
          <div className="relative z-10 max-w-2xl text-left">
            <p className="text-sky-200 text-sm font-semibold uppercase tracking-wide">Official training partner</p>
            <h2 className="mt-2 text-3xl font-extrabold">{partner.name}</h2>
            <p className="mt-4 text-sky-100 text-lg leading-relaxed">{partner.description}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/courses"
                className="inline-flex justify-center px-6 py-3 rounded-xl font-semibold bg-white text-sky-900 hover:bg-sky-50"
              >
                Browse courses on Runway2Sky
              </Link>
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center px-6 py-3 rounded-xl font-semibold bg-sky-500/30 border border-sky-300/40 hover:bg-sky-500/40"
              >
                Go to QATI platform
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesCTA;
