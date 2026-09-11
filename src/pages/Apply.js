import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import appConfig from '../config/appConfig';
import featuredJobs from '../data/jobs';
import courses, {
  COURSES_PLATFORM,
  getCertificatesForJob,
  getPrimaryCertificate,
} from '../data/courses';
import CompanyLogo from '../components/jobs/CompanyLogo';
import { getCompanyBrand } from '../utils/companyBranding';
import { safeHttpUrl, sanitizeSearchQuery } from '../utils/safeUrl';

const STEPS = [
  { id: 1, label: 'Your details' },
  { id: 2, label: 'Pick a course' },
  { id: 3, label: 'Send' },
];

/**
 * Apply via Runway2Sky — simple 3-step flow with QATI course commitment.
 */
const Apply = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedCertId, setSelectedCertId] = useState('');
  const [enrolledConfirm, setEnrolledConfirm] = useState(false);
  const [formValues, setFormValues] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
  });

  const jobMeta = useMemo(() => {
    const jobId = sanitizeSearchQuery(params.get('jobId') || '', { maxLength: 80 });
    const fromList = featuredJobs.find((j) => j.id === jobId);
    const title = sanitizeSearchQuery(params.get('title') || fromList?.title || '', { maxLength: 200 });
    const company = sanitizeSearchQuery(params.get('company') || fromList?.company || '', { maxLength: 120 });
    const location = sanitizeSearchQuery(params.get('location') || fromList?.location || '', { maxLength: 120 });
    const level = sanitizeSearchQuery(params.get('level') || fromList?.level || 'Fresher', { maxLength: 60 });
    const category = sanitizeSearchQuery(params.get('category') || fromList?.category || '', { maxLength: 80 });
    // Never trust query-string redirects — http(s) only
    const externalUrl =
      safeHttpUrl(params.get('external')) || safeHttpUrl(fromList?.applyUrl) || '';
    return { id: jobId, title, company, location, level, category, applyUrl: externalUrl };
  }, [params]);

  const certs = useMemo(() => getCertificatesForJob(jobMeta), [jobMeta]);
  const primary = useMemo(() => getPrimaryCertificate(jobMeta), [jobMeta]);

  const activeCertId = selectedCertId || primary?.id || '';
  const activeCert = courses.find((c) => c.id === activeCertId) || primary;

  const formspreeUrl = `https://formspree.io/f/${appConfig.formspreeId}`;
  const waNumber = String(appConfig.contact.whatsapp || '').replace(/\D/g, '');

  const updateField = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep1 = () => {
    if (!formValues.fullName.trim()) return 'Please enter your full name.';
    if (!formValues.phone.trim()) return 'Please enter your phone number.';
    if (!formValues.email.trim()) return 'Please enter your email.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email.trim())) {
      return 'That email looks off — please check it.';
    }
    if (!formValues.city.trim()) return 'Please enter your city.';
    return '';
  };

  const goNext = () => {
    setErrorMsg('');
    if (step === 1) {
      const err = validateStep1();
      if (err) {
        setErrorMsg(err);
        return;
      }
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!activeCertId) {
        setErrorMsg('Please pick a short training course.');
        return;
      }
      setStep(3);
    }
  };

  const goBack = () => {
    setErrorMsg('');
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const step1Err = validateStep1();
    if (step1Err) {
      setStep(1);
      setErrorMsg(step1Err);
      return;
    }
    if (!activeCertId) {
      setStep(2);
      setErrorMsg('Please pick a short training course.');
      return;
    }
    if (!enrolledConfirm) {
      setErrorMsg('Please confirm you’ll start or complete the course.');
      return;
    }

    setStatus('sending');
    const form = e.target;
    const data = new FormData(form);
    data.set('fullName', formValues.fullName.trim());
    data.set('phone', formValues.phone.trim());
    data.set('email', formValues.email.trim());
    data.set('city', formValues.city.trim());
    data.set('selectedCertificateId', activeCertId);
    data.set('selectedCertificateTitle', activeCert?.title || '');
    data.set('certificatePartner', 'Qatar Advanced Training Institute');
    data.set('certificatePlatform', COURSES_PLATFORM);
    data.set('certificationRequired', 'yes');
    data.set('certificationConfirmed', enrolledConfirm ? 'yes' : 'no');
    data.set('qatiEnrollmentStatus', 'will_enrol_now');

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
      throw new Error(body.error || 'Something went wrong. Please try again.');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Couldn’t send. Try again or message us on WhatsApp.');
    }
  };

  const waText = encodeURIComponent(
    `Hi Runway2Sky, I want to apply for: ${jobMeta.title || 'Aviation job'} at ${jobMeta.company || 'airline'}. Course: ${activeCert?.title || ''}. Name: `
  );

  const inputClass =
    'mt-1 block w-full border border-slate-300 rounded-lg py-2.5 px-3 text-sm focus:ring-sky-500 focus:border-sky-500';

  return (
    <div className="py-8 sm:py-10 bg-slate-50 min-h-screen">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Apply for this job</h1>
          <p className="mt-1.5 text-sm text-slate-600">Takes about 2 minutes. We’ll guide you.</p>
        </div>

        {(jobMeta.title || jobMeta.company) && (
          <div className="mb-5 rounded-xl border border-sky-100 bg-white p-4 text-left shadow-sm">
            <div className="flex gap-3 items-start">
              <CompanyLogo company={jobMeta.company} size={48} />
              <div className="min-w-0">
                <p className="text-base font-bold text-slate-900 leading-snug">
                  {jobMeta.title || 'Aviation role'}
                </p>
                <p className="text-sm font-semibold mt-0.5" style={{ color: getCompanyBrand(jobMeta.company).color }}>
                  {getCompanyBrand(jobMeta.company).name}
                </p>
                <p className="text-sm text-slate-600 mt-0.5">{jobMeta.location}</p>
              </div>
            </div>
          </div>
        )}

        {/* Progress steps */}
        <div className="mb-5 flex items-center gap-1" role="tablist" aria-label="Application steps">
          {STEPS.map((s, i) => {
            const done = step > s.id;
            const current = step === s.id;
            return (
              <React.Fragment key={s.id}>
                {i > 0 && <div className={`h-0.5 flex-1 ${done || current ? 'bg-sky-400' : 'bg-slate-200'}`} />}
                <button
                  type="button"
                  role="tab"
                  aria-selected={current}
                  onClick={() => {
                    if (s.id < step) {
                      setErrorMsg('');
                      setStep(s.id);
                    }
                  }}
                  className={`flex items-center gap-1.5 shrink-0 rounded-full px-2.5 py-1.5 text-xs font-semibold transition ${
                    current
                      ? 'bg-sky-600 text-white'
                      : done
                        ? 'bg-sky-100 text-sky-800'
                        : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <span
                    className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                      current ? 'bg-white/20' : done ? 'bg-sky-200' : 'bg-slate-200'
                    }`}
                  >
                    {done ? '✓' : s.id}
                  </span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              </React.Fragment>
            );
          })}
        </div>

        <div className="bg-white shadow-soft rounded-2xl border border-slate-100 p-5 sm:p-6 text-left">
          <form onSubmit={handleSubmit}>
            <input
              type="hidden"
              name="_subject"
              value={`Job application: ${jobMeta.title || 'Runway2Sky'}`}
            />
            <input type="hidden" name="formType" value="job_application" />
            <input type="hidden" name="jobId" value={jobMeta.id || ''} />
            <input type="hidden" name="jobTitle" value={jobMeta.title} />
            <input type="hidden" name="jobCompany" value={jobMeta.company} />
            <input type="hidden" name="jobLocation" value={jobMeta.location} />
            <input type="hidden" name="jobCategory" value={jobMeta.category || ''} />
            <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

            {/* Step 1 — Your details */}
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-sm font-semibold text-slate-800">1. Your details</p>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">
                    Full name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formValues.fullName}
                    onChange={updateField}
                    placeholder="Your full name"
                    className={inputClass}
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                    Phone / WhatsApp
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formValues.phone}
                    onChange={updateField}
                    placeholder="+91 98765 43210"
                    className={inputClass}
                    autoComplete="tel"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formValues.email}
                    onChange={updateField}
                    placeholder="you@example.com"
                    className={inputClass}
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-slate-700">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    value={formValues.city}
                    onChange={updateField}
                    placeholder="Delhi, Mumbai, Bangalore…"
                    className={inputClass}
                    autoComplete="address-level2"
                  />
                </div>
              </div>
            )}

            {/* Step 2 — Pick a course */}
            {step === 2 && (
              <div>
                <p className="text-sm font-semibold text-slate-800">2. Pick a course</p>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                  To apply through us, choose one short training course (helps your profile).
                </p>
                <div className="mt-4 space-y-2.5">
                  {certs.map((c) => {
                    const isPrimary = c.id === primary?.id;
                    const selected = activeCertId === c.id;
                    return (
                      <label
                        key={c.id}
                        className={`flex gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                          selected
                            ? 'border-sky-500 bg-sky-50/60 ring-2 ring-sky-200'
                            : 'border-slate-200 bg-white hover:border-sky-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="certificateChoice"
                          value={c.id}
                          checked={selected}
                          onChange={() => setSelectedCertId(c.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-semibold text-slate-900">{c.title}</span>
                            {isPrimary && (
                              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-sky-100 text-sky-800">
                                Suggested
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {c.duration} · Online
                          </p>
                          <a
                            href={safeHttpUrl(c.url) || COURSES_PLATFORM}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex mt-1.5 text-xs font-semibold text-sky-700 hover:text-sky-900"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Open course →
                          </a>
                        </div>
                      </label>
                    );
                  })}
                </div>
                <p className="mt-3 text-xs text-slate-500 leading-relaxed">
                  Courses are from our training partner (QATI). Short and beginner-friendly — nothing scary.
                </p>
              </div>
            )}

            {/* Step 3 — Send */}
            {step === 3 && (
              <div>
                <p className="text-sm font-semibold text-slate-800">3. Send application</p>
                <div className="mt-3 rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-sm text-slate-700 space-y-1">
                  <p>
                    <span className="text-slate-500">Name:</span> {formValues.fullName}
                  </p>
                  <p>
                    <span className="text-slate-500">Phone:</span> {formValues.phone}
                  </p>
                  <p>
                    <span className="text-slate-500">Email:</span> {formValues.email}
                  </p>
                  <p>
                    <span className="text-slate-500">City:</span> {formValues.city}
                  </p>
                  <p>
                    <span className="text-slate-500">Course:</span> {activeCert?.title || '—'}
                  </p>
                </div>

                <label className="mt-4 flex gap-3 items-start cursor-pointer text-sm text-slate-800">
                  <input
                    type="checkbox"
                    checked={enrolledConfirm}
                    onChange={(e) => setEnrolledConfirm(e.target.checked)}
                    className="mt-0.5"
                    required
                  />
                  <span>I will start/complete this course on the QATI website.</span>
                </label>
              </div>
            )}

            {errorMsg && (
              <div className="mt-4 rounded-lg bg-rose-50 border border-rose-100 text-rose-800 text-sm p-3">
                {errorMsg}
              </div>
            )}

            <div className="mt-6 flex flex-col-reverse sm:flex-row gap-2.5">
              {step > 1 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex justify-center items-center px-4 py-2.5 rounded-lg text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="flex-1 inline-flex justify-center items-center px-5 py-3 rounded-lg text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex-1 inline-flex justify-center items-center px-5 py-3.5 rounded-lg text-base font-bold text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-60 shadow-sm"
                >
                  {status === 'sending' ? 'Sending…' : 'Submit application'}
                </button>
              )}
            </div>
          </form>

          {waNumber && (
            <div className="mt-5 pt-4 border-t border-slate-100 text-center">
              <a
                href={`https://wa.me/${waNumber}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-emerald-700 hover:text-emerald-800 hover:underline"
              >
                Prefer WhatsApp? Message us
              </a>
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-sm">
          <Link to="/jobs" className="text-sky-700 font-medium hover:underline">
            ← Back to jobs
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Apply;
