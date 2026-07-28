import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';

const MobileQuickBar = () => {
  const { pathname } = useLocation();
  if (typeof document === 'undefined') return null;

  const tab = (to, label, icon, active) => (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center py-2.5 gap-0.5 text-[10px] tracking-wide ${
        active ? 'text-sky-700 font-semibold' : 'text-slate-500 font-medium'
      }`}
    >
      {icon}
      {label}
    </Link>
  );

  const iconClass = 'h-5 w-5';

  return createPortal(
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-[8500] border-t border-slate-200 bg-white safe-bottom shadow-[0_-2px_16px_rgba(15,23,42,0.06)]"
      aria-label="Primary"
    >
      <div className="grid grid-cols-4 max-w-lg mx-auto">
        {tab(
          '/',
          'Home',
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10h14V10" />
          </svg>,
          pathname === '/'
        )}
        {tab(
          '/jobs',
          'Jobs',
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0h2a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h2"
            />
          </svg>,
          pathname === '/jobs' || pathname.startsWith('/apply')
        )}
        {tab(
          '/courses',
          'Courses',
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z"
            />
          </svg>,
          pathname === '/courses'
        )}
        {tab(
          '/app',
          'App',
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>,
          pathname === '/app' || pathname === '/install'
        )}
      </div>
    </nav>,
    document.body
  );
};

export default MobileQuickBar;
