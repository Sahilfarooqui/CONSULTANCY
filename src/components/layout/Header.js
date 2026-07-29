import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-[4.25rem]">
          <Link to="/" className="flex items-center gap-2.5 min-w-0 group">
            <img
              src={`${process.env.PUBLIC_URL}/logo192.png`}
              alt="Runway2Sky"
              className="h-9 w-9 shrink-0 rounded-lg object-cover shadow-sm ring-1 ring-slate-200"
              width={36}
              height={36}
            />
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
