import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';

const Contact = () => {
  return (
    <section id="contact" className="section-padding py-32 bg-gray-50 transition-colors duration-500 dark:bg-black">
      <div className="container px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="syne text-4xl md:text-5xl mb-4 dark:text-white">Let's Connect</h2>
          <p className="text-gray-500 dark:text-gray-400">Have a project in mind? I'd love to hear from you.</p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <h3 className="syne text-2xl mb-8 dark:text-white">Contact Info</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 glass flex items-center justify-center rounded-xl text-xl bg-white dark:bg-zinc-900 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <FiMail size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Email</div>
                  <a href="mailto:rajesh.ghimire200@gmail.com" className="font-medium hover:text-blue-600 transition-colors dark:text-gray-300">rajesh.ghimire200@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 glass flex items-center justify-center rounded-xl text-xl bg-white dark:bg-zinc-900">
                  <FiMapPin size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Location</div>
                  <div className="font-medium dark:text-gray-300">Kathmandu, Nepal</div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="syne text-xl mb-6 dark:text-white">Socials</h3>
              <div className="flex gap-4">
                <a href="https://github.com/RGH-CODE" className="w-10 h-10 glass flex items-center justify-center rounded-lg hover:bg-black hover:text-white transition-all dark:bg-zinc-900">
                  <FiGithub size={20} />
                </a>
                <a href="https://www.linkedin.com/in/rajesh-ghimire-658015331/" className="w-10 h-10 glass flex items-center justify-center rounded-lg hover:bg-blue-700 hover:text-white transition-all dark:bg-zinc-900">
                  <FiLinkedin size={20} />
                </a>
                <a href="https://www.instagram.com/rajeshghimire08/" className="w-10 h-10 glass flex items-center justify-center rounded-lg hover:bg-pink-600 hover:text-white transition-all dark:bg-zinc-900">
                  <FiInstagram size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-3"
          >
            <form action="https://formspree.io/f/myzpvjvb" method="POST" className="glass p-8 rounded-[2rem] space-y-6 bg-white dark:bg-zinc-900/50">
              <div>
                <label className="text-sm font-semibold mb-2 block dark:text-gray-300">Name</label>
                <input name="name" type="text" required placeholder="John Doe" className="w-full bg-gray-50 dark:bg-zinc-800 border border-border dark:border-zinc-700 px-5 py-4 rounded-xl focus:outline-none focus:border-blue-600 transition-all dark:text-white" />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block dark:text-gray-300">Email</label>
                <input name="email" type="email" required placeholder="john@example.com" className="w-full bg-gray-50 dark:bg-zinc-800 border border-border dark:border-zinc-700 px-5 py-4 rounded-xl focus:outline-none focus:border-blue-600 transition-all dark:text-white" />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block dark:text-gray-300">Message</label>
                <textarea name="message" rows="4" required placeholder="Tell me about your project..." className="w-full bg-gray-50 dark:bg-zinc-800 border border-border dark:border-zinc-700 px-5 py-4 rounded-xl focus:outline-none focus:border-blue-600 transition-all resize-none dark:text-white"></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full justify-center text-lg py-4">Send Message</button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
