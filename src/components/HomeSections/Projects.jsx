
import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiGithub, FiX, FiArrowUpRight, FiLayers, FiCalendar, FiCode } from "react-icons/fi";

// ─── DATA ────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: 1,
    title: "NepEcom",
    subtitle: "Full-Stack E-Commerce Platform",
    description:
      "Fullstack ecommerce app with Django + React, featuring cart, orders, and collection-based product browsing with eSewa payment flow with secure order creation and transaction tracking.",
    detail:
      "E-commerce web application built with Django and React featuring a complete cart and checkout system, product browsing with filtering by collections, user authentication, order creation with pending/paid status tracking, and payment gateway integration (eSewa/Khalti sandbox). Includes real-time order flow from cart to payment initiation, backend order management via Django REST API, and frontend state handling with React Query. Implements secure payment signature generation, transaction UUID tracking, and success/failure redirect handling for payment verification workflow.",
    icon: "🛒",
    tech: "Django REST + React/Tanstack",
    techStack: ["Django RestFramework ", "React", "Tanstack Query", "eSewa API", "PostgreSQL", "Tailwind CSS"],
    year: "2025",
    category: "Full Stack",
    status: "Live",
    liveUrl: "https://nepecom.nepecom.workers.dev/",
    githubUrl: "https://github.com/RGH-CODE/python-django",
    color: "from-violet-500/10 to-blue-500/10",
    accent: "text-violet-600 dark:text-violet-400",
    badge: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
    dot: "bg-violet-500",
  },
  {
    id: 2,
    title: "Snake Water Game",
    subtitle: "Command-Line Python Game",
    description:
      "A fun, interactive command-line game implemented with Python logic  a twist on the classic Rock-Paper-Scissors mechanic.",
    detail:
      "A lightweight but engaging terminal game built entirely in Python. The game pits the player against the computer in a Snake-Water-Gun match, tracking scores across multiple rounds. It demonstrates clean Python fundamentals: control flow, randomization, and score state management — ideal as a learning reference for beginners.",
    icon: "🐍",
    tech: "Python",
    techStack: ["Python 3", "Random Module", "CLI"],
    year: "2023",
    category: "Game / CLI",
    status: "Open Source",
    liveUrl: null,
    githubUrl: "https://github.com/RGH-CODE/basic-projects-/blob/main/snakeWaterGAME.PY",
    color: "from-emerald-500/10 to-teal-500/10",
    accent: "text-emerald-600 dark:text-emerald-400",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    dot: "bg-emerald-500",
  },
  {
    id: 3,
    title: "Bank Management",
    subtitle: "Console Banking System",
    description:
      "Efficient banking system with conditional statements and loops supports account creation, deposits, withdrawals, and balance checks.",
    detail:
      "A C-language console application simulating core banking operations. The project demonstrates structured programming: functions for account creation, deposit/withdrawal logic, conditional validation, and loop-driven menus. A strong example of low-level system design and memory-conscious C programming.",
    icon: "🏦",
    tech: "C Language",
    techStack: ["C", "File I/O", "Structs", "CLI"],
    year: "2023",
    category: "Systems",
    status: "Open Source",
    liveUrl: null,
    githubUrl: "https://github.com/RGH-CODE/basic-projects-/blob/main/bankStructure.c",
    color: "from-orange-500/10 to-red-500/10",
    accent: "text-orange-600 dark:text-orange-400",
    badge: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    dot: "bg-orange-500",
  },
  {
    id: 4,
    title: "Inventory System",
    subtitle: "Binary File I/O Manager",
    description:
      "Complex inventory management with binary file I/O operations handles product records, stock tracking, and persistent data storage.",
    detail:
      "A C++ console application demonstrating advanced object-oriented concepts: classes, file handling with binary read/write, and random file access (RFA). The system supports adding products, updating quantities, searching records, and generating stock reports — all persisted across sessions via binary files.",
    icon: "📦",
    tech: "C++",
    techStack: ["C++", "OOP", "Binary File I/O", "RFA", "CLI"],
    year: "2023",
    category: "Systems",
    status: "Open Source",
    liveUrl: null,
    githubUrl:
      "https://github.com/RGH-CODE/C-plus-plus-projects-solution-problems-pratice-assignment/blob/main/unit8FIlehandling/unit8.2ReadingAndWritingObjectRFA/5ourproject.cpp",
    color: "from-sky-500/10 to-cyan-500/10",
    accent: "text-sky-600 dark:text-sky-400",
    badge: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
    dot: "bg-sky-500",
  },
];

// ─── TILT CARD ────────────────────────────────────────────────────────────────

function TiltCard({ children, className = "" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────

function ProjectCard({ project, index, onDetail }) {
  const { title, subtitle, description, icon, tech, badge, color, accent, dot, status, liveUrl, githubUrl } = project;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
    >
      <TiltCard className="h-full">
        <div
          className={`h-full relative flex flex-col rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-gray-900 p-6 overflow-hidden transition-shadow duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Gradient bg blob */}
          <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-60 pointer-events-none rounded-2xl`} />

          {/* Top row */}
          <div className="relative flex items-start justify-between mb-5" style={{ transform: "translateZ(30px)" }}>
            <div className="text-4xl leading-none">{icon}</div>
            <div className="flex flex-col items-end gap-1.5">
              <span className={`text-[0.7rem] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full ${badge}`}>
                {tech}
              </span>
              <span className="flex items-center gap-1.5 text-[0.7rem] text-gray-400 dark:text-gray-500">
                <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                {status}
              </span>
            </div>
          </div>

          {/* Text */}
          <div className="relative flex-1 flex flex-col" style={{ transform: "translateZ(20px)" }}>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-0.5 leading-tight">{title}</h3>
            <p className={`text-[0.78rem] font-semibold mb-3 ${accent}`}>{subtitle}</p>
            <p className="text-[0.875rem] text-gray-500 dark:text-gray-400 leading-relaxed flex-1 mb-6">{description}</p>
          </div>

          {/* Actions */}
          <div className="relative flex items-center gap-2 flex-wrap" style={{ transform: "translateZ(40px)" }}>
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[0.78rem] font-semibold px-3.5 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-80 transition-opacity"
              >
                <FiExternalLink size={13} /> Live Demo
              </a>
            )}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[0.78rem] font-semibold px-3.5 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              <FiGithub size={13} /> GitHub
            </a>
            <button
              onClick={() => onDetail(project)}
              className={`inline-flex items-center gap-1.5 text-[0.78rem] font-semibold px-3.5 py-2 rounded-lg transition-colors ${accent} hover:bg-gray-100 dark:hover:bg-white/5`}
            >
              <FiArrowUpRight size={13} /> Details
            </button>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

// ─── DETAIL MODAL ─────────────────────────────────────────────────────────────

function DetailModal({ project, onClose }) {
  if (!project) return null;
  const { title, subtitle, detail, icon, techStack, year, category, status, liveUrl, githubUrl, color, badge, dot } = project;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header gradient */}
          <div className={`h-2 w-full bg-gradient-to-r ${color.replace("/10", "")} bg-opacity-100`} />

          <div className="p-7">
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
            >
              <FiX size={15} />
            </button>

            {/* Icon + title */}
            <div className="flex items-center gap-4 mb-5">
              <div className="text-5xl leading-none">{icon}</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">{title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>
              </div>
            </div>

            {/* Meta pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-semibold px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400">
                <FiCalendar size={11} /> {year}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-semibold px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400">
                <FiLayers size={11} /> {category}
              </span>
              <span className={`inline-flex items-center gap-1.5 text-[0.72rem] font-bold px-2.5 py-1 rounded-full ${badge}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />{status}
              </span>
            </div>

            {/* Description */}
            <p className="text-[0.9rem] text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{detail}</p>

            {/* Tech stack */}
            <div className="mb-7">
              <div className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
                <FiCode size={12} /> Tech Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {techStack.map((t) => (
                  <span key={t} className="text-[0.78rem] font-medium px-3 py-1 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3 flex-wrap pt-5 border-t border-gray-100 dark:border-white/10">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 text-sm font-semibold px-5 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-80 transition-opacity"
                >
                  <FiExternalLink size={14} /> Live Demo
                </a>
              )}
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 text-sm font-semibold px-5 py-3 rounded-xl border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                <FiGithub size={14} /> View on GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── SECTION HEADER ──────────────────────────────────────────────────────────

function SectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <span className="inline-block text-[0.72rem] font-bold tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-4">
        — Portfolio —
      </span>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
        Featured Projects
      </h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-[0.95rem] leading-relaxed">
        A curated showcase of my work across full-stack web, systems programming, and Python.
      </p>
      {/* Decorative line */}
      <div className="flex items-center justify-center gap-3 mt-8">
        <div className="h-px w-16 bg-gray-200 dark:bg-white/10" />
        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-white/20" />
        <div className="h-px w-16 bg-gray-200 dark:bg-white/10" />
      </div>
    </motion.div>
  );
}

// ─── STATS BAR ────────────────────────────────────────────────────────────────

function StatsBar() {
  const stats = [
    { label: "Total Projects", value: PROJECTS.length },
    { label: "Live in Production", value: PROJECTS.filter((p) => p.liveUrl).length },
    { label: "Open Source", value: PROJECTS.filter((p) => p.status === "Open Source").length },
    { label: "Technologies", value: [...new Set(PROJECTS.flatMap((p) => p.techStack))].length },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200/80 dark:bg-white/10 rounded-2xl overflow-hidden mb-16"
    >
      {stats.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center justify-center py-5 px-4 bg-white dark:bg-gray-900">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">{value}</span>
          <span className="text-[0.72rem] text-gray-400 dark:text-gray-500 mt-1 tracking-wide uppercase">{label}</span>
        </div>
      ))}
    </motion.div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function Projects() {
  const [activeDetail, setActiveDetail] = useState(null);

  return (
    <>
      <section
        id="projects"
        className="relative py-28 px-4 bg-gray-50 dark:bg-black transition-colors duration-500 overflow-hidden"
      >
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-violet-500/5 dark:bg-violet-500/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <SectionHeader />
          <StatsBar />

          {/* Grid — responsive: 1 col → 2 col → 2 col with featured first card larger */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Featured card — spans 2 cols on lg */}
            <div className="lg:col-span-2">
              <ProjectCard project={PROJECTS[0]} index={0} onDetail={setActiveDetail} />
            </div>
            {/* Rest */}
            {PROJECTS.slice(1).map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i + 1} onDetail={setActiveDetail} />
            ))}
          </div>

          {/* View all CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center mt-14"
          >
            <a
              href="https://github.com/RGH-CODE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-white/5 hover:shadow-md transition-all"
            >
              <FiGithub size={16} /> View all projects on GitHub
            </a>
          </motion.div>
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {activeDetail && (
          <DetailModal project={activeDetail} onClose={() => setActiveDetail(null)} />
        )}
      </AnimatePresence>
    </>
  );
}