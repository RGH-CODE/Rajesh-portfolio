import React from 'react';
import { motion } from 'framer-motion';

const Sticker = ({ text, color, initialX, initialY, rotation }) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
      initial={{ x: initialX, y: initialY, rotate: rotation, opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`absolute cursor-grab active:cursor-grabbing select-none px-4 py-2 rounded-lg font-mono text-xs font-bold border-2 ${color} bg-black/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-20 pointer-events-auto`}
      style={{ zIndex: 30 }}
    >
      {text}
    </motion.div>
  );
};

const Stickers = ({ isVisible }) => {
  if (!isVisible) return null;

  const stickers = [
    { text: "CREATIVE MIND", color: "border-blue-500 text-blue-500", initialX: 100, initialY: 200, rotation: -15 },
    { text: "CODE !!", color: "border-pink-500 text-pink-500", initialX: 300, initialY: 450, rotation: 10 },
    { text: "CINEMATIC", color: "border-green-500 text-green-500", initialX: 800, initialY: 150, rotation: -5 },
    { text: "RGH_RAJESH", color: "border-yellow-500 text-yellow-500", initialX: 600, initialY: 600, rotation: 20 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      <div className="relative w-full h-full">
        {stickers.map((s, i) => (
          <Sticker key={i} {...s} />
        ))}
      </div>
    </div>
  );
};

export default Stickers;
