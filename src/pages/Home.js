import React from 'react';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import FeaturedJobs from '../components/home/FeaturedJobs';
import CoursesCTA from '../components/home/CoursesCTA';
import Testimonials from '../components/home/Testimonials';
import SuccessStories from '../components/home/SuccessStories';

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <FeaturedJobs />
      <CoursesCTA />
      <Testimonials />
      <SuccessStories />
    </div>
  );
};

export default Home;
