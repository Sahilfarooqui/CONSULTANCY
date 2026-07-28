import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appConfig from '../config/appConfig';

const Contact = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const formspreeUrl = `https://formspree.io/f/${appConfig.formspreeId}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch(formspreeUrl, {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        navigate('/thank-you?type=contact');
        return;
      }
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || `Send failed (${res.status})`);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Could not send message. Try email or WhatsApp.');
    }
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Contact Runway2Sky</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Job seekers, employers, and partners — message us and we will reply by email / WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white shadow-soft rounded-2xl border border-slate-100 overflow-hidden">
            <div className="p-8 text-left">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Send a message</h2>
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="_subject" value="Runway2Sky contact form" />
                <input type="hidden" name="formType" value="contact" />
                <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
                <div className="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-slate-700">
                      First name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      required
                      className="mt-1 block w-full border border-slate-300 rounded-lg py-2.5 px-3 focus:ring-sky-500 focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-slate-700">
                      Last name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      required
                      className="mt-1 block w-full border border-slate-300 rounded-lg py-2.5 px-3 focus:ring-sky-500 focus:border-sky-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="mt-1 block w-full border border-slate-300 rounded-lg py-2.5 px-3 focus:ring-sky-500 focus:border-sky-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      className="mt-1 block w-full border border-slate-300 rounded-lg py-2.5 px-3 focus:ring-sky-500 focus:border-sky-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-slate-700">
                      I am
                    </label>
                    <select
                      name="inquiryType"
                      id="inquiryType"
                      className="mt-1 block w-full border border-slate-300 rounded-lg py-2.5 px-3 focus:ring-sky-500 focus:border-sky-500"
                    >
                      <option>Job seeker (fresher) — want to apply</option>
                      <option>Job seeker (experienced)</option>
                      <option>Employer / recruiter posting a job</option>
                      <option>Training / courses enquiry</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      required
                      className="mt-1 block w-full border border-slate-300 rounded-lg py-2.5 px-3 focus:ring-sky-500 focus:border-sky-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      required
                      placeholder="Role of interest (e.g. IndiGo cabin crew), city, education..."
                      className="mt-1 block w-full border border-slate-300 rounded-lg py-2.5 px-3 focus:ring-sky-500 focus:border-sky-500"
                    />
                  </div>
                  {status === 'error' && (
                    <div className="sm:col-span-2 rounded-lg bg-rose-50 border border-rose-100 text-rose-800 text-sm p-3">
                      {errorMsg}
                    </div>
                  )}
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg text-base font-semibold text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-60"
                    >
                      {status === 'sending' ? 'Sending…' : 'Send Message'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div>
            <div className="bg-white shadow-soft rounded-2xl border border-slate-100 overflow-hidden mb-6">
              <div className="p-8 text-left">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact information</h2>
                <div className="space-y-5">
                  <div className="flex items-start">
                    <svg className="h-6 w-6 text-sky-600 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <p className="text-slate-900 font-medium">Address</p>
                      {appConfig.contact.address.map((line) => (
                        <p key={line} className="text-slate-600">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="h-6 w-6 text-sky-600 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <div>
                      <p className="text-slate-900 font-medium">Phone</p>
                      <p className="text-slate-600">{appConfig.contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="h-6 w-6 text-sky-600 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <p className="text-slate-900 font-medium">Email</p>
                      <p className="text-slate-600">{appConfig.contact.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-sky-900 to-slate-900 rounded-2xl p-8 text-white text-left">
              <h3 className="text-lg font-bold">Applying for a job?</h3>
              <p className="mt-2 text-sky-100 text-sm leading-relaxed">
                Use <strong>Apply via Runway2Sky</strong> on any job card — we get your full application (name, phone,
                city, CV link) by email.
              </p>
              <a
                href="/jobs"
                className="mt-4 inline-block text-sm font-semibold text-sky-300 hover:text-white"
              >
                Browse jobs →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
