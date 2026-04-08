import React, { createContext, useContext, useState, useCallback } from 'react';

const TerminalContext = createContext();

export const useTerminal = () => useContext(TerminalContext);

export const TerminalProvider = ({ children }) => {
  const [logs, setLogs] = useState([{ time: new Date().toLocaleTimeString(), msg: 'System initialized.' }]);
  const [isActive, setIsActive] = useState(false);

  const log = useCallback((msg) => {
    setLogs((prev) => [...prev, { time: new Date().toLocaleTimeString(), msg }]);
  }, []);

  const toggleTerminal = useCallback(() => {
    setIsActive((prev) => !prev);
    log(isActive ? "Developer Mode DISABLED" : "Developer Mode ENABLED");
  }, [isActive, log]);

  const closeTerminal = useCallback(() => {
    setIsActive(false);
    log("Developer Mode DISABLED (Auto)");
  }, [log]);

  return (
    <TerminalContext.Provider value={{ logs, isActive, log, toggleTerminal, closeTerminal }}>
      {children}
    </TerminalContext.Provider>
  );
};
