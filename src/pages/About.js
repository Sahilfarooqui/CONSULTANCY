import React from 'react';
import { Link } from 'react-router-dom';
import appConfig from '../config/appConfig';

const About = () => {
  const team = [
    {
      image: `${process.env.PUBLIC_URL}/images/team/ceo.jpeg`,
      name: 'Sheikh Ahmed Al-Farsi',
      position: 'Founder & CEO',
      bio: 'Building bridges between aviation talent and employers across the Gulf.',
    },
    {
      image: `${process.env.PUBLIC_URL}/images/team/girl.jpeg`,
      name: 'Fatimah Al-Zahra',
      position: 'Chief Strategy Officer',
      bio: 'Driving partnerships with airlines, airports, and training institutes.',
    },
    {
      image: `${process.env.PUBLIC_URL}/images/team/download.jpeg`,
      name: 'Omar Al-Mansour',
      position: 'Lead Aviation Consultant',
      bio: 'Specialist in cabin crew and ground operations placements.',
    },
    {
      image: `${process.env.PUBLIC_URL}/images/team/hr.jpeg`,
      name: 'Layla Al-Hassan',
      position: 'Operations Manager',
      bio: 'Keeps candidate pipelines and employer briefings running smoothly.',
    },
  ];

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">About Runway2Sky</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Aviation careers, clear sky ahead.
          </p>
        </div>

        <div className="bg-white shadow-soft rounded-2xl border border-slate-100 overflow-hidden mb-12">
          <div className="p-8 text-left">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our story</h2>
            <p className="text-slate-700 mb-4 leading-relaxed">
              Runway2Sky was built for one industry: aviation. Freshers struggle to find entry-level cabin crew and
              airport roles scattered across LinkedIn and other boards. Experienced engineers and ops professionals need
              a focused channel. We bring those openings together in one place.
            </p>
            <p className="text-slate-700 mb-4 leading-relaxed">
              Based in Doha, we combine a multi-source job board with consultancy support and training through our
              partner,{' '}
              <a
                href={appConfig.partners.courses.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-700 font-medium underline underline-offset-2"
              >
                {appConfig.partners.courses.name}
              </a>
              .
            </p>
            <p className="text-slate-700 leading-relaxed">
              Whether you are taking off for the first time or climbing to the next altitude, Runway2Sky is your career
              hub.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Our team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white shadow-soft rounded-2xl border border-slate-100 overflow-hidden"
              >
                <img src={member.image} alt={member.name} className="w-full h-56 object-cover" />
                <div className="p-5 text-left">
                  <h3 className="text-lg font-semibold text-slate-900">{member.name}</h3>
                  <p className="text-sky-700 text-sm mb-2">{member.position}</p>
                  <p className="text-slate-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow-soft rounded-2xl border border-slate-100 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Our values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Access</h3>
              <p className="text-slate-600">
                Make aviation jobs visible — especially fresher roles that are hard to find.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Integrity</h3>
              <p className="text-slate-600">
                Clear sources, honest guidance, and transparent processes for candidates and employers.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Growth</h3>
              <p className="text-slate-600">
                Pair opportunities with training so careers keep climbing.
              </p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/contact"
              className="inline-flex px-6 py-3 rounded-xl font-semibold bg-sky-600 text-white hover:bg-sky-700"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
