import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';

/**
 * Floating install CTA — always routes to /install so it works even without PWA prompt.
 */
const AppDownloadBanner = () => {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem('r2s_app_banner_dismissed')) setVisible(false);
    if (window.matchMedia('(display-mode: standalone)').matches) setVisible(false);
  }, []);

  if (!mounted || !visible) return null;

  return createPortal(
    <div className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-4 sm:bottom-4 z-[9000] sm:max-w-xs">
      <div className="flex items-center gap-2 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-600 p-2">
        <div className="h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br from-sky-400 to-sky-700 flex items-center justify-center">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>
        </div>
        <div className="min-w-0 flex-1 text-left">
          <p className="text-sm font-bold leading-tight">Install app</p>
          <p className="text-[11px] text-slate-400 leading-tight">Home screen icon</p>
        </div>
        <Link
          to="/install"
          className="shrink-0 h-10 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-bold inline-flex items-center"
        >
          Open
        </Link>
        <button
          type="button"
          onClick={() => {
            setVisible(false);
            sessionStorage.setItem('r2s_app_banner_dismissed', '1');
          }}
          className="shrink-0 h-10 w-10 inline-flex items-center justify-center rounded-xl border border-slate-600 text-white hover:bg-slate-800"
          aria-label="Dismiss"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>,
    document.body
  );
};

export default AppDownloadBanner;
