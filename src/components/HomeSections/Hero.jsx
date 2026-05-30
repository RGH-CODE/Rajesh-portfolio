import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  const words = ["Web Developer.", "Content Creator.", "IT Student.", "Problem Solver."];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [hovered, setHovered] = useState(false);
  // typing effect
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero relative min-h-screen flex items-center justify-center text-center overflow-hidden pt-20 bg-black">
      {/* Scrolling Backdrop Text */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none whitespace-nowrap overflow-hidden">
        <div className="syne text-[20vw] font-black animate-scroll-text uppercase">
          Rajesh Ghimire / Rajesh Ghimire / Rajesh Ghimire / Rajesh Ghimire
        </div>
      </div>

      <div className="hero-bg-gradient absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_50%)] z-[-1]"></div>
      
      <div className="container relative z-10 px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 60, filter: 'blur(20px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
         <span className="text-orange-300 font-bold tracking-widest uppercase text-sm mb-4 block">
      <a
        href="https://nepecom.nepecom.workers.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-red-900 transition"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {hovered
          ? "Click Me"
          : "Explore Nepal's First Modern E-commerce System"}
      </a>
    </span>
          <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">Available for Projects</span>
          <h1 className="syne text-[clamp(3.5rem,8vw,6rem)] mb-6 leading-[0.85] bg-[linear-gradient(180deg,#fff_0%,#444_100%)] bg-clip-text text-transparent">
            Crafting Digital<br />Experiences.
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed min-h-[3em]">
            Hi, I'm <span className="text-blue-600 font-semibold">Rajesh Ghimire</span>. <br />
            <span className="font-mono text-blue-500 font-bold">
              {words[index].substring(0, subIndex)}
              <span className="typed-cursor"></span>
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center mt-10">
              <button 
                onClick={() => scrollToSection('projects')}
                className="btn btn-primary text-lg"
              >
                View My Work
                <FiArrowRight size={20} />
              </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="btn btn-outline text-lg"
            >
              Get in Touch
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;