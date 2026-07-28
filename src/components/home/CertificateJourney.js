import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { COURSES_PLATFORM } from '../../data/courses';

const STEPS = [
  {
    id: 1,
    title: 'Apply for a job',
    desc: 'Choose IndiGo, SpiceJet, Air India, Akasa or any role on Runway2Sky.',
    icon: '✈️',
    color: 'from-sky-500 to-sky-700',
  },
  {
    id: 2,
    title: 'No certificate?',
    desc: 'If you don’t have the required cert yet, we guide you to our partner.',
    icon: '📋',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 3,
    title: 'Purchase the course',
    desc: 'Enrol on Qatar Advanced Training Institute (QATI) — courses available online.',
    icon: '🛒',
    color: 'from-violet-500 to-purple-700',
  },
  {
    id: 4,
    title: 'Take the assessment',
    desc: 'Complete modules and pass the assessment on the QATI platform.',
    icon: '📝',
    color: 'from-indigo-500 to-blue-700',
  },
  {
    id: 5,
    title: 'Get your certificate',
    desc: 'Download your QATI certificate and finish your Runway2Sky application.',
    icon: '🎓',
    color: 'from-emerald-500 to-teal-700',
  },
];

const CertificateJourney = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % STEPS.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-14 sm:py-16 bg-gradient-to-b from-slate-900 via-sky-950 to-slate-900 text-white overflow-hidden relative">
      <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-sky-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-sky-300 text-sm font-semibold uppercase tracking-wide">How it works</p>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight px-1">
            Apply → Certificate path → Ready to fly
          </h2>
          <p className="mt-3 text-sky-100/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Applying without a certificate? Get the right course from our Qatar partner, pass the assessment, earn
            the certificate, then complete your application.
          </p>
        </div>

        {/* Desktop steps */}
        <div className="hidden lg:block relative mb-10">
          <div className="absolute top-[3.25rem] left-[10%] right-[10%] h-1.5 bg-white/10 rounded-full overflow-hidden z-0">
            <div
              className="h-full bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-400 transition-all duration-700 ease-out rounded-full"
              style={{ width: `${((active + 1) / STEPS.length) * 100}%` }}
            />
          </div>
          <div className="grid grid-cols-5 gap-3 relative z-10">
            {STEPS.map((step, i) => {
              const isActive = i === active;
              return (
                <button
                  type="button"
                  key={step.id}
                  onClick={() => setActive(i)}
                  className={`flex flex-col items-center text-center rounded-2xl p-4 border-2 transition-all duration-300 min-h-[220px] ${
                    isActive
                      ? 'bg-white/15 border-sky-300 shadow-xl scale-[1.02]'
                      : 'bg-white/5 border-white/15 hover:bg-white/10'
                  }`}
                >
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} text-2xl shadow-lg mb-3 ${
                      isActive ? 'ring-4 ring-white/30' : ''
                    }`}
                  >
                    {step.icon}
                  </div>
                  <p className="text-xs font-bold text-sky-300">Step {step.id}</p>
                  <p className="mt-1 font-semibold text-white text-sm leading-snug">{step.title}</p>
                  <p className="mt-2 text-xs text-sky-100/75 leading-relaxed flex-1">{step.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile / tablet: one step + clear prev/next toggles */}
        <div className="lg:hidden mb-8">
          <div className="rounded-2xl border-2 border-white/20 bg-white/10 p-5 sm:p-6 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div
                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${STEPS[active].color} text-3xl shadow-lg`}
              >
                {STEPS[active].icon}
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="text-sm font-bold text-sky-300">
                  Step {STEPS[active].id} of {STEPS.length}
                </p>
                <h3 className="mt-1 text-xl font-bold text-white leading-snug">{STEPS[active].title}</h3>
                <p className="mt-2 text-sm text-sky-100/90 leading-relaxed">{STEPS[active].desc}</p>
              </div>
            </div>

            {/* Clear toggle controls */}
            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActive((i) => (i - 1 + STEPS.length) % STEPS.length)}
                className="inline-flex items-center justify-center gap-1.5 h-11 px-4 rounded-xl border-2 border-white/40 bg-white/10 text-white font-semibold text-sm hover:bg-white/20 active:scale-95"
                aria-label="Previous step"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Prev
              </button>

              <div className="flex items-center justify-center gap-2">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to step ${i + 1}`}
                    aria-current={i === active ? 'step' : undefined}
                    onClick={() => setActive(i)}
                    className={`h-3.5 rounded-full transition-all border border-white/30 ${
                      i === active
                        ? 'w-8 bg-sky-400 border-sky-200 shadow-md shadow-sky-500/40'
                        : 'w-3.5 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setActive((i) => (i + 1) % STEPS.length)}
                className="inline-flex items-center justify-center gap-1.5 h-11 px-4 rounded-xl border-2 border-sky-400 bg-sky-500 text-white font-semibold text-sm hover:bg-sky-400 active:scale-95 shadow-lg"
                aria-label="Next step"
              >
                Next
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Story strip */}
        <div className="rounded-2xl bg-black/35 border border-white/15 p-5 sm:p-6 text-center">
          <p className="text-sm sm:text-base text-sky-50 leading-relaxed flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span className="font-semibold text-white">You apply</span>
            <span className="text-sky-400">→</span>
            <span className="font-semibold text-amber-200">Missing cert?</span>
            <span className="text-sky-400">→</span>
            <span className="font-semibold text-violet-200">Buy QATI course</span>
            <span className="text-sky-400">→</span>
            <span className="font-semibold text-indigo-200">Assessment</span>
            <span className="text-sky-400">→</span>
            <span className="font-semibold text-emerald-200">Certificate</span>
            <span className="text-sky-400">→</span>
            <span className="font-semibold text-sky-200">Job ready</span>
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
            <Link
              to="/jobs"
              className="inline-flex justify-center items-center px-6 py-3 rounded-xl font-semibold bg-white text-sky-900 hover:bg-sky-50"
            >
              Browse airline jobs
            </Link>
            <a
              href={COURSES_PLATFORM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center px-6 py-3 rounded-xl font-semibold bg-sky-500 hover:bg-sky-400 text-white"
            >
              Get certificate on QATI
            </a>
            <Link
              to="/courses"
              className="inline-flex justify-center items-center px-6 py-3 rounded-xl font-semibold border-2 border-white/30 text-white hover:bg-white/10"
            >
              See required courses
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificateJourney;
