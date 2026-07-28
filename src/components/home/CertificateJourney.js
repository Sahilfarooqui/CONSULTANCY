import React from 'react';
import { Link } from 'react-router-dom';
import { COURSES_PLATFORM } from '../../data/courses';

const STEPS = [
  {
    n: '01',
    title: 'Discover roles',
    desc: 'Browse openings with IndiGo, Air India, SpiceJet, Akasa and airport partners.',
    link: '/jobs',
    label: 'View jobs',
  },
  {
    n: '02',
    title: 'Complete training',
    desc: 'Enrol in the recommended QATI programme, complete assessments, earn your certificate.',
    href: COURSES_PLATFORM,
    label: 'Open QATI',
  },
  {
    n: '03',
    title: 'Apply with confidence',
    desc: 'Submit your application through Runway2Sky. Our team supports you through the process.',
    link: '/contact',
    label: 'Contact team',
  },
];

const CertificateJourney = () => {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-sky-600">Process</p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
            A clear path from interest to application
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Three simple stages designed for freshers entering aviation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className="relative rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8 text-left"
            >
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-4 w-8 h-px bg-slate-200 z-10" aria-hidden />
              )}
              <p className="text-xs font-semibold tracking-widest text-sky-600">{s.n}</p>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed min-h-[4rem]">{s.desc}</p>
              {s.link ? (
                <Link to={s.link} className="mt-5 inline-flex text-sm font-semibold text-sky-700 hover:text-sky-900">
                  {s.label} →
                </Link>
              ) : (
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex text-sm font-semibold text-sky-700 hover:text-sky-900"
                >
                  {s.label} →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificateJourney;
