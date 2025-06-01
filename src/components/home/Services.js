import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      title: "IT Recruitment",
      description: "Specialized recruitment services for software developers, IT managers, cybersecurity experts, and more.",
      icon: "💻",
      color: "primary"
    },
    {
      title: "Aviation Recruitment",
      description: "Connecting airlines and aviation companies with pilots, engineers, flight attendants, and ground staff.",
      icon: "✈️",
      color: "secondary"
    },
    {
      title: "Career Consulting",
      description: "Professional guidance for career advancement, resume building, and interview preparation.",
      icon: "📈",
      color: "primary"
    },
    {
      title: "HR Solutions",
      description: "Comprehensive HR services including talent management, retention strategies, and workplace culture development.",
      icon: "👥",
      color: "secondary"
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Our Services</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Specialized Solutions</p>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            We offer tailored recruitment and consultancy services for the IT and Aviation industries.
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div key={index} className={`bg-${service.color}-50 rounded-xl p-8 shadow-soft hover:shadow-card transition-all duration-300 transform hover:-translate-y-1 border border-${service.color}-100`}>
              <div className={`inline-flex items-center justify-center p-3 bg-${service.color}-100 rounded-md text-${service.color}-600 mb-5`}>
                <span className="text-3xl">{service.icon}</span>
              </div>
              <h3 className={`text-xl font-bold text-${service.color}-900 mb-3`}>{service.title}</h3>
              <p className="text-gray-600 mb-5">{service.description}</p>
              <Link to="/services" className={`text-${service.color}-600 hover:text-${service.color}-700 font-medium inline-flex items-center group`}>
                Learn more
                <svg 
                  className="w-6 h-6"
                  style={{width: '24px', height: '24px', flexShrink: 0}}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;