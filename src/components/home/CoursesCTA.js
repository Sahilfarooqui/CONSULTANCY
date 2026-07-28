import React from 'react';
import { Link } from 'react-router-dom';
import appConfig from '../../config/appConfig';

const CoursesCTA = () => {
  const partner = appConfig.partners.courses;

  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl sm:rounded-3xl bg-[#0a1628] text-white overflow-hidden">
          <div className="px-6 py-10 sm:px-12 sm:py-14 max-w-2xl text-left">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-sky-400">Training partner</p>
            <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">{partner.name}</h2>
            <p className="mt-4 text-slate-300 leading-relaxed text-sm sm:text-base">{partner.description}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/courses"
                className="inline-flex justify-center items-center h-11 px-6 rounded-lg text-sm font-semibold bg-white text-[#0a1628] hover:bg-sky-50"
              >
                View programmes
              </Link>
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center h-11 px-6 rounded-lg text-sm font-semibold border border-white/25 text-white hover:bg-white/10"
              >
                QATI platform
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesCTA;
