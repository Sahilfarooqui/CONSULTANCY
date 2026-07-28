import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Dedicated install page — works even when browser has no beforeinstallprompt.
 */
const Install = () => {
  const [deferred, setDeferred] = useState(null);
  const [status, setStatus] = useState('');
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);

    const onBip = (e) => {
      e.preventDefault();
      setDeferred(e);
      setStatus('ready');
    };
    window.addEventListener('beforeinstallprompt', onBip);
    window.addEventListener('appinstalled', () => {
      setStatus('installed');
      setIsStandalone(true);
    });
    return () => window.removeEventListener('beforeinstallprompt', onBip);
  }, []);

  const tryInstall = async () => {
    if (!deferred) {
      setStatus('manual');
      return;
    }
    try {
      deferred.prompt();
      const { outcome } = await deferred.userChoice;
      setStatus(outcome === 'accepted' ? 'installed' : 'dismissed');
      setDeferred(null);
    } catch {
      setStatus('manual');
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setStatus('copied');
    } catch {
      setStatus('manual');
    }
  };

  return (
    <div className="min-h-[70vh] bg-slate-50 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto h-20 w-20 rounded-3xl bg-gradient-to-br from-sky-500 to-sky-800 flex items-center justify-center shadow-xl text-white">
            <svg className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>
          <h1 className="mt-5 text-3xl font-extrabold text-slate-900">Install Runway2Sky App</h1>
          <p className="mt-2 text-slate-600">
            Free student app icon on your phone — jobs, apply & certificates in one tap.
          </p>
        </div>

        {isStandalone ? (
          <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center">
            <p className="text-lg font-bold text-emerald-900">App already installed ✓</p>
            <p className="mt-1 text-emerald-800 text-sm">You are using Runway2Sky as an app.</p>
            <Link to="/jobs" className="mt-4 inline-flex px-5 py-3 rounded-xl bg-emerald-600 text-white font-semibold">
              Browse jobs
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              type="button"
              onClick={tryInstall}
              className="w-full flex items-center justify-center gap-2 h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-lg font-bold shadow-lg"
            >
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24A11.46 11.46 0 0012 8.25c-1.2 0-2.35.18-3.43.52L6.7 5.53c-.19-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85L7.45 9.3C4.6 10.9 2.75 13.8 2.5 17.1h19c-.27-3.2-2.07-6.05-4.9-7.62zM7.75 14.5a1 1 0 110-2 1 1 0 010 2zm8.5 0a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
              {deferred ? 'Install now' : 'Show install steps'}
            </button>

            {(status === 'manual' || status === 'dismissed' || !deferred) && (
              <div className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm">
                <h2 className="font-bold text-slate-900 text-lg">How to install (Android)</h2>
                <ol className="mt-3 space-y-3 text-sm text-slate-700 list-decimal list-inside">
                  <li>
                    Open this site in <strong>Chrome</strong> on your phone
                  </li>
                  <li>
                    Tap the menu <strong>⋮</strong> (top right)
                  </li>
                  <li>
                    Tap <strong>Install app</strong> or <strong>Add to Home screen</strong>
                  </li>
                  <li>
                    Tap <strong>Install</strong> / <strong>Add</strong>
                  </li>
                </ol>
                <h2 className="mt-5 font-bold text-slate-900 text-lg">iPhone (Safari)</h2>
                <ol className="mt-2 space-y-2 text-sm text-slate-700 list-decimal list-inside">
                  <li>Tap the Share button</li>
                  <li>Tap Add to Home Screen</li>
                  <li>Tap Add</li>
                </ol>
              </div>
            )}

            {status === 'copied' && (
              <p className="text-center text-sm font-medium text-emerald-700">Link copied — open it in Chrome on your phone.</p>
            )}
            {status === 'installed' && (
              <p className="text-center text-sm font-medium text-emerald-700">Installed! Open the Runway2Sky icon on your home screen.</p>
            )}

            <button
              type="button"
              onClick={copyLink}
              className="w-full h-12 rounded-xl border-2 border-slate-300 bg-white font-semibold text-slate-800 hover:bg-slate-50"
            >
              Copy website link for phone
            </button>

            <Link
              to="/jobs"
              className="flex w-full h-12 items-center justify-center rounded-xl bg-sky-600 text-white font-semibold hover:bg-sky-700"
            >
              Continue to jobs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Install;
