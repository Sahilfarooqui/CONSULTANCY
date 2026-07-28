import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Header = () => {
  return (
    <header className="bg-white/95 backdrop-blur sticky top-0 z-50 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 min-h-[4rem] py-2">
          <Link to="/" className="flex items-center gap-2.5 min-w-0 shrink group">
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 to-slate-900 text-white shadow-md">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            </span>
            <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900 truncate">
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
