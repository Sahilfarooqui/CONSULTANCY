import React, { useEffect, useState } from 'react';

/**
 * Android / PWA install prompt — floating + footer-friendly card.
 * Students can "download" the app icon to home screen (installable PWA).
 */
const AppDownloadBanner = () => {
  const [deferred, setDeferred] = useState(null);
  const [visible, setVisible] = useState(true);
  const [installed, setInstalled] = useState(false);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('r2s_app_banner_dismissed');
    if (dismissed) setVisible(false);

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
    // Fallback instructions (iOS / browsers without BIP)
    setHint(true);
  };

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem('r2s_app_banner_dismissed', '1');
  };

  if (!visible || installed) return null;

  return (
    <>
      {/* Floating Android-style install chip */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 max-w-[min(100vw-2rem,20rem)]">
        {hint && (
          <div className="rounded-xl bg-slate-900 text-white text-xs p-3 shadow-xl border border-slate-700">
            <p className="font-semibold mb-1">Install Runway2Sky</p>
            <p className="text-slate-300 leading-relaxed">
              <strong>Android Chrome:</strong> menu (⋮) → <em>Install app</em> or <em>Add to Home screen</em>.
              <br />
              <strong>iPhone:</strong> Share → Add to Home Screen.
            </p>
            <button type="button" onClick={() => setHint(false)} className="mt-2 text-sky-300 font-medium">
              Got it
            </button>
          </div>
        )}
        <div className="flex items-center gap-2 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-700 pl-2 pr-2 py-2">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-sky-400 to-sky-700 flex items-center justify-center shadow-inner shrink-0">
            <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>
          <div className="min-w-0 pr-1">
            <p className="text-xs font-bold leading-tight">Get the App</p>
            <p className="text-[10px] text-slate-400 leading-tight">Students · Android & mobile</p>
          </div>
          <button
            type="button"
            onClick={install}
            className="shrink-0 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold px-3 py-2"
          >
            Download
          </button>
          <button
            type="button"
            onClick={dismiss}
            className="shrink-0 p-1.5 text-slate-400 hover:text-white"
            aria-label="Dismiss"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default AppDownloadBanner;
