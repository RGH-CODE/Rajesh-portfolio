import React from 'react';
import { motion } from 'framer-motion';

const SkillCategory = ({ title, skills }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="glass p-8 rounded-3xl bg-white dark:bg-zinc-900/50"
  >
    <h3 className="syne text-2xl mb-6 dark:text-white">{title}</h3>
    <div className="space-y-4 text-gray-500 dark:text-gray-400">
      {skills.map((skill, index) => (
        <div key={index}>
          <div className="flex justify-between mb-1 text-sm font-medium">
            <span>{skill.name}</span>
            <span>{skill.level}</span>
          </div>
          <div className="h-1.5 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-full bg-blue-600 rounded-full"
            ></motion.div>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const Skills = () => {
  const categories = [
    {
      title: "Frontend",
      skills: [
        { name: "React/tanstack" },
        { name: "Tailwind CSS" }
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Python / Django" },
        { name: "Node.js" }
      ]
    },
    {
      title: "Other",
      skills: [
        { name: "Git / GitHub" },
        { name: "Content Creation" }
      ]
    }
  ];

  return (
    <section id="skills" className="section-padding py-32 bg-white transition-colors duration-500 dark:bg-[#050505]">
      <div className="container px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="syne text-4xl md:text-5xl mb-4 dark:text-white">Skills & Tools</h2>
          <p className="text-gray-500 dark:text-gray-400">The technologies I use to bring ideas to life.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <SkillCategory key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
