import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import appConfig from '../config/appConfig';

const Contact = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const formspreeUrl = `https://formspree.io/f/${appConfig.formspreeId}`;
  const waNumber = String(appConfig.contact.whatsapp || '').replace(/\D/g, '');

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
      throw new Error(body.error || 'Couldn’t send. Try WhatsApp instead.');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Couldn’t send. Try WhatsApp instead.');
    }
  };

  const inputClass =
    'mt-1 block w-full border border-slate-300 rounded-lg py-2.5 px-3 text-sm focus:ring-sky-500 focus:border-sky-500';

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Contact us</h1>
          <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
            Questions about jobs or applying? Send a message — or WhatsApp us for a faster reply.
          </p>
        </div>

        {waNumber && (
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-6 flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-3.5 shadow-sm"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp — fastest reply
          </a>
        )}

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-3 bg-white shadow-soft rounded-2xl border border-slate-100 p-5 sm:p-6 text-left">
            <h2 className="text-base font-bold text-slate-900 mb-4">Send a message</h2>
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="_subject" value="Runway2Sky contact form" />
              <input type="hidden" name="formType" value="contact" />
              <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-slate-700">
                      First name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      required
                      placeholder="Your first name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-slate-700">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      required
                      placeholder="Your last name"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="+91 …"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                    How can we help?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="3"
                    required
                    placeholder="e.g. Cabin crew at IndiGo, based in Delhi…"
                    className={inputClass}
                  />
                </div>
                {status === 'error' && (
                  <div className="rounded-lg bg-rose-50 border border-rose-100 text-rose-800 text-sm p-3">
                    {errorMsg}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full inline-flex items-center justify-center px-5 py-3 rounded-lg text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>
              </div>
            </form>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="bg-white shadow-soft rounded-2xl border border-slate-100 p-5 text-left text-sm">
              <p className="font-semibold text-slate-900 mb-3">Reach us</p>
              <div className="space-y-3 text-slate-600">
                <p>
                  <a
                    href={`tel:${appConfig.contact.phoneTel || appConfig.contact.phone}`}
                    className="text-sky-700 font-medium hover:underline"
                  >
                    {appConfig.contact.phone}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${appConfig.contact.email}`}
                    className="text-sky-700 font-medium hover:underline break-all"
                  >
                    {appConfig.contact.email}
                  </a>
                </p>
                {appConfig.contact.address?.length > 0 && (
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {appConfig.contact.address.join(', ')}
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-2xl bg-sky-900 p-5 text-left text-white">
              <p className="text-sm font-semibold">Looking for a job?</p>
              <p className="mt-1.5 text-xs text-sky-100 leading-relaxed">
                Browse openings and apply in about 2 minutes — we’ll guide you.
              </p>
              <Link to="/jobs" className="mt-3 inline-block text-sm font-semibold text-sky-300 hover:text-white">
                Browse jobs →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
