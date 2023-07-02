import { createContext, useContext, useState } from "react";

const stateContext = createContext({
  running: false,
  setRunning: () => {},
});

export const ContextProvider = ({ children }) => {
  const [running, setRunning] = useState(false);
  return (
    <stateContext.Provider
      value={{
        running,
        setRunning,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export const useStateContext = () => useContext(stateContext);
