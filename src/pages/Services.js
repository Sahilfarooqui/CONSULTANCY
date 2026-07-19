import React from 'react';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const services = [
    {
      title: 'Aviation Recruitment',
      description:
        'We source cabin crew, ground staff, engineers, flight ops, security, cargo, and corporate aviation talent for employers across the GCC and beyond.',
    },
    {
      title: 'Multi-Platform Job Aggregation',
      description:
        'Open roles from LinkedIn, Indeed, GulfTalent, Bayt, company career pages, and direct clients are published on Runway2Sky so candidates see everything in one board.',
    },
    {
      title: 'Fresher Pathway',
      description:
        'Special support for first-job seekers: role matching, application guidance, and links to QATI courses that improve hireability.',
    },
    {
      title: 'Experienced Placement',
      description:
        'For licensed engineers, pilots, ops controllers, and managers — targeted opportunities and confidential career moves.',
    },
    {
      title: 'Career Coaching',
      description:
        'CV polishing, interview practice, and airline assessment tips tailored to aviation hiring standards.',
    },
    {
      title: 'Training Partnership (QATI)',
      description:
        'Integrated upskilling via Qatar Advanced Training Institute — cabin crew, GDS, ground ops, AVSEC awareness, and more.',
    },
  ];

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Our Services</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            End-to-end aviation career services for candidates and employers.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft text-left"
            >
              <h2 className="text-xl font-bold text-slate-900">{s.title}</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            to="/jobs"
            className="px-6 py-3 rounded-xl font-semibold bg-sky-600 text-white hover:bg-sky-700"
          >
            Browse Jobs
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-xl font-semibold bg-white text-sky-800 border border-sky-200 hover:bg-sky-50"
          >
            Talk to Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
