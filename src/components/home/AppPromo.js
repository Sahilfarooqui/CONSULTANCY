import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import usePwaInstall from '../../hooks/usePwaInstall';

/**
 * Professional mobile app section — real install prompt + guided Android install.
 */
const AppPromo = () => {
  const { install, installed, canPrompt } = usePwaInstall();
  const [msg, setMsg] = useState('');

  const onInstall = async () => {
    const result = await install();
    if (result.ok) {
      setMsg('App installed. Open Runway2Sky from your home screen.');
      return;
    }
    // Navigate to full install guide when browser cannot auto-prompt
    window.location.href = '/app';
  };

  return (
    <section className="py-16 sm:py-20 bg-[#0a1628] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="text-left order-2 lg:order-1">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-sky-400">Mobile app</p>
            <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">
              Runway2Sky on Android
            </h2>
            <p className="mt-4 text-slate-300 leading-relaxed text-base">
              Install our free app for a full-screen experience — browse airline jobs, apply, and access QATI courses
              from your home screen. No Play Store wait required.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              {[
                'One-tap access to IndiGo, Air India, SpiceJet jobs',
                'Apply with certificate guidance offline-ready',
                'Works like a native app (secure & lightweight)',
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-sky-300 text-xs">
                    ✓
                  </span>
                  {line}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              {installed ? (
                <Link
                  to="/jobs"
                  className="inline-flex justify-center items-center h-12 px-6 rounded-lg text-sm font-semibold bg-sky-500 text-white hover:bg-sky-400"
                >
                  Open jobs in app
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={onInstall}
                  className="inline-flex justify-center items-center gap-2 h-12 px-6 rounded-lg text-sm font-semibold bg-white text-[#0a1628] hover:bg-sky-50 shadow-lg"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24A11.46 11.46 0 0012 8.25c-1.2 0-2.35.18-3.43.52L6.7 5.53c-.19-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85L7.45 9.3C4.6 10.9 2.75 13.8 2.5 17.1h19c-.27-3.2-2.07-6.05-4.9-7.62zM7.75 14.5a1 1 0 110-2 1 1 0 010 2zm8.5 0a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                  {canPrompt ? 'Install Android app' : 'Install Android app'}
                </button>
              )}
              <Link
                to="/app"
                className="inline-flex justify-center items-center h-12 px-6 rounded-lg text-sm font-semibold border border-white/25 text-white hover:bg-white/10"
              >
                Installation guide
              </Link>
            </div>
            {msg && <p className="mt-3 text-sm text-emerald-300">{msg}</p>}
            <p className="mt-4 text-xs text-slate-500">
              Compatible with Android Chrome. iPhone users: Safari → Share → Add to Home Screen.
            </p>
          </div>

          {/* Phone mockup */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-[240px] h-[480px] rounded-[2.2rem] border-[10px] border-slate-700 bg-slate-900 shadow-2xl overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-7 bg-slate-900 z-10 flex justify-center items-end pb-1">
                <div className="w-20 h-4 rounded-b-xl bg-black" />
              </div>
              <div className="h-full pt-10 px-4 pb-6 bg-gradient-to-b from-sky-950 to-slate-950 flex flex-col">
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-sky-400 to-sky-700 flex items-center justify-center">
                    <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">Runway2Sky</p>
                    <p className="text-[10px] text-slate-400">Aviation careers</p>
                  </div>
                </div>
                <div className="space-y-2 flex-1">
                  {['IndiGo · Cabin Crew', 'Air India · Ground Staff', 'SpiceJet · Freshers'].map((j) => (
                    <div key={j} className="rounded-xl bg-white/5 border border-white/10 px-3 py-2.5">
                      <p className="text-xs text-white font-medium">{j}</p>
                      <p className="text-[10px] text-sky-400 mt-0.5">Apply now</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-xs font-semibold text-white">
                  Install for free
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPromo;
