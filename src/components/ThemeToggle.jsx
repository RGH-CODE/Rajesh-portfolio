import React, { useState, useEffect } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDark(!isDark);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] group pointer-events-auto">
      <button
        onClick={toggleTheme}
        className="relative px-5 py-3 rounded-xl font-mono text-xs font-bold border-2 
                 border-blue-500/50 text-blue-500 bg-black/80 dark:bg-black/90
                 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300
                 hover:scale-105 hover:border-blue-500 flex items-center gap-3 overflow-hidden"
      >
        <div className="relative z-10 flex items-center gap-2">
          {isDark ? (
            <>
              <FiMoon size={18} className="animate-pulse" />
              <span>DARK_MODE</span>
            </>
          ) : (
            <>
              <FiSun size={18} className="animate-spin-slow" />
              <span>LIGHT_MODE</span>
            </>
          )}
        </div>
        
        {/* Cinematic Scanline Effect inside button */}
        <div className="absolute inset-x-0 h-[2px] bg-blue-500/20 top-0 animate-scanline pointer-events-none"></div>
      </button>
      
      {/* Decorative tooltip */}
      <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-blue-600 text-white text-[10px] px-2 py-1 rounded-md whitespace-nowrap">
          SYSTEM_THEME_TOGGLE
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;
