import React from 'react';
import Hero from '../components/HomeSections/Hero';
import About from '../components/HomeSections/About';
import Projects from '../components/HomeSections/Projects';
import Skills from '../components/HomeSections/Skills';
import Contact from '../components/HomeSections/Contact';

const Home = () => {
  return (
    <div className="home-page overflow-x-hidden">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
};

export default Home;
