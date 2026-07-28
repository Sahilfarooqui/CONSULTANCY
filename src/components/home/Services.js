import React from 'react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Find jobs',
    description: 'Cabin crew, ground staff, airport roles for IndiGo, SpiceJet, Air India and more.',
    icon: '✈️',
    to: '/jobs',
    cta: 'Browse jobs',
  },
  {
    title: 'Get trained',
    description: 'QATI certificates for cabin crew, ground ops, GDS and more — then apply with confidence.',
    icon: '🎓',
    to: '/courses',
    cta: 'See courses',
  },
  {
    title: 'Get help',
    description: 'Stuck? Message us on WhatsApp or use Contact. We guide freshers step by step.',
    icon: '💬',
    to: '/contact',
    cta: 'Contact us',
  },
];

const Services = () => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Everything in one place</h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">Jobs · Training · Support</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6 text-left flex flex-col"
            >
              <span className="text-3xl mb-3" aria-hidden>
                {s.icon}
              </span>
              <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600 flex-1 leading-relaxed">{s.description}</p>
              <Link to={s.to} className="mt-4 text-sm font-semibold text-sky-700 hover:text-sky-900">
                {s.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
