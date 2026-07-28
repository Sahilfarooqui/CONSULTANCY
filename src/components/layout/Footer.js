import React from 'react';
import { Link } from 'react-router-dom';
import appConfig from '../../config/appConfig';

const Footer = () => {
  const { brand, contact, partners } = appConfig;
  const wa = `https://wa.me/${contact.whatsapp}`;

  return (
    <footer className="bg-slate-950 text-white pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          <div>
            <p className="text-xl font-bold">
              Runway<span className="text-sky-400">2</span>Sky
            </p>
            <p className="mt-2 text-slate-400 text-sm leading-relaxed">
              Aviation jobs for freshers — India airlines + QATI training support.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-3">Quick links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/jobs" className="text-slate-400 hover:text-white">
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-slate-400 hover:text-white">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <a href={partners.courses.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">
                  QATI platform
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-3">Talk to us</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href={`tel:${contact.phoneTel}`} className="hover:text-white">
                  📞 {contact.phone}
                </a>
              </li>
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  💬 WhatsApp {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-white break-all">
                  ✉️ {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {brand.name}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
