import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Jobs', path: '/jobs' },
  { name: 'Courses', path: '/courses' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const mobileMenu =
    mounted &&
    createPortal(
      <>
        {/* Overlay — portaled to body so it is never clipped by header */}
        <div
          className={`fixed inset-0 z-[9998] bg-black/50 transition-opacity duration-200 md:hidden ${
            isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden={!isMenuOpen}
        />

        {/* Full-screen sheet with ALL links clearly visible */}
        <div
          id="mobile-nav-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
          className={`fixed inset-y-0 right-0 z-[9999] flex w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-4">
            <span className="text-lg font-bold text-slate-900">
              Runway<span className="text-sky-600">2</span>Sky
            </span>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border-2 border-slate-800 bg-slate-900 text-white"
              aria-label="Close menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto bg-white px-3 py-3">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex w-full items-center rounded-xl px-4 py-4 text-left text-base font-semibold ${
                      isActive(item.path)
                        ? 'bg-sky-600 text-white'
                        : 'bg-slate-50 text-slate-900 hover:bg-sky-50 border border-slate-200'
                    }`}
                    aria-current={isActive(item.path) ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-slate-200 bg-white p-4 space-y-2">
            <Link
              to="/jobs"
              onClick={() => setIsMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-xl bg-sky-600 px-4 py-4 text-base font-bold text-white hover:bg-sky-700"
            >
              Find Jobs
            </Link>
            <Link
              to="/install"
              onClick={() => setIsMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-xl border-2 border-emerald-600 bg-emerald-50 px-4 py-3 text-base font-bold text-emerald-800"
            >
              Install App
            </Link>
          </div>
        </div>
      </>,
      document.body
    );

  return (
    <div className="flex items-center">
      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
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
          className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold bg-sky-600 text-white hover:bg-sky-700 shadow-sm whitespace-nowrap"
        >
          Find Jobs
        </Link>
      </div>

      {/* Mobile toggle — always high contrast */}
      <button
        type="button"
        onClick={() => setIsMenuOpen((o) => !o)}
        className="md:hidden inline-flex h-12 w-12 items-center justify-center rounded-xl border-2 border-slate-900 bg-slate-900 text-white shadow-md active:scale-95"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-nav-panel"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {mobileMenu}
    </div>
  );
};

export default Navbar;
