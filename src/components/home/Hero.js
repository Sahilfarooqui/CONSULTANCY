import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-slate-950 via-sky-950 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-sky-950/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        <div className="max-w-3xl text-left">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-200 border border-sky-400/30">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
            Aviation jobs · Freshers & experienced
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight animate-fade-in">
            Your runway to an{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-cyan-200">
              aviation career
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl animate-fade-in-up">
            Runway2Sky is the aviation careers hub for cabin crew, ground ops, engineers, and airline professionals.
            Browse open roles from LinkedIn and other platforms, then upskill with Qatar Advanced Training Institute.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 animate-fade-in-up">
            <Link
              to="/jobs"
              className="inline-flex justify-center items-center px-8 py-3.5 rounded-xl text-base font-semibold text-slate-900 bg-white hover:bg-sky-50 shadow-lg transition-all"
            >
              Browse Aviation Jobs
            </Link>
            <Link
              to="/courses"
              className="inline-flex justify-center items-center px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-sky-600 hover:bg-sky-500 shadow-lg transition-all"
            >
              Explore Courses
            </Link>
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-4 max-w-lg">
            {[
              { label: 'Job sources', value: '6+' },
              { label: 'Focus', value: 'Aviation' },
              { label: 'Base', value: 'Doha' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white/5 border border-white/10 px-3 py-3 text-center">
                <dt className="text-xs text-slate-400">{stat.label}</dt>
                <dd className="mt-1 text-lg font-bold text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Hero;
