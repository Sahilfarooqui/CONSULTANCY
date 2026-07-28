import React from 'react';
import { Link } from 'react-router-dom';

const AppPromo = () => {
  return (
    <section className="py-12 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-600 via-sky-700 to-slate-900 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center p-6 sm:p-10">
            <div className="text-left">
              <p className="text-emerald-200 text-sm font-semibold uppercase tracking-wide">Student mobile app</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold leading-tight">
                Install Runway2Sky on your phone
              </h2>
              <p className="mt-3 text-sky-100 leading-relaxed text-sm sm:text-base">
                Browse IndiGo, SpiceJet, Air India jobs and complete QATI certificates from your home screen — free for
                students.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-sky-50">
                <li className="flex gap-2">
                  <span className="text-emerald-300">✓</span> Airline jobs on the go
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-300">✓</span> Apply + certificate path
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-300">✓</span> One-tap install instructions
                </li>
              </ul>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/install"
                  className="inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-white text-slate-900 hover:bg-emerald-50 shadow-lg"
                >
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24A11.46 11.46 0 0012 8.25c-1.2 0-2.35.18-3.43.52L6.7 5.53c-.19-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85L7.45 9.3C4.6 10.9 2.75 13.8 2.5 17.1h19c-.27-3.2-2.07-6.05-4.9-7.62zM7.75 14.5a1 1 0 110-2 1 1 0 010 2zm8.5 0a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                  Install app
                </Link>
                <Link
                  to="/jobs"
                  className="inline-flex justify-center items-center px-6 py-3.5 rounded-xl font-semibold border-2 border-white/40 text-white hover:bg-white/10"
                >
                  Browse jobs first
                </Link>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative w-44 sm:w-48 h-72 sm:h-80 rounded-[2rem] border-4 border-white/25 bg-slate-950/90 shadow-2xl p-4 flex flex-col items-center justify-center">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-full bg-white/25" />
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-3xl bg-gradient-to-br from-sky-400 to-sky-800 flex items-center justify-center shadow-xl">
                  <svg className="h-8 w-8 sm:h-10 sm:w-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                  </svg>
                </div>
                <p className="mt-4 font-bold text-white text-center">Runway2Sky</p>
                <p className="text-xs text-slate-400 text-center">Home screen icon</p>
                <Link
                  to="/install"
                  className="mt-5 w-full h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-xs font-bold text-white"
                >
                  Open install page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPromo;
