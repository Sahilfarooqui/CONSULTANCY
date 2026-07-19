import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      title: 'Aviation Job Board',
      description:
        'Open roles for freshers and experienced talent — cabin crew, ground ops, MRO, cargo, security, and more from multiple platforms.',
      icon: '✈️',
      to: '/jobs',
      cta: 'View jobs',
    },
    {
      title: 'Training with QATI',
      description:
        'Upskill on Qatar Advanced Training Institute courses tailored for aviation careers, then apply with confidence.',
      icon: '🎓',
      to: '/courses',
      cta: 'See courses',
    },
    {
      title: 'Career Consultancy',
      description:
        'CV review, interview prep, and guidance for airline and airport hiring processes across the GCC.',
      icon: '📈',
      to: '/services',
      cta: 'Learn more',
    },
    {
      title: 'Employer Hiring',
      description:
        'Airlines, ground handlers, and MROs can publish vacancies on Runway2Sky and reach aviation-ready candidates.',
      icon: '🤝',
      to: '/contact',
      cta: 'Post a role',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-sky-600">What we do</h2>
          <p className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">Built for aviation careers</p>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Jobs, training, and consultancy under one brand — Runway2Sky.
          </p>
        </div>

        <div className="mt-12 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl p-7 shadow-soft border border-slate-100 hover:shadow-card transition-all duration-300 hover:-translate-y-1 text-left"
            >
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-sky-50 text-2xl mb-4">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">{service.description}</p>
              <Link to={service.to} className="text-sky-700 hover:text-sky-900 font-semibold text-sm inline-flex items-center">
                {service.cta}
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
