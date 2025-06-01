import React from 'react';

const About = () => {
  const team = [
    {
      name: "John Doe",
      position: "Founder & CEO",
      bio: "With over 20 years of experience in both IT and aviation industries, John founded the company to bridge the talent gap in these specialized sectors.",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "Emma Wilson",
      position: "Head of IT Recruitment",
      bio: "Emma brings 15 years of technical recruitment experience, having previously worked as a software developer before moving into talent acquisition.",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      name: "Robert Chen",
      position: "Head of Aviation Recruitment",
      bio: "A former airline operations manager, Robert has deep industry knowledge and an extensive network across the global aviation sector.",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "Sarah Johnson",
      position: "Career Development Specialist",
      bio: "Sarah specializes in helping professionals navigate career transitions and advancement in both the IT and aviation fields.",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About Us</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Connecting talent with opportunity in specialized industries
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-12">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2015, IT & Aviation Consultancy was established to address the unique recruitment challenges faced by companies in the IT and aviation sectors. We recognized that these industries require specialized knowledge and networks to find the right talent.
            </p>
            <p className="text-gray-700 mb-4">
              Our founder, having worked extensively in both sectors, saw an opportunity to create a consultancy that truly understands the technical requirements, regulatory considerations, and cultural fit needed for successful placements in these fields.
            </p>
            <p className="text-gray-700">
              Today, we've grown to become a trusted partner for leading technology companies and aviation businesses across the UK and Europe, with a reputation for quality, expertise, and personalized service.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 mb-3">{member.position}</p>
                  <p className="text-gray-700">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Expertise</h3>
                <p className="text-gray-700">We maintain deep industry knowledge to provide informed, relevant guidance to both clients and candidates.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Integrity</h3>
                <p className="text-gray-700">We operate with transparency and honesty in all our dealings, building trust with our partners.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
                <p className="text-gray-700">We strive for the highest standards in our service delivery and the matches we create.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;