import React from 'react';
import { Link } from 'react-router-dom';
import appConfig from '../../config/appConfig';

const AppPromo = () => {
  const waLink = `https://wa.me/${appConfig.contact.whatsapp}?text=${encodeURIComponent(
    'Hi Runway2Sky, send me job updates on WhatsApp.'
  )}`;

  return (
    <section className="py-12 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-600 via-sky-700 to-slate-900 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center p-6 sm:p-10">
            <div className="text-left">
              <p className="text-emerald-200 text-sm font-semibold uppercase tracking-wide">Stay connected</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold leading-tight">
                WhatsApp us for jobs &amp; phone help
              </h2>
              <p className="mt-3 text-sky-100 leading-relaxed text-sm sm:text-base">
                Automatic app stores are blocked by browsers. Message us on WhatsApp for job alerts, or add this site
                to your home screen in 30 seconds.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-white text-emerald-800 hover:bg-emerald-50 shadow-lg"
                >
                  WhatsApp {appConfig.contact.phone}
                </a>
                <Link
                  to="/install"
                  className="inline-flex justify-center items-center px-6 py-3.5 rounded-xl font-semibold border-2 border-white/40 text-white hover:bg-white/10"
                >
                  Home screen steps
                </Link>
              </div>
              <p className="mt-3 text-xs text-sky-200/90">
                Call: {appConfig.contact.phone} · Mail: {appConfig.contact.email}
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-xs rounded-2xl bg-white/10 border border-white/20 p-5 text-left">
                <p className="font-bold text-white">Quick links</p>
                <ul className="mt-3 space-y-2 text-sm text-sky-50">
                  <li>
                    <a href={`tel:${appConfig.contact.phoneTel}`} className="hover:underline">
                      📞 {appConfig.contact.phone}
                    </a>
                  </li>
                  <li>
                    <a href={waLink} className="hover:underline" target="_blank" rel="noopener noreferrer">
                      💬 WhatsApp same number
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${appConfig.contact.email}`} className="hover:underline break-all">
                      ✉️ {appConfig.contact.email}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPromo;
