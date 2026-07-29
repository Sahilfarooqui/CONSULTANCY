import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-[#0a1628] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1800&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/95 to-[#0a1628]/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-[#0a1628]/40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="max-w-2xl text-left">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-sky-300/90">
            Aviation careers · India
          </p>

          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.15]">
            Launch your career with
            <span className="block mt-1 text-sky-300 font-semibold">
              India&apos;s leading airlines
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal">
            Emirates, Qatar Airways, Etihad, US &amp; UK carriers, Qantas, India airlines and 100+ more — cabin crew,
            customer experience and ground operations. Apply via Runway2Sky with QATI training support.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to="/jobs"
              className="inline-flex justify-center items-center h-12 px-8 rounded-lg text-sm font-semibold tracking-wide text-[#0a1628] bg-white hover:bg-sky-50 transition shadow-lg shadow-black/20"
            >
              Explore open positions
            </Link>
            <Link
              to="/app"
              className="inline-flex justify-center items-center h-12 px-8 rounded-lg text-sm font-semibold tracking-wide text-white border border-white/30 hover:bg-white/10 transition"
            >
              Get the mobile app
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              Freshers welcome
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              Top airlines first
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              QATI certified training
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
