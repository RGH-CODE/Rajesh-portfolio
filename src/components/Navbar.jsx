// Navbar.jsx
// Stack: React 18 + Framer Motion + react-icons + react-router-dom + Tailwind CSS

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiTerminal, FiMenu, FiX, FiArrowUpRight,
  FiHome, FiUser, FiCode, FiBookOpen, FiImage, FiMail,
} from "react-icons/fi";

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { name: "Home",     path: "/home",    icon: FiHome },
  { name: "About",    path: "/about",   icon: FiUser },
  { name: "Projects", path: "/projects",icon: FiCode },
  { name: "Blog",     path: "/blogs",   icon: FiBookOpen },
  { name: "Gallery",  path: "/gallery", icon: FiImage },
];

const CTA = { name: "Contact", path: "/contact", icon: FiMail };

// ─── HOOK: active link ────────────────────────────────────────────────────────

function useActiveLink() {
  const { pathname } = useLocation();
  return (path) => pathname === path || (path !== "/" && pathname.startsWith(path));
}

// ─── LOGO ─────────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2 no-underline">
      <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow duration-300">
        <span className="font-black text-white text-sm tracking-tighter select-none">RG</span>
        {/* Animated glow ring on hover */}
        <span className="absolute inset-0 rounded-xl ring-2 ring-blue-500/0 group-hover:ring-blue-500/50 transition-all duration-300" />
      </div>
      <div className="hidden sm:flex flex-col leading-none">
        <span className="text-[0.82rem] font-bold text-white tracking-tight">Rajesh Ghimire</span>
        <span className="text-[0.65rem] text-gray-500 tracking-widest uppercase">Portfolio</span>
      </div>
    </Link>
  );
}

// ─── DESKTOP NAV LINK ─────────────────────────────────────────────────────────

function DesktopLink({ link, isActive }) {
  return (
    <Link
      to={link.path}
      className="relative group flex items-center gap-1.5 px-1 py-1 no-underline"
    >
      <span
        className={`text-[0.78rem] font-semibold tracking-wider uppercase transition-colors duration-200 ${
          isActive
            ? "text-white"
            : "text-gray-500 group-hover:text-gray-200"
        }`}
      >
        {link.name}
      </span>
      {/* Active underline pill */}
      {isActive && (
        <motion.span
          layoutId="nav-pill"
          className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}

// ─── DEV MODE BUTTON ─────────────────────────────────────────────────────────

function DevModeBtn({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className="hidden lg:inline-flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-blue-400 border border-blue-500/25 hover:border-blue-500/60 hover:text-blue-300 bg-blue-500/5 hover:bg-blue-500/10 px-3 py-1.5 rounded-full transition-all duration-200"
    >
      <FiTerminal size={11} />
      Dev Mode
    </motion.button>
  );
}

// ─── CTA BUTTON ──────────────────────────────────────────────────────────────

function CTAButton({ isMobile = false }) {
  return (
    <Link
      to={CTA.path}
      className={`group inline-flex items-center gap-1.5 font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white no-underline transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-px active:translate-y-0 ${
        isMobile
          ? "w-full justify-center text-sm px-5 py-3"
          : "text-[0.78rem] px-4 py-2"
      }`}
    >
      <CTA.icon size={13} />
      {CTA.name}
      <FiArrowUpRight
        size={12}
        className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
      />
    </Link>
  );
}

// ─── MOBILE DRAWER ────────────────────────────────────────────────────────────

function MobileDrawer({ open, onClose, toggleDevMode, isActive }) {
  // Close on route change
  const { pathname } = useLocation();
  const prevPath = useRef(pathname);
  useEffect(() => {
    if (prevPath.current !== pathname) { onClose(); prevPath.current = pathname; }
  }, [pathname, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[10003] bg-black/70 backdrop-blur-sm md:hidden"
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed top-0 right-0 bottom-0 z-[10004] w-72 bg-gray-950 border-l border-white/8 flex flex-col md:hidden"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
              <Logo />
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/8 transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 px-4 py-6 flex flex-col gap-1 overflow-y-auto">
              {NAV_LINKS.map((link, i) => {
                const active = isActive(link.path);
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1, duration: 0.3 }}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl no-underline transition-all duration-200 ${
                        active
                          ? "bg-blue-500/12 text-white"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span className={`p-1.5 rounded-lg ${active ? "bg-blue-500/20 text-blue-400" : "bg-white/5 text-gray-500"}`}>
                        <Icon size={15} />
                      </span>
                      <span className="text-sm font-semibold tracking-wide">{link.name}</span>
                      {active && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom actions */}
            <div className="px-4 pb-8 pt-4 border-t border-white/8 flex flex-col gap-3">
              <CTAButton isMobile />
              {toggleDevMode && (
                <button
                  onClick={() => { toggleDevMode(); onClose(); }}
                  className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 hover:text-blue-300 py-2 transition-colors"
                >
                  <FiTerminal size={13} /> Dev Mode
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── MAIN NAVBAR ─────────────────────────────────────────────────────────────

export default function Navbar({ toggleDevMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = useActiveLink();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[10005] transition-all duration-300 ${
          scrolled
            ? "py-2.5 bg-gray-950/95 backdrop-blur-xl border-b border-white/8 shadow-xl shadow-black/30"
            : "py-4 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between gap-6">
          {/* Logo */}
          <Logo />

          {/* Desktop center links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <DesktopLink key={link.name} link={link} isActive={isActive(link.path)} />
            ))}
          </div>

          {/* Desktop right actions */}
          <div className="hidden md:flex items-center gap-3">
            {toggleDevMode && <DevModeBtn onClick={toggleDevMode} />}
            <CTAButton />
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-white/8 hover:bg-white/12 text-gray-300 hover:text-white transition-colors border border-white/8"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Scroll progress bar */}
        {scrolled && (
          <ScrollProgress />
        )}
      </motion.nav>

      {/* Mobile drawer */}
      <MobileDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        toggleDevMode={toggleDevMode}
        isActive={isActive}
      />
    </>
  );
}

// ─── SCROLL PROGRESS ─────────────────────────────────────────────────────────

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setProgress(scrollTop / (scrollHeight - clientHeight));
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 to-violet-500 origin-left"
        style={{ scaleX: progress }}
      />
    </div>
  );
}