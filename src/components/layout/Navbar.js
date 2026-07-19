import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';

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

  return (
    <nav className="relative">
      <div className="hidden md:flex items-center space-x-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
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
          className="ml-3 px-4 py-2 rounded-lg text-sm font-semibold bg-sky-600 text-white hover:bg-sky-700 transition-colors shadow-sm"
        >
          Find Jobs
        </Link>
      </div>

      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="inline-flex items-center justify-center p-2 rounded-lg text-slate-700 hover:text-sky-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-slate-900/50 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />
      <div
        className={`fixed inset-y-0 right-0 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-100">
          <span className="font-bold text-slate-900">
            Runway<span className="text-sky-600">2</span>Sky
          </span>
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="p-2 text-slate-600 hover:text-sky-700 rounded-lg"
          >
            <span className="sr-only">Close menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-3 pt-3 pb-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                isActive(item.path)
                  ? 'bg-sky-100 text-sky-800'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-sky-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
              aria-current={isActive(item.path) ? 'page' : undefined}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/jobs"
            className="block w-full mt-3 px-3 py-2.5 rounded-lg text-base font-semibold bg-sky-600 text-white hover:bg-sky-700 text-center"
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
