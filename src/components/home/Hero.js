import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-slate-950 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/85 to-slate-950" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
        <div className="max-w-3xl text-left">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-sky-500/25 text-sky-100 border border-sky-400/40">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
            India · Domestic airlines · Freshers welcome
          </span>

          <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Your runway to{' '}
            <span className="text-sky-300">IndiGo, SpiceJet, Air India</span>
            {' '}&amp; more
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
            Cabin crew, ground staff and airport jobs. Apply via Runway2Sky — get required certificates from our Qatar
            partner QATI.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link
              to="/jobs"
              className="inline-flex justify-center items-center px-6 py-3.5 rounded-xl text-base font-semibold text-slate-900 bg-white hover:bg-sky-50 shadow-lg"
            >
              Browse aviation jobs
            </Link>
            <Link
              to="/courses"
              className="inline-flex justify-center items-center px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-sky-600 hover:bg-sky-500 shadow-lg"
            >
              Get certificates
            </Link>
            <Link
              to="/install"
              className="inline-flex justify-center items-center px-6 py-3.5 rounded-xl text-base font-semibold text-emerald-50 border-2 border-emerald-400/60 hover:bg-emerald-500/20"
            >
              Install app
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-4 max-w-md">
            {[
              { label: 'Focus', value: 'India' },
              { label: 'Level', value: 'Freshers' },
              { label: 'Airlines', value: 'Top first' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-white/10 border border-white/15 px-2 py-3 text-center"
              >
                <dt className="text-[10px] sm:text-xs text-slate-300">{stat.label}</dt>
                <dd className="mt-1 text-sm sm:text-base font-bold text-white">{stat.value}</dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
