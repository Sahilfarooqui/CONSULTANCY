import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import appConfig from '../config/appConfig';
import { COURSES_PLATFORM } from '../data/courses';

const ThankYou = () => {
  const [params] = useSearchParams();
  const isApply = params.get('type') === 'apply';
  const cert = params.get('cert') || '';
  const waNumber = String(appConfig.contact.whatsapp || '').replace(/\D/g, '');

  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-slate-50 py-12 px-4">
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-soft border border-slate-100 text-center max-w-md w-full">
        <div className="mx-auto h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          {isApply ? 'You’re all set' : 'Got it — thanks!'}
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          {isApply
            ? 'We received your application. Here’s what happens next:'
            : 'We’ll get back to you soon by email or WhatsApp.'}
        </p>

        {isApply && (
          <ol className="text-left space-y-4 mb-6">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-800 text-xs font-bold">
                1
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">We review</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Our team checks your details — usually within a day or two.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-800 text-xs font-bold">
                2
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900">Start your course</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {cert ? (
                    <>
                      Begin <strong className="font-medium text-slate-700">{cert}</strong> when you’re ready.
                    </>
                  ) : (
                    'Begin your short training course when you’re ready.'
                  )}
                </p>
                <a
                  href={COURSES_PLATFORM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700"
                >
                  Start your course
                </a>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-800 text-xs font-bold">
                3
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">We may WhatsApp you</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Keep an eye on your phone — we’ll reach out if we need anything.
                </p>
              </div>
            </li>
          </ol>
        )}

        <p className="text-xs text-slate-500 mb-5">
          {appConfig.contact.phone}
          {waNumber ? ' · WhatsApp ready' : ''}
        </p>

        <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
          <Link
            to="/jobs"
            className="inline-block bg-sky-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-sky-700"
          >
            Browse more jobs
          </Link>
          <Link
            to="/"
            className="inline-block bg-slate-100 text-slate-800 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-200"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
