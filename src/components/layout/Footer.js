import React from 'react';
import { Link } from 'react-router-dom';
import appConfig from '../../config/appConfig';

const Footer = () => {
  const { brand, contact, partners } = appConfig;

  return (
    <footer className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
          <div>
            <p className="text-xl font-bold">
              Runway<span className="text-sky-400">2</span>Sky
            </p>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">{brand.shortDescription}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-slate-400 hover:text-white transition-colors">
                  Aviation Jobs
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-slate-400 hover:text-white transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">What We Offer</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Aviation job board</li>
              <li>Fresher placements</li>
              <li>Experienced hiring</li>
              <li>Career consultancy</li>
              <li>
                <a
                  href={partners.courses.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-300 transition-colors"
                >
                  {partners.courses.shortName} training
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {contact.address.map((line) => (
                <li key={line}>{line}</li>
              ))}
              <li className="pt-2">
                <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="hover:text-white">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-white">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-10 pt-8 flex flex-col sm:flex-row justify-between gap-4 text-sm text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <p>
            Training partner:{' '}
            <a
              href={partners.courses.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300"
            >
              {partners.courses.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
