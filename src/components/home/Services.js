import React from 'react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Airline recruitment',
    description:
      'Curated openings for cabin crew, ground staff and airport operations across major Indian carriers.',
    to: '/jobs',
    cta: 'Browse jobs',
  },
  {
    title: 'Professional training',
    description:
      'Partner programmes with Qatar Advanced Training Institute — certificates aligned to each role type.',
    to: '/courses',
    cta: 'View courses',
  },
  {
    title: 'Candidate support',
    description:
      'Application guidance and career support for freshers entering the aviation industry.',
    to: '/contact',
    cta: 'Get in touch',
  },
];

const Services = () => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10 text-left sm:text-center sm:mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-sky-600">Services</p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
            Built for aviation careers
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="rounded-2xl border border-slate-200 p-6 sm:p-8 text-left hover:border-sky-200 hover:shadow-md transition-all bg-white"
            >
              <p className="text-xs font-semibold text-slate-400 tracking-widest">0{i + 1}</p>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed min-h-[4.5rem]">{s.description}</p>
              <Link to={s.to} className="mt-5 inline-flex text-sm font-semibold text-sky-700 hover:text-sky-900">
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
