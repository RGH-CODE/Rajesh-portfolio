import React, { useRef, useEffect } from 'react';
import { useTerminal } from '../context/TerminalContext';

const Terminal = () => {
  const { logs, isActive } = useTerminal();
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  if (!isActive) return null;

  return (
    <div 
      ref={terminalRef}
      className="fixed bottom-5 left-5 w-[300px] h-[200px] bg-black/80 text-[#0f0] font-mono text-[10px] p-[15px] rounded-[10px] z-[1000] overflow-y-auto shadow-[0_10_30px_rgba(0,0,0,0.5)]"
    >
      {logs.map((log, i) => (
        <div key={i} className="mb-1">
          <span className="text-[#888]">[{log.time}]</span> {">"} {log.msg}
        </div>
      ))}
    </div>
  );
};

export default Terminal;
