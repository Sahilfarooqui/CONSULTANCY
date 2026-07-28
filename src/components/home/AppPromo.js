import React, { useEffect, useState } from 'react';

/**
 * Full-width Android / student app promo on home page.
 */
const AppPromo = () => {
  const [deferred, setDeferred] = useState(null);

  useEffect(() => {
    const onBip = (e) => {
      e.preventDefault();
      setDeferred(e);
    };
    window.addEventListener('beforeinstallprompt', onBip);
    return () => window.removeEventListener('beforeinstallprompt', onBip);
  }, []);

  const install = async () => {
    if (deferred) {
      deferred.prompt();
      await deferred.userChoice;
      setDeferred(null);
      return;
    }
    alert(
      'Install Runway2Sky on your phone:\n\nAndroid Chrome → menu ⋮ → Install app / Add to Home screen\n\niPhone Safari → Share → Add to Home Screen'
    );
  };

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-600 via-sky-700 to-slate-900 text-white shadow-card">
          <div className="grid lg:grid-cols-2 gap-8 items-center p-8 sm:p-10">
            <div className="text-left">
              <p className="text-emerald-200 text-sm font-semibold uppercase tracking-wide">
                Student mobile app
              </p>
              <h2 className="mt-2 text-3xl font-extrabold leading-tight">
                Download Runway2Sky on Android
              </h2>
              <p className="mt-3 text-sky-100 leading-relaxed">
                Browse IndiGo, SpiceJet, Air India jobs, apply with one tap, and follow the certificate path from
                your phone. Install our free app icon to your home screen — fast for students, no Play Store wait.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-sky-50">
                <li>✓ Airline jobs on the go</li>
                <li>✓ Apply + QATI certificate flow</li>
                <li>✓ Home-screen icon like a real app</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={install}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-white text-slate-900 hover:bg-emerald-50 shadow-lg"
                >
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24A11.46 11.46 0 0012 8.25c-1.2 0-2.35.18-3.43.52L6.7 5.53c-.19-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85L7.45 9.3C4.6 10.9 2.75 13.8 2.5 17.1h19c-.27-3.2-2.07-6.05-4.9-7.62zM7.75 14.5a1 1 0 110-2 1 1 0 010 2zm8.5 0a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                  Get Android app
                </button>
                <a
                  href="/manifest.json"
                  className="inline-flex items-center px-5 py-3 rounded-xl font-semibold border border-white/30 text-white hover:bg-white/10"
                >
                  App info
                </a>
              </div>
              <p className="mt-3 text-xs text-sky-200/80">
                Installable web app (PWA). Native Play Store APK can be published later from the same brand.
              </p>
            </div>

            {/* Phone mock with app icon */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-48 h-80 rounded-[2rem] border-4 border-white/20 bg-slate-950/80 shadow-2xl p-4 flex flex-col items-center justify-center">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-full bg-white/20" />
                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-sky-400 to-sky-800 flex items-center justify-center shadow-xl animate-pulse">
                  <svg className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                  </svg>
                </div>
                <p className="mt-4 font-bold text-white">Runway2Sky</p>
                <p className="text-xs text-slate-400">Tap Download on site</p>
                <div className="mt-6 w-full space-y-2">
                  <div className="h-2 rounded bg-white/10" />
                  <div className="h-2 rounded bg-white/10 w-4/5" />
                  <div className="h-8 rounded-lg bg-emerald-500/90 mt-3 flex items-center justify-center text-xs font-bold">
                    Install app
                  </div>
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
