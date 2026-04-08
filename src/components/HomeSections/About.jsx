import React from 'react';
import { motion } from 'framer-motion';
import profileImg from '../../assets/me.jpg';

const About = () => {
  return (
    <section id="about" className="section-padding bg-white relative py-32 transition-colors duration-500 dark:bg-[#050505]">
      <div className="container px-6 mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50 dark:bg-blue-900/20"></div>
            <img 
              src={profileImg} 
              alt="Rajesh Ghimire profile" 
              className="relative z-10 w-full aspect-square object-cover rounded-[2rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" 
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="syne text-4xl md:text-5xl mb-8 dark:text-white">Passionate about<br /><span className="text-blue-600">Digital Solutions.</span></h2>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed dark:text-gray-400">
              I started as a curious student who loved solving problems with code. Today, I specialize in creating full-stack applications with modern technologies, focusing on user experience and clean, maintainable code.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="glass p-5 rounded-2xl bg-gray-50 dark:bg-zinc-900/50">
                <div className="text-3xl font-bold text-blue-600 mb-1">03+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Years Exp.</div>
              </div>
              <div className="glass p-5 rounded-2xl bg-gray-50 dark:bg-zinc-900/50">
                <div className="text-3xl font-bold text-blue-600 mb-1">20+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Projects</div>
              </div>
            </div>
            <button className="btn btn-primary">Download Resume</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
