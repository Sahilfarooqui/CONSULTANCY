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
    desc: 'Enrol on Qatar Advanced Training Institute (QATI) — courses available in Qatar online.',
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

/**
 * Animated path: Apply → need cert → buy course → assessment → certificate
 */
const CertificateJourney = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % STEPS.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-slate-900 via-sky-950 to-slate-900 text-white overflow-hidden relative">
      {/* soft animated blobs */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl animate-pulse" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sky-300 text-sm font-semibold uppercase tracking-wide">How it works</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold">
            Apply → Certificate path → Ready to fly
          </h2>
          <p className="mt-3 text-sky-100/80 max-w-2xl mx-auto">
            Applying without a certificate? No problem. Get the right course from our Qatar partner, pass the
            assessment, earn the certificate, then complete your application.
          </p>
        </div>

        {/* Desktop connected steps */}
        <div className="hidden lg:block relative mb-10">
          <div className="absolute top-12 left-[8%] right-[8%] h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-400 transition-all duration-700 ease-out rounded-full"
              style={{ width: `${((active + 1) / STEPS.length) * 100}%` }}
            />
          </div>
          <div className="grid grid-cols-5 gap-4">
            {STEPS.map((step, i) => {
              const isActive = i === active;
              const isDone = i < active;
              return (
                <button
                  type="button"
                  key={step.id}
                  onClick={() => setActive(i)}
                  className={`relative text-left rounded-2xl p-4 border transition-all duration-500 ${
                    isActive
                      ? 'bg-white/15 border-sky-300/50 scale-105 shadow-xl shadow-sky-900/40'
                      : isDone
                        ? 'bg-white/10 border-white/20'
                        : 'bg-white/5 border-white/10 opacity-80'
                  }`}
                >
                  <div
                    className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} text-2xl shadow-lg ${
                      isActive ? 'animate-bounce' : ''
                    }`}
                    style={isActive ? { animationDuration: '1.2s' } : undefined}
                  >
                    {step.icon}
                  </div>
                  <p className="text-xs font-bold text-sky-300">Step {step.id}</p>
                  <p className="mt-1 font-semibold text-white text-sm leading-snug">{step.title}</p>
                  <p className="mt-1 text-xs text-sky-100/70 leading-relaxed">{step.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile carousel card */}
        <div className="lg:hidden mb-8">
          <div
            key={STEPS[active].id}
            className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur animate-fade-in-up"
          >
            <div
              className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${STEPS[active].color} text-3xl shadow-lg animate-bounce`}
              style={{ animationDuration: '1.2s' }}
            >
              {STEPS[active].icon}
            </div>
            <p className="mt-4 text-sm font-bold text-sky-300">
              Step {STEPS[active].id} of {STEPS.length}
            </p>
            <h3 className="mt-1 text-2xl font-bold">{STEPS[active].title}</h3>
            <p className="mt-2 text-sky-100/85">{STEPS[active].desc}</p>
            <div className="mt-4 flex gap-2">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to step ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === active ? 'w-8 bg-sky-400' : 'w-2 bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Story strip */}
        <div className="rounded-2xl bg-black/30 border border-white/10 p-5 sm:p-6 text-center">
          <p className="text-sm sm:text-base text-sky-50 leading-relaxed">
            <span className="font-semibold text-white">You apply</span>
            <span className="mx-2 text-sky-400">→</span>
            <span className="font-semibold text-amber-200">Missing certificate?</span>
            <span className="mx-2 text-sky-400">→</span>
            <span className="font-semibold text-violet-200">Buy QATI course</span>
            <span className="mx-2 text-sky-400">→</span>
            <span className="font-semibold text-indigo-200">Assessment</span>
            <span className="mx-2 text-sky-400">→</span>
            <span className="font-semibold text-emerald-200">Get certificate</span>
            <span className="mx-2 text-sky-400">→</span>
            <span className="font-semibold text-sky-200">Job ready</span>
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/jobs"
              className="inline-flex justify-center px-6 py-3 rounded-xl font-semibold bg-white text-sky-900 hover:bg-sky-50"
            >
              Browse airline jobs
            </Link>
            <a
              href={COURSES_PLATFORM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center px-6 py-3 rounded-xl font-semibold bg-sky-500 hover:bg-sky-400 text-white"
            >
              Get certificate on QATI
            </a>
            <Link
              to="/courses"
              className="inline-flex justify-center px-6 py-3 rounded-xl font-semibold border border-white/25 text-white hover:bg-white/10"
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
