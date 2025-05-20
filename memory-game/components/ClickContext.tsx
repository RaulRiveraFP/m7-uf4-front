'use client'

import React, { createContext, useContext, useState } from 'react';

interface ClickContextType {
  totalClicks: number;
  increment: () => void;
}

const ClickContext = createContext<ClickContextType | undefined>(undefined);

export function ClickProvider({ children }: { children: React.ReactNode }) {
  const [totalClicks, setTotalClicks] = useState(0);

  function increment() {
    setTotalClicks((prev) => prev + 1);
  }

  return (
    <ClickContext.Provider value={{ totalClicks, increment }}>
      {children}
    </ClickContext.Provider>
  );
}

export function useClickContext() {
  const context = useContext(ClickContext);
  if (!context) {
    throw new Error('useClickContext debe usarse dentro de ClickProvider');
  }
  return context;
}
