import React from 'react';

const SuccessStories = () => {
  const stories = [
    {
      title: 'From graduate to airport agent',
      client: 'Sara Al-Mansoori',
      role: 'Ground Operations',
      story:
        'After completing ground ops training with QATI, Sara used Runway2Sky to apply for airport customer service roles and secured a position at a major Gulf hub.',
    },
    {
      title: 'Cabin crew dream achieved',
      client: 'James Okonkwo',
      role: 'Cabin Crew',
      story:
        'James had hospitality experience but no airline background. Fresher-friendly cabin crew listings and interview coaching helped him clear assessments.',
    },
    {
      title: 'MRO career move to Doha',
      client: 'Chen Wei',
      role: 'Aircraft Maintenance',
      story:
        'An experienced technician used our board to find B1/B2 openings and relocated with a competitive package through a partner MRO.',
    },
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-sky-600">Success stories</h2>
          <p className="mt-2 text-3xl font-extrabold text-slate-900">Careers that took off</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {stories.map((s) => (
            <div key={s.client} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft text-left">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">{s.role}</p>
              <h3 className="mt-2 text-lg font-bold text-slate-900">{s.title}</h3>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">{s.story}</p>
              <p className="mt-4 text-sm font-semibold text-slate-800">— {s.client}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
