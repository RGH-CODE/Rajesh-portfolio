import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiTerminal } from 'react-icons/fi';

const Navbar = ({ toggleDevMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact', highlight: true },
  ];

  const scrollToSection = (id) => {
    if (id.startsWith('#')) {
      const element = document.getElementById(id.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      }
    }
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-[10005] transition-all duration-300 ${isScrolled ? 'py-2 bg-black/95 border-b-2 border-primary' : 'py-4 glass'}`}>
        <div className="nav-content flex justify-between items-center px-6 max-w-7xl mx-auto">
          <Link to="/" className="syne text-2xl font-bold tracking-tighter text-blue-600">RG</Link>

          <div className="hidden md:flex gap-10 items-center">
            {toggleDevMode && (
              <button
                onClick={toggleDevMode}
                className="text-[10px] font-bold text-blue-400 hover:text-white transition-colors uppercase tracking-[0.2em] border border-blue-400/30 px-3 py-1 rounded-full flex items-center gap-2"
              >
                <FiTerminal size={12} />
                Dev Mode
              </button>
            )}
            {navLinks.map((link) => (
              link.path.startsWith('#') || (link.path.startsWith('/') && link.path.includes('#')) ? (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => {
                    const id = link.path.split('#')[1];
                    if (id && location.pathname === '/') {
                      e.preventDefault();
                      scrollToSection(`#${id}`);
                    }
                  }}
                  className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all ${link.highlight
                    ? 'text-blue-500 hover:text-blue-400 border-b border-blue-500/0 hover:border-blue-500/100 pb-1'
                    : 'text-gray-300 hover:text-white'
                    }`}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 hover:text-white transition-all"
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed top-20 left-4 right-4 glass md:hidden z-[10005] rounded-3xl p-8 transition-all duration-300 ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col gap-6 text-center text-white">
          {navLinks.map((link) => (
            link.path.startsWith('#') || (link.path.startsWith('/') && link.path.includes('#')) ? (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => {
                  const id = link.path.split('#')[1];
                  if (id && location.pathname === '/') {
                    e.preventDefault();
                    scrollToSection(`#${id}`);
                  }
                }}
                className="text-xl font-bold hover:text-blue-500 transition-colors"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-xl font-bold hover:text-blue-500 transition-colors"
              >
                {link.name}
              </Link>
            )
          ))}
          {toggleDevMode && (
            <button
              onClick={() => { toggleDevMode(); setIsMenuOpen(false); }}
              className="text-sm font-bold text-blue-400 uppercase tracking-widest mt-4"
            >
              Dev Mode
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
