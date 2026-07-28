import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Jobs', path: '/jobs' },
    { name: 'Courses', path: '/courses' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <nav className="relative flex items-center">
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
              isActive(item.path)
                ? 'bg-sky-100 text-sky-800'
                : 'text-slate-700 hover:bg-slate-100 hover:text-sky-700'
            }`}
            aria-current={isActive(item.path) ? 'page' : undefined}
          >
            {item.name}
          </Link>
        ))}
        <Link
          to="/jobs"
          className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold bg-sky-600 text-white hover:bg-sky-700 transition-colors shadow-sm whitespace-nowrap"
        >
          Find Jobs
        </Link>
      </div>

      {/* Mobile hamburger — high contrast so it's always visible */}
      <button
        type="button"
        onClick={() => setIsMenuOpen((o) => !o)}
        className="md:hidden inline-flex items-center justify-center h-11 w-11 rounded-xl border-2 border-sky-600 bg-sky-50 text-sky-800 shadow-sm hover:bg-sky-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-nav-panel"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div
        id="mobile-nav-panel"
        className={`fixed top-0 right-0 z-[70] h-full w-[min(100vw-3rem,20rem)] max-w-full bg-white shadow-2xl transform transition-transform duration-300 ease-out md:hidden flex flex-col ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-4 border-b border-slate-200">
          <span className="font-bold text-lg text-slate-900">
            Runway<span className="text-sky-600">2</span>Sky
          </span>
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-slate-300 bg-slate-50 text-slate-800 hover:bg-slate-100"
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-3 rounded-xl text-base font-medium text-left ${
                isActive(item.path)
                  ? 'bg-sky-100 text-sky-900'
                  : 'text-slate-800 hover:bg-slate-100'
              }`}
              onClick={() => setIsMenuOpen(false)}
              aria-current={isActive(item.path) ? 'page' : undefined}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-slate-200">
          <Link
            to="/jobs"
            className="flex w-full items-center justify-center px-4 py-3.5 rounded-xl text-base font-semibold bg-sky-600 text-white hover:bg-sky-700"
            onClick={() => setIsMenuOpen(false)}
          >
            Find Jobs
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
