import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import appConfig from '../config/appConfig';
import featuredJobs from '../data/jobs';
import courses, {
  COURSES_PLATFORM,
  getCertificatesForJob,
  getPrimaryCertificate,
} from '../data/courses';

/**
 * Apply via Runway2Sky — requires QATI certificate enrollment commitment.
 */
const Apply = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedCertId, setSelectedCertId] = useState('');
  const [enrolledConfirm, setEnrolledConfirm] = useState(false);
  const [policyConfirm, setPolicyConfirm] = useState(false);

  const jobMeta = useMemo(() => {
    const jobId = params.get('jobId') || '';
    const fromList = featuredJobs.find((j) => j.id === jobId);
    const title = params.get('title') || fromList?.title || '';
    const company = params.get('company') || fromList?.company || '';
    const location = params.get('location') || fromList?.location || '';
    const level = params.get('level') || fromList?.level || 'Fresher';
    const category = params.get('category') || fromList?.category || '';
    const externalUrl = params.get('external') || fromList?.applyUrl || '';
    const job = { id: jobId, title, company, location, level, category, applyUrl: externalUrl };
    return job;
  }, [params]);

  const certs = useMemo(() => getCertificatesForJob(jobMeta), [jobMeta]);
  const primary = useMemo(() => getPrimaryCertificate(jobMeta), [jobMeta]);

  // Default select primary cert when certs load
  const activeCertId = selectedCertId || primary?.id || '';
  const activeCert = courses.find((c) => c.id === activeCertId) || primary;

  const formspreeUrl = `https://formspree.io/f/${appConfig.formspreeId}`;
  const waNumber = (appConfig.contact.whatsapp || '').replace(/\D/g, '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!activeCertId) {
      setErrorMsg('Please select a required QATI certificate for this job.');
      return;
    }
    if (!enrolledConfirm) {
      setErrorMsg(
        'You must confirm that you will enrol / complete the selected QATI certificate on qataradvancedtraininginstitute.store.'
      );
      return;
    }
    if (!policyConfirm) {
      setErrorMsg(
        'You must accept that job applications through Runway2Sky require partner certification.'
      );
      return;
    }

    setStatus('sending');
    const form = e.target;
    const data = new FormData(form);
    data.set('selectedCertificateId', activeCertId);
    data.set('selectedCertificateTitle', activeCert?.title || '');
    data.set('certificatePartner', 'Qatar Advanced Training Institute');
    data.set('certificatePlatform', COURSES_PLATFORM);
    data.set('certificationRequired', 'yes');
    data.set('certificationConfirmed', enrolledConfirm ? 'yes' : 'no');

    try {
      const res = await fetch(formspreeUrl, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        navigate(
          `/thank-you?type=apply&cert=${encodeURIComponent(activeCert?.title || '')}&course=${encodeURIComponent(COURSES_PLATFORM)}`
        );
        return;
      }

      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || `Could not send application (${res.status})`);
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err.message ||
          'Could not send. Check Formspree setup, or WhatsApp us after enrolling on QATI.'
      );
    }
  };

  const waText = encodeURIComponent(
    `Hi Runway2Sky, I want to apply for: ${jobMeta.title || 'Aviation job'} at ${jobMeta.company || 'airline'}. I will complete QATI certificate: ${activeCert?.title || ''}. Name: `
  );

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold tracking-wide uppercase text-sky-600">Apply via Runway2Sky</p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">Application + QATI certificate</h1>
          <p className="mt-3 text-slate-600 max-w-xl mx-auto">
            Every job application requires a relevant certificate from our partner{' '}
            <strong>Qatar Advanced Training Institute</strong>. Courses are available on their Qatar platform
            (online access).
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

        {/* Required certificates */}
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-left">
          <h2 className="text-lg font-bold text-amber-950">Required: partner certificates (Qatar / QATI)</h2>
          <p className="mt-1 text-sm text-amber-900/90">
            Select the certificate that matches this job, then enrol on{' '}
            <a
              href={COURSES_PLATFORM}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-2"
            >
              qataradvancedtraininginstitute.store
            </a>
            . Applications without certification commitment are not accepted.
          </p>
          <div className="mt-4 space-y-3">
            {certs.map((c) => {
              const isPrimary = c.id === primary?.id;
              return (
                <label
                  key={c.id}
                  className={`flex gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                    activeCertId === c.id
                      ? 'border-sky-500 bg-white ring-2 ring-sky-200'
                      : 'border-amber-100 bg-white/70 hover:border-sky-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="certificateChoice"
                    value={c.id}
                    checked={activeCertId === c.id}
                    onChange={() => setSelectedCertId(c.id)}
                    className="mt-1"
                    required
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-slate-900">{c.title}</span>
                      {isPrimary && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                          Recommended for this job
                        </span>
                      )}
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Certificate · Qatar partner
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{c.description}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {c.duration} · {c.mode} · {c.location}
                    </p>
                    <a
                      href={c.url || COURSES_PLATFORM}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex mt-2 text-sm font-semibold text-sky-700 hover:text-sky-900"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Open course on QATI platform →
                    </a>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        <div className="bg-white shadow-soft rounded-2xl border border-slate-100 p-6 sm:p-8 text-left">
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="_subject" value={`Job application + QATI cert: ${jobMeta.title || 'Runway2Sky'}`} />
            <input type="hidden" name="formType" value="job_application" />
            <input type="hidden" name="jobId" value={jobMeta.id || ''} />
            <input type="hidden" name="jobTitle" value={jobMeta.title} />
            <input type="hidden" name="jobCompany" value={jobMeta.company} />
            <input type="hidden" name="jobLocation" value={jobMeta.location} />
            <input type="hidden" name="jobCategory" value={jobMeta.category || ''} />
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
                  className="mt-1 block w-full border border-slate-300 rounded-lg py-2.5 px-3 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="qatiEnrollmentStatus" className="block text-sm font-medium text-slate-700">
                  QATI course status *
                </label>
                <select
                  id="qatiEnrollmentStatus"
                  name="qatiEnrollmentStatus"
                  required
                  className="mt-1 block w-full border border-slate-300 rounded-lg py-2.5 px-3 focus:ring-sky-500 focus:border-sky-500"
                >
                  <option value="">Select</option>
                  <option value="will_enrol_now">I will enrol on QATI now (before / with this application)</option>
                  <option value="already_enrolled">I already enrolled on QATI</option>
                  <option value="completed_certificate">I already completed this certificate</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="qatiProof" className="block text-sm font-medium text-slate-700">
                  Enrolment / certificate proof link (optional)
                </label>
                <input
                  id="qatiProof"
                  name="qatiProof"
                  type="url"
                  placeholder="Receipt, dashboard screenshot link, or certificate URL"
                  className="mt-1 block w-full border border-slate-300 rounded-lg py-2.5 px-3 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="cvLink" className="block text-sm font-medium text-slate-700">
                  CV / Resume link (Google Drive)
                </label>
                <input
                  id="cvLink"
                  name="cvLink"
                  type="url"
                  placeholder="https://drive.google.com/..."
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
                  rows={3}
                  required
                  placeholder="Languages, height (cabin crew), passport, why this role..."
                  className="mt-1 block w-full border border-slate-300 rounded-lg py-2.5 px-3 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>
            </div>

            <div className="mt-6 space-y-3 rounded-xl bg-slate-50 border border-slate-200 p-4">
              <label className="flex gap-3 items-start cursor-pointer text-sm text-slate-800">
                <input
                  type="checkbox"
                  checked={enrolledConfirm}
                  onChange={(e) => setEnrolledConfirm(e.target.checked)}
                  className="mt-1"
                  required
                />
                <span>
                  I understand I must complete / enrol in{' '}
                  <strong>{activeCert?.title || 'the selected QATI certificate'}</strong> on{' '}
                  <a
                    href={COURSES_PLATFORM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-700 font-semibold underline"
                  >
                    Qatar Advanced Training Institute
                  </a>{' '}
                  (Qatar partner platform). *
                </span>
              </label>
              <label className="flex gap-3 items-start cursor-pointer text-sm text-slate-800">
                <input
                  type="checkbox"
                  checked={policyConfirm}
                  onChange={(e) => setPolicyConfirm(e.target.checked)}
                  className="mt-1"
                  required
                />
                <span>
                  I accept that Runway2Sky job applications require partner certification, and my details may be used
                  for placement guidance. *
                </span>
              </label>
            </div>

            {status === 'error' && (
              <div className="mt-4 rounded-lg bg-rose-50 border border-rose-100 text-rose-800 text-sm p-3">
                {errorMsg}
              </div>
            )}
            {errorMsg && status !== 'error' && (
              <div className="mt-4 rounded-lg bg-rose-50 border border-rose-100 text-rose-800 text-sm p-3">
                {errorMsg}
              </div>
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={activeCert?.url || COURSES_PLATFORM}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center px-5 py-3 rounded-lg text-sm font-semibold border-2 border-sky-600 text-sky-800 hover:bg-sky-50"
              >
                1. Enrol on QATI first
              </a>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="flex-1 inline-flex justify-center items-center px-6 py-3 rounded-lg text-base font-semibold text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending…' : '2. Submit application + certificate commitment'}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-sm">
            <p className="text-slate-500">Questions about courses?</p>
            <div className="flex flex-wrap gap-2">
              {waNumber && (
                <a
                  href={`https://wa.me/${waNumber}?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex px-4 py-2 rounded-lg font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  WhatsApp us
                </a>
              )}
              <Link to="/courses" className="inline-flex px-4 py-2 rounded-lg font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50">
                All QATI certificates
              </Link>
            </div>
          </div>
        </div>

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
