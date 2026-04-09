import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-white transition-colors duration-500 dark:bg-black">
      <div className="container px-6 flex flex-col md:flex-row justify-between items-center gap-6 mx-auto">
        <div className="syne text-2xl font-bold text-blue-600">RG</div>
        <div className="text-gray-400 text-sm italic">Designed for Excellence.</div>
        <a href="/privacy-policy" className="text-grey-300 underline text-sm">
    Privacy Policy
  </a>
        <div className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Rajesh Ghimire.</div>
        
      </div>
    </footer>
  );
};

export default Footer;
