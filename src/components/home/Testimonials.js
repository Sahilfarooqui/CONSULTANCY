import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        'I applied as a fresher for cabin crew through Runway2Sky. They guided my CV and interview prep — I got shortlisted within weeks.',
      author: 'Aisha Khan',
      position: 'Cabin Crew Trainee',
    },
    {
      quote:
        'Having jobs from LinkedIn and other boards in one aviation-focused place saved me hours. The QATI GDS course helped me land a ticketing role.',
      author: 'Omar Hassan',
      position: 'Reservations Agent',
    },
    {
      quote:
        'As an experienced B1 engineer relocating to Qatar, Runway2Sky connected me with the right MRO opportunities quickly.',
      author: 'Priya Nair',
      position: 'Licensed Aircraft Engineer',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-sky-600">Testimonials</h2>
          <p className="mt-2 text-3xl font-extrabold text-slate-900">Stories from the runway</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote
              key={t.author}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-left shadow-soft"
            >
              <p className="text-slate-700 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-5">
                <p className="font-semibold text-slate-900">{t.author}</p>
                <p className="text-sm text-sky-700">{t.position}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
