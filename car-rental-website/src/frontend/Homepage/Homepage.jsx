import React from 'react';
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import Carousel from './Carousel';
function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Carousel/>
    </>
  );
}

export default HomePage;
