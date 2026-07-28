import React from 'react';
import { Link } from 'react-router-dom';
import { COURSES_PLATFORM } from '../../data/courses';
import appConfig from '../../config/appConfig';

const STEPS = [
  {
    n: '1',
    title: 'Find a job',
    desc: 'Browse IndiGo, SpiceJet, Air India and more. Pick a role that fits you.',
    icon: '🔍',
    to: '/jobs',
    cta: 'See jobs',
  },
  {
    n: '2',
    title: 'Get certified',
    desc: 'Take the matching course on QATI (our Qatar partner), finish the test, get your certificate.',
    icon: '🎓',
    href: COURSES_PLATFORM,
    cta: 'Open courses',
  },
  {
    n: '3',
    title: 'Apply with us',
    desc: 'Submit your form on Runway2Sky. We guide you and keep you updated on WhatsApp.',
    icon: '✅',
    to: '/contact',
    cta: 'Contact us',
  },
];

/**
 * Simple 3-step path — easy for students to understand.
 */
const CertificateJourney = () => {
  const wa = `https://wa.me/${appConfig.contact.whatsapp}?text=${encodeURIComponent(
    'Hi Runway2Sky, explain how to apply and get a certificate.'
  )}`;

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-sky-600 text-sm font-semibold uppercase tracking-wide">Easy 3 steps</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
            How Runway2Sky works
          </h2>
          <p className="mt-2 text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
            Job → Certificate → Apply. Simple for freshers.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="relative rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6 text-left flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-white font-bold text-sm">
                  {s.n}
                </span>
                <span className="text-2xl" aria-hidden>
                  {s.icon}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">{s.desc}</p>
              {s.to ? (
                <Link
                  to={s.to}
                  className="mt-4 inline-flex text-sm font-semibold text-sky-700 hover:text-sky-900"
                >
                  {s.cta} →
                </Link>
              ) : (
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex text-sm font-semibold text-sky-700 hover:text-sky-900"
                >
                  {s.cta} →
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/jobs"
            className="inline-flex justify-center items-center px-6 py-3 rounded-xl font-semibold bg-sky-600 text-white hover:bg-sky-700"
          >
            Start with jobs
          </Link>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center items-center px-6 py-3 rounded-xl font-semibold bg-emerald-600 text-white hover:bg-emerald-500"
          >
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default CertificateJourney;
