import React from 'react';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import CertificateJourney from '../components/home/CertificateJourney';
import FeaturedJobs from '../components/home/FeaturedJobs';
import CoursesCTA from '../components/home/CoursesCTA';
import AppPromo from '../components/home/AppPromo';
import Testimonials from '../components/home/Testimonials';
import SuccessStories from '../components/home/SuccessStories';

const Home = () => {
  return (
    <div>
      <Hero />
      <CertificateJourney />
      <FeaturedJobs />
      <Services />
      <CoursesCTA />
      <AppPromo />
      <Testimonials />
      <SuccessStories />
    </div>
  );
};

export default Home;
