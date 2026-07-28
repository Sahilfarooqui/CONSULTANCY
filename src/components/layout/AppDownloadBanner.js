import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import appConfig from '../../config/appConfig';

/**
 * Floating WhatsApp + install help — always works (no fake download).
 */
const AppDownloadBanner = () => {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem('r2s_app_banner_dismissed')) setVisible(false);
  }, []);

  if (!mounted || !visible) return null;

  const waLink = `https://wa.me/${appConfig.contact.whatsapp}?text=${encodeURIComponent(
    'Hi Runway2Sky, I want job updates / app help on my phone.'
  )}`;

  return createPortal(
    <div className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-4 sm:bottom-4 z-[9000] sm:max-w-[18rem]">
      <div className="flex items-center gap-2 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-600 p-2">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 min-w-0 items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3 py-2.5"
        >
          <span className="text-lg leading-none" aria-hidden>
            💬
          </span>
          <span className="text-left min-w-0">
            <span className="block text-sm font-bold leading-tight">WhatsApp</span>
            <span className="block text-[11px] text-emerald-100 leading-tight truncate">
              {appConfig.contact.phone}
            </span>
          </span>
        </a>
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
