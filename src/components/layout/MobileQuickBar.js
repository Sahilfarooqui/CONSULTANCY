import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import appConfig from '../../config/appConfig';

/**
 * Fixed bottom bar for mobile — fastest path for students.
 */
const MobileQuickBar = () => {
  const { pathname } = useLocation();
  const wa = `https://wa.me/${appConfig.contact.whatsapp}?text=${encodeURIComponent(
    'Hi Runway2Sky, I need help with aviation jobs.'
  )}`;

  if (typeof document === 'undefined') return null;

  const item = (active) =>
    active
      ? 'text-sky-700 font-bold'
      : 'text-slate-600 font-medium hover:text-sky-700';

  return createPortal(
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-[8500] border-t border-slate-200 bg-white/95 backdrop-blur safe-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
      aria-label="Quick actions"
    >
      <div className="grid grid-cols-4 gap-0 max-w-lg mx-auto">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-2.5 text-[11px] ${item(pathname === '/')}`}
        >
          <span className="text-lg leading-none mb-0.5" aria-hidden>
            🏠
          </span>
          Home
        </Link>
        <Link
          to="/jobs"
          className={`flex flex-col items-center justify-center py-2.5 text-[11px] ${item(pathname === '/jobs')}`}
        >
          <span className="text-lg leading-none mb-0.5" aria-hidden>
            ✈️
          </span>
          Jobs
        </Link>
        <Link
          to="/courses"
          className={`flex flex-col items-center justify-center py-2.5 text-[11px] ${item(pathname === '/courses')}`}
        >
          <span className="text-lg leading-none mb-0.5" aria-hidden>
            🎓
          </span>
          Courses
        </Link>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2.5 text-[11px] font-bold text-emerald-700"
        >
          <span className="text-lg leading-none mb-0.5" aria-hidden>
            💬
          </span>
          WhatsApp
        </a>
      </div>
    </nav>,
    document.body
  );
};

export default MobileQuickBar;
