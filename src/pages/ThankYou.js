import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-slate-50 py-16 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-soft border border-slate-100 text-center max-w-md">
        <div className="mx-auto h-14 w-14 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mb-4">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Thank you!</h1>
        <p className="text-slate-600 mb-8">
          Your message has been sent to the Runway2Sky team. We will get back to you shortly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-block bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-700"
          >
            Home
          </Link>
          <Link
            to="/jobs"
            className="inline-block bg-slate-100 text-slate-800 px-6 py-3 rounded-lg font-semibold hover:bg-slate-200"
          >
            Browse Jobs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
