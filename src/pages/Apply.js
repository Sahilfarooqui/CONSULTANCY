import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import appConfig from '../config/appConfig';
import featuredJobs from '../data/jobs';

/**
 * Apply via Runway2Sky — applications email to your Formspree inbox.
 * URL: /apply?jobId=in-001&title=...&company=...
 */
const Apply = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('idle'); // idle | sending | error
  const [errorMsg, setErrorMsg] = useState('');

  const jobMeta = useMemo(() => {
    const jobId = params.get('jobId') || '';
    const fromList = featuredJobs.find((j) => j.id === jobId);
    return {
      jobId: jobId || fromList?.id || '',
      title: params.get('title') || fromList?.title || '',
      company: params.get('company') || fromList?.company || '',
      location: params.get('location') || fromList?.location || '',
      level: params.get('level') || fromList?.level || 'Fresher',
      externalUrl: params.get('external') || fromList?.applyUrl || '',
    };
  }, [params]);

  const formspreeUrl = `https://formspree.io/f/${appConfig.formspreeId}`;
  const waNumber = (appConfig.contact.whatsapp || '').replace(/\D/g, '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch(formspreeUrl, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        navigate('/thank-you?type=apply');
        return;
      }

      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || `Could not send application (${res.status})`);
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err.message ||
          'Could not send. Check your Formspree form ID, or WhatsApp us your details instead.'
      );
    }
  };

  const waText = encodeURIComponent(
    `Hi Runway2Sky, I want to apply for: ${jobMeta.title || 'Aviation job'} at ${jobMeta.company || 'airline'}. Name: `
  );

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold tracking-wide uppercase text-sky-600">Apply via Runway2Sky</p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">Submit your application</h1>
          <p className="mt-3 text-slate-600 max-w-xl mx-auto">
            Fill this form and our team will receive your details by email. We guide freshers for Indian domestic
            airlines (IndiGo, SpiceJet, Air India, Akasa) and airport roles.
          </p>
        </div>

        {(jobMeta.title || jobMeta.company) && (
          <div className="mb-6 rounded-2xl border border-sky-100 bg-sky-50 p-5 text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Applying for</p>
            <p className="mt-1 text-lg font-bold text-slate-900">{jobMeta.title || 'Aviation role'}</p>
            <p className="text-slate-600">
              {jobMeta.company}
              {jobMeta.location ? ` · ${jobMeta.location}` : ''}
              {jobMeta.level ? ` · ${jobMeta.level}` : ''}
            </p>
          </div>
        )}

        <div className="bg-white shadow-soft rounded-2xl border border-slate-100 p-6 sm:p-8 text-left">
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="_subject" value={`Job application: ${jobMeta.title || 'Runway2Sky'}`} />
            <input type="hidden" name="formType" value="job_application" />
            <input type="hidden" name="jobId" value={jobMeta.jobId} />
            <input type="hidden" name="jobTitle" value={jobMeta.title} />
            <input type="hidden" name="jobCompany" value={jobMeta.company} />
            <input type="hidden" name="jobLocation" value={jobMeta.location} />
            <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">
                  Full name *
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  className="mt-1 block w-full border border-slate-300 rounded-lg py-2.5 px-3 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                  Phone / WhatsApp *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91 ..."
                  className="mt-1 block w-full border border-slate-300 rounded-lg py-2.5 px-3 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 block w-full border border-slate-300 rounded-lg py-2.5 px-3 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-slate-700">
                  Current city *
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  placeholder="Delhi, Mumbai, ..."
                  className="mt-1 block w-full border border-slate-300 rounded-lg py-2.5 px-3 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-slate-700">
                  Experience *
                </label>
                <select
                  id="experience"
                  name="experience"
                  required
                  defaultValue="Fresher (0 years)"
                  className="mt-1 block w-full border border-slate-300 rounded-lg py-2.5 px-3 focus:ring-sky-500 focus:border-sky-500"
                >
                  <option>Fresher (0 years)</option>
                  <option>Less than 1 year</option>
                  <option>1–2 years</option>
                  <option>3+ years</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="education" className="block text-sm font-medium text-slate-700">
                  Education *
                </label>
                <select
                  id="education"
                  name="education"
                  required
                  className="mt-1 block w-full border border-slate-300 rounded-lg py-2.5 px-3 focus:ring-sky-500 focus:border-sky-500"
                >
                  <option value="">Select</option>
                  <option>10+2 / Intermediate</option>
                  <option>Diploma</option>
                  <option>Graduate</option>
                  <option>Postgraduate</option>
                  <option>AME / Aviation diploma</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="preferredRole" className="block text-sm font-medium text-slate-700">
                  Preferred role
                </label>
                <input
                  id="preferredRole"
                  name="preferredRole"
                  type="text"
                  defaultValue={jobMeta.title || ''}
                  placeholder="Cabin crew, ground staff, ..."
                  className="mt-1 block w-full border border-slate-300 rounded-lg py-2.5 px-3 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="cvLink" className="block text-sm font-medium text-slate-700">
                  CV / Resume link (Google Drive / Dropbox)
                </label>
                <input
                  id="cvLink"
                  name="cvLink"
                  type="url"
                  placeholder="https://drive.google.com/..."
                  className="mt-1 block w-full border border-slate-300 rounded-lg py-2.5 px-3 focus:ring-sky-500 focus:border-sky-500"
                />
                <p className="mt-1 text-xs text-slate-500">
                  Make the link “Anyone with link can view”. Or WhatsApp your CV after submitting.
                </p>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                  Message / why you want this role *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell us about yourself, height (for cabin crew), languages, passport, etc."
                  className="mt-1 block w-full border border-slate-300 rounded-lg py-2.5 px-3 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>
            </div>

            {status === 'error' && (
              <div className="mt-4 rounded-lg bg-rose-50 border border-rose-100 text-rose-800 text-sm p-3">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-6 w-full inline-flex justify-center items-center px-6 py-3 rounded-lg text-base font-semibold text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending application…' : 'Submit application to Runway2Sky'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-sm">
            <p className="text-slate-500">Prefer WhatsApp?</p>
            <div className="flex flex-wrap gap-2">
              {waNumber && (
                <a
                  href={`https://wa.me/${waNumber}?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex px-4 py-2 rounded-lg font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  WhatsApp apply
                </a>
              )}
              <a
                href={`mailto:${appConfig.contact.email}?subject=${encodeURIComponent(
                  `Application: ${jobMeta.title || 'Aviation job'}`
                )}`}
                className="inline-flex px-4 py-2 rounded-lg font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Email {appConfig.contact.email}
              </a>
            </div>
          </div>
        </div>

        {jobMeta.externalUrl && !jobMeta.externalUrl.startsWith('/') && (
          <p className="mt-6 text-center text-sm text-slate-500">
            You can also apply on the official page:{' '}
            <a
              href={jobMeta.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-700 font-medium underline underline-offset-2"
            >
              Open company careers
            </a>
          </p>
        )}

        <p className="mt-4 text-center">
          <Link to="/jobs" className="text-sky-700 font-medium hover:underline">
            ← Back to jobs
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Apply;
