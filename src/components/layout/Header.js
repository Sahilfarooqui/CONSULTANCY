import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-[4.25rem]">
          <Link to="/" className="flex items-center gap-2.5 min-w-0 group">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0a1628] text-white">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            </span>
            <span className="font-semibold text-lg tracking-tight text-slate-900 truncate">
              Runway<span className="text-sky-600">2</span>Sky
            </span>
          </Link>
          <Navbar />
        </div>
      </div>
    </header>
  );
};

export default Header;
