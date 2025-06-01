import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Working with IT & Aviation Consultancy transformed our hiring process. They found us exceptional talent that perfectly matched our requirements.",
      author: "Jane Smith",
      position: "CTO, TechSolutions Inc.",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      quote: "Their deep understanding of both IT and aviation sectors makes them uniquely positioned to find the right candidates for specialized roles.",
      author: "Michael Johnson",
      position: "HR Director, AirConnect",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      quote: "The career guidance I received helped me transition from a mid-level position to a senior role. I'm grateful for their expertise and support.",
      author: "Sarah Williams",
      position: "Senior Developer, DataSphere",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Testimonials</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">What Our Clients Say</p>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients and candidates have to say.
          </p>
        </div>

        <div className="mt-16 grid gap-8 grid-cols-1 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 relative">
              <div className="absolute -top-5 -left-5 w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center shadow-md">
                <svg className="w-7 h-7 max-w-full max-h-full text-white" fill="currentColor" viewBox="0 0 20 20" width="28" height="28">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </div>
              <p className="text-gray-700 italic mb-6 text-lg">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author}
                  className="w-16 h-16 rounded-full mr-4 border-2 border-indigo-200 shadow-sm object-cover"
                  style={{width: '64px', height: '64px', objectFit: 'cover'}}
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                  <p className="text-indigo-600 text-sm">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;