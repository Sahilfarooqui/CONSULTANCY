import React from 'react';
import { Link } from 'react-router-dom';
import appConfig from '../config/appConfig';

/**
 * App install help — PWA install is browser-controlled; we give clear WhatsApp + steps.
 */
const Install = () => {
  const wa = appConfig.contact.whatsapp;
  const waLink = `https://wa.me/${wa}?text=${encodeURIComponent(
    'Hi Runway2Sky, please help me install the app / get job updates on my phone.'
  )}`;

  return (
    <div className="min-h-[70vh] bg-slate-50 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto h-20 w-20 rounded-3xl bg-gradient-to-br from-sky-500 to-sky-800 flex items-center justify-center shadow-xl text-white">
            <svg className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>
          <h1 className="mt-5 text-3xl font-extrabold text-slate-900">Get Runway2Sky on your phone</h1>
          <p className="mt-2 text-slate-600">
            Browsers block automatic app downloads. Use WhatsApp or add the site to your home screen (free).
          </p>
        </div>

        <div className="space-y-3">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-lg font-bold shadow-lg"
          >
            WhatsApp us — {appConfig.contact.phone}
          </a>

          <a
            href={`tel:${appConfig.contact.phoneTel || appConfig.contact.phone}`}
            className="w-full flex items-center justify-center h-12 rounded-xl border-2 border-slate-300 bg-white font-semibold text-slate-800"
          >
            Call {appConfig.contact.phone}
          </a>

          <a
            href={`mailto:${appConfig.contact.email}`}
            className="w-full flex items-center justify-center h-12 rounded-xl border-2 border-slate-300 bg-white font-semibold text-slate-800 break-all px-3"
          >
            {appConfig.contact.email}
          </a>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm">
          <h2 className="font-bold text-slate-900 text-lg">Add icon on Android (Chrome)</h2>
          <ol className="mt-3 space-y-2 text-sm text-slate-700 list-decimal list-inside">
            <li>Open this website in Chrome on your phone</li>
            <li>Tap menu ⋮ (top right)</li>
            <li>Tap <strong>Add to Home screen</strong> or <strong>Install app</strong></li>
            <li>Tap Add / Install</li>
          </ol>
          <h2 className="mt-5 font-bold text-slate-900 text-lg">iPhone (Safari)</h2>
          <ol className="mt-2 space-y-2 text-sm text-slate-700 list-decimal list-inside">
            <li>Tap Share</li>
            <li>Tap Add to Home Screen</li>
            <li>Tap Add</li>
          </ol>
        </div>

        <Link
          to="/jobs"
          className="mt-6 flex w-full h-12 items-center justify-center rounded-xl bg-sky-600 text-white font-semibold hover:bg-sky-700"
        >
          Continue to jobs
        </Link>
      </div>
    </div>
  );
};

export default Install;
