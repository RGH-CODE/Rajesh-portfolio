import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';

const ProjectCard = ({ title, description, icon, tech, link }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="premium-card relative group"
    >
      <div style={{ transform: "translateZ(50px)" }} className="flex items-center justify-between mb-6">
        <div className="text-4xl">{icon}</div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
          tech === 'Python' ? 'bg-yellow-100 text-yellow-700' : 
          tech === 'C Language' ? 'bg-red-100 text-red-700' : 
          'bg-blue-100 text-blue-700'
        }`}>
          {tech}
        </span>
      </div>
      <h3 style={{ transform: "translateZ(40px)" }} className="syne text-2xl mb-3 dark:text-white">{title}</h3>
      <p style={{ transform: "translateZ(30px)" }} className="text-gray-500 mb-6 dark:text-gray-400">{description}</p>
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-600 font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
        style={{ transform: "translateZ(20px)" }}
      >
        View Project <FiExternalLink size={16} />
      </a>
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Snake Water Game",
      description: "A fun, interactive command-line game implemented with Python logic.",
      icon: "🐍",
      tech: "Python",
      link: "https://github.com/RGH-CODE/basic-projects-/blob/main/snakeWaterGAME.PY"
    },
    {
      title: "Bank Management",
      description: "Efficient banking system with conditional statements and loops.",
      icon: "🏦",
      tech: "C Language",
      link: "https://github.com/RGH-CODE/basic-projects-/blob/main/bankStructure.c"
    },
    {
      title: "Inventory System",
      description: "Complex inventory management with binary file I/O operations.",
      icon: "📦",
      tech: "C++",
      link: "https://github.com/RGH-CODE/C-plus-plus-projects-solution-problems-pratice-assignment/blob/main/unit8FIlehandling/unit8.2ReadingAndWritingObjectRFA/5ourproject.cpp"
    }
  ];

  return (
    <section id="projects" className="section-padding py-32 bg-gray-50 transition-colors duration-500 dark:bg-black">
      <div className="container px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="syne text-4xl md:text-5xl mb-4 dark:text-white">Featured Projects</h2>
          <p className="text-gray-500 dark:text-gray-400">A curation of my best work across various technologies.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
