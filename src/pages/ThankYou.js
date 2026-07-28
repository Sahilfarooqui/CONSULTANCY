import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import appConfig from '../config/appConfig';
import { COURSES_PLATFORM } from '../data/courses';

const ThankYou = () => {
  const [params] = useSearchParams();
  const isApply = params.get('type') === 'apply';
  const cert = params.get('cert') || '';

  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-slate-50 py-16 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-soft border border-slate-100 text-center max-w-lg">
        <div className="mx-auto h-14 w-14 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mb-4">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          {isApply ? 'Application received!' : 'Thank you!'}
        </h1>
        <p className="text-slate-600 mb-4">
          {isApply
            ? 'Your application and QATI certificate commitment were sent to Runway2Sky. We will contact you after reviewing your details and enrolment status.'
            : 'Your message has been sent. We will get back to you shortly.'}
        </p>
        {isApply && cert && (
          <p className="text-sm text-amber-900 bg-amber-50 border border-amber-100 rounded-lg px-4 py-3 mb-4">
            Remember to complete: <strong>{cert}</strong> on the Qatar partner platform.
          </p>
        )}
        {isApply && (
          <a
            href={COURSES_PLATFORM}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-6 text-sky-700 font-semibold hover:underline"
          >
            Continue to QATI courses →
          </a>
        )}
        <p className="text-sm text-slate-500 mb-8">
          {appConfig.contact.phone} · {appConfig.contact.email}
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
            More jobs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
