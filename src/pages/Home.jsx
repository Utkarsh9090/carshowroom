import React from 'react';
import Hero from '../components/Hero/Hero';
import BrandSection from '../components/BrandSection/BrandSection';
import FeaturedCars from '../components/FeaturedCars/FeaturedCars';
import CtaSection from '../components/CtaSection/CtaSection';

const Home = () => {
  return (
    <div>
      <Hero />
      <BrandSection />
      <FeaturedCars />
      <CtaSection />
    </div>
  );
};

export default Home;
