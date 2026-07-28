import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import usePwaInstall from '../hooks/usePwaInstall';
import appConfig from '../config/appConfig';

/**
 * Full Android app install page — real PWA install + clear steps.
 */
const Install = () => {
  const { install, installed, canPrompt } = usePwaInstall();
  const [status, setStatus] = useState('');

  const handleInstall = async () => {
    const result = await install();
    if (result.ok) {
      setStatus('success');
      return;
    }
    if (result.reason === 'dismissed') {
      setStatus('dismissed');
      return;
    }
    setStatus('manual');
  };

  return (
    <div className="min-h-[75vh] bg-slate-50">
      <div className="bg-[#0a1628] text-white py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="mx-auto h-20 w-20 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-800 flex items-center justify-center shadow-xl">
            <svg className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>
          <h1 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight">Runway2Sky Android App</h1>
          <p className="mt-3 text-slate-300 max-w-lg mx-auto">
            Install free on your phone. Browse airline jobs and apply anytime from your home screen.
          </p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 -mt-8 pb-16">
        <div className="rounded-2xl bg-white border border-slate-200 shadow-lg p-6 sm:p-8">
          {installed || status === 'success' ? (
            <div className="text-center">
              <p className="text-lg font-semibold text-emerald-700">App is installed</p>
              <p className="mt-2 text-sm text-slate-600">
                Open the Runway2Sky icon on your home screen for the full app experience.
              </p>
              <Link
                to="/jobs"
                className="mt-6 inline-flex h-12 items-center justify-center px-6 rounded-lg bg-sky-600 text-white font-semibold"
              >
                Go to jobs
              </Link>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={handleInstall}
                className="w-full h-14 rounded-xl bg-[#0a1628] hover:bg-slate-800 text-white text-base font-semibold flex items-center justify-center gap-2 shadow-md"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24A11.46 11.46 0 0012 8.25c-1.2 0-2.35.18-3.43.52L6.7 5.53c-.19-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85L7.45 9.3C4.6 10.9 2.75 13.8 2.5 17.1h19c-.27-3.2-2.07-6.05-4.9-7.62zM7.75 14.5a1 1 0 110-2 1 1 0 010 2zm8.5 0a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
                {canPrompt ? 'Install app now' : 'Install Android app'}
              </button>

              {canPrompt && (
                <p className="mt-3 text-center text-sm text-emerald-700 font-medium">
                  Your browser supports one-tap install. Tap the button above.
                </p>
              )}

              {(status === 'manual' || status === 'dismissed' || !canPrompt) && (
                <div className="mt-6 text-left">
                  <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                    Android (Chrome) — 30 seconds
                  </h2>
                  <ol className="mt-3 space-y-3 text-sm text-slate-700">
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-800 text-xs font-bold">
                        1
                      </span>
                      Open this website in <strong className="mx-1">Chrome</strong> on your Android phone
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-800 text-xs font-bold">
                        2
                      </span>
                      Tap the menu <strong className="mx-1">⋮</strong> (top right)
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-800 text-xs font-bold">
                        3
                      </span>
                      Tap <strong className="mx-1">Install app</strong> or <strong className="mx-1">Add to Home screen</strong>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-800 text-xs font-bold">
                        4
                      </span>
                      Confirm — the Runway2Sky icon appears on your home screen
                    </li>
                  </ol>

                  <h2 className="mt-6 text-sm font-semibold text-slate-900 uppercase tracking-wide">iPhone</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Safari → Share → <strong>Add to Home Screen</strong> → Add
                  </p>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-slate-100 grid sm:grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/${appConfig.contact.whatsapp}?text=${encodeURIComponent(
                    'Hi, I need help installing the Runway2Sky app.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center h-11 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Need help? WhatsApp
                </a>
                <Link
                  to="/jobs"
                  className="inline-flex justify-center items-center h-11 rounded-lg bg-sky-600 text-sm font-semibold text-white hover:bg-sky-700"
                >
                  Browse jobs on web
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Install;
