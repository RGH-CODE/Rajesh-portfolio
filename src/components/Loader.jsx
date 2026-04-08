import React, { useState, useEffect } from 'react';

const Loader = ({ onFinished }) => {
  const [log, setLog] = useState('STATUS: READY');
  const [progress, setProgress] = useState('INITIALIZING SYSTEM');
  const [isVisible, setIsVisible] = useState(true);

  const statuses = [
    "MOUNTING ENCRYPTED FILESYSTEM...",
    "SCANNING FOR SECURITY THREATS...",
    "VERIFYING USER AUTHENTICITY...",
    "ACCESS GRANTED.",
    "INITIALIZING OBSIDIAN CORE...",
    "READY TO EXPLORE."
  ];

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      if (step < statuses.length) {
        setLog(`STATUS: ${statuses[step]}`);
        step++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          if (onFinished) onFinished(); // Start showing main content earlier
          setTimeout(() => {
            setIsVisible(false);
          }, 1200); // Wait for transition/overlap
        }, 500);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [onFinished]);

  if (!isVisible) return null;

  return (
    <div id="loader" className="fixed inset-0 z-[10000] bg-[#000] flex flex-col items-center justify-center transition-opacity duration-[1200ms] overflow-hidden">
      <div className="scanning-bar"></div>
      <div className="loader-text">RGH Rajesh</div>
      <div className="mt-[30px] uppercase tracking-[0.5em] opacity-80 flex flex-col items-center gap-[10px] text-[11px] font-mono text-primary">
        <div id="loader-progress">{progress}</div>
        <div className="h-[20px] text-[9px] opacity-50 tracking-normal" id="loader-log">{log}</div>
      </div>
    </div>
  );
};

export default Loader;
