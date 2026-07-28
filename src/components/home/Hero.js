import React from 'react';
import { Link } from 'react-router-dom';
import appConfig from '../../config/appConfig';

const Hero = () => {
  const wa = `https://wa.me/${appConfig.contact.whatsapp}?text=${encodeURIComponent(
    'Hi Runway2Sky, I am looking for aviation jobs.'
  )}`;

  return (
    <section className="relative bg-slate-950 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-35"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-950/90 to-slate-950" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-2xl text-left">
          <p className="inline-flex items-center gap-2 text-xs font-semibold text-sky-200 bg-sky-500/20 border border-sky-400/30 rounded-full px-3 py-1">
            ✈️ India airline jobs for freshers
          </p>

          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Find cabin crew &amp; airport jobs.
            <span className="block text-sky-300 mt-1">Apply in minutes.</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
            IndiGo, SpiceJet, Air India, Akasa and more — listed first. We help with applications and QATI training
            certificates.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              to="/jobs"
              className="inline-flex justify-center items-center h-12 px-6 rounded-xl text-base font-bold text-slate-900 bg-white hover:bg-sky-50 shadow-lg"
            >
              Browse jobs
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center h-12 px-6 rounded-xl text-base font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg"
            >
              WhatsApp help
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {['IndiGo', 'Air India', 'SpiceJet', 'Akasa', 'Cabin crew', 'Ground staff'].map((t) => (
              <Link
                key={t}
                to={`/jobs`}
                state={{ q: t }}
                className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/10 text-sky-100 border border-white/15 hover:bg-white/20"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
