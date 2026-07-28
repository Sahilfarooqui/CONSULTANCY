import React, { useEffect, useState } from 'react';

/**
 * Floating install chip — clean alignment, clear buttons.
 */
const AppDownloadBanner = () => {
  const [deferred, setDeferred] = useState(null);
  const [visible, setVisible] = useState(true);
  const [installed, setInstalled] = useState(false);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('r2s_app_banner_dismissed')) setVisible(false);
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true);
      setVisible(false);
    }

    const onBip = (e) => {
      e.preventDefault();
      setDeferred(e);
    };
    const onInstalled = () => {
      setInstalled(true);
      setVisible(false);
    };
    window.addEventListener('beforeinstallprompt', onBip);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBip);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const install = async () => {
    if (deferred) {
      deferred.prompt();
      const choice = await deferred.userChoice;
      if (choice.outcome === 'accepted') {
        setInstalled(true);
        setVisible(false);
      }
      setDeferred(null);
      return;
    }
    setHint(true);
  };

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem('r2s_app_banner_dismissed', '1');
  };

  if (!visible || installed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-40 flex flex-col items-stretch sm:items-end gap-2 sm:max-w-sm pointer-events-none">
      {hint && (
        <div className="pointer-events-auto rounded-2xl bg-slate-900 text-white text-sm p-4 shadow-2xl border border-slate-600 text-left">
          <p className="font-bold mb-1">Install Runway2Sky app</p>
          <p className="text-slate-300 text-xs leading-relaxed">
            <strong className="text-white">Android Chrome:</strong> menu (⋮) → Install app / Add to Home screen.
            <br />
            <strong className="text-white">iPhone:</strong> Share → Add to Home Screen.
          </p>
          <button
            type="button"
            onClick={() => setHint(false)}
            className="mt-3 w-full h-10 rounded-xl bg-sky-500 font-semibold text-white hover:bg-sky-400"
          >
            Got it
          </button>
        </div>
      )}

      <div className="pointer-events-auto flex items-center gap-3 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-600 p-2.5 pl-3">
        <div className="h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-sky-400 to-sky-700 flex items-center justify-center">
          <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>
        </div>
        <div className="min-w-0 flex-1 text-left">
          <p className="text-sm font-bold leading-tight">Get the App</p>
          <p className="text-xs text-slate-400 leading-tight mt-0.5">Students · Android</p>
        </div>
        <button
          type="button"
          onClick={install}
          className="shrink-0 h-11 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-bold"
        >
          Download
        </button>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 h-11 w-11 inline-flex items-center justify-center rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
          aria-label="Dismiss app banner"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AppDownloadBanner;
