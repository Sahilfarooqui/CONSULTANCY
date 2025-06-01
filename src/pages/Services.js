import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      title: "IT Recruitment",
      description: "Specialized recruitment services for software developers, IT managers, cybersecurity experts, and more.",
      icon: "💻",
      color: "blue"
    },
    {
      title: "Aviation Recruitment",
      description: "Connecting airlines and aviation companies with pilots, engineers, flight attendants, and ground staff.",
      icon: "✈️",
      color: "indigo"
    },
    {
      title: "Career Consulting",
      description: "Professional guidance for career advancement, resume building, and interview preparation.",
      icon: "📈",
      color: "purple"
    },
    {
      title: "HR Solutions",
      description: "Comprehensive HR services including talent management, retention strategies, and workplace culture development.",
      icon: "👥",
      color: "teal"
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Our Expertise</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Specialized Services</p>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            We offer tailored recruitment and consultancy services for the IT and Aviation industries.
          </p>
        </div>

        <div className="mt-16 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const bgColor = `bg-${service.color}-50`;
            const borderColor = `border-${service.color}-200`;
            const iconBg = `bg-${service.color}-100`;
            const iconText = `text-${service.color}-600`;
            const titleColor = `text-${service.color}-800`;
            
            return (
              <div key={index} className={`rounded-xl ${bgColor} border ${borderColor} p-8 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1`}>
                <div className={`inline-flex items-center justify-center p-3 ${iconBg} rounded-md ${iconText} mb-5`}>
                  <span className="text-3xl">{service.icon}</span>
                </div>
                <h3 className={`text-xl font-bold ${titleColor} mb-3`}>{service.title}</h3>
                <p className="text-gray-600 mb-5">{service.description}</p>
                <Link to="/services" className={`text-${service.color}-600 hover:text-${service.color}-800 font-medium inline-flex items-center`}>
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;