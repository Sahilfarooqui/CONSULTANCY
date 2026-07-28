import React from 'react';
import Hero from '../components/home/Hero';
import CertificateJourney from '../components/home/CertificateJourney';
import FeaturedJobs from '../components/home/FeaturedJobs';
import Services from '../components/home/Services';
import CoursesCTA from '../components/home/CoursesCTA';
import AppPromo from '../components/home/AppPromo';

const Home = () => {
  return (
    <div className="bg-white">
      <Hero />
      <CertificateJourney />
      <FeaturedJobs />
      <Services />
      <AppPromo />
      <CoursesCTA />
    </div>
  );
};

export default Home;
