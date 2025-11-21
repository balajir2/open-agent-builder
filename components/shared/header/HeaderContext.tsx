"use client";

import { createContext, useContext, ReactNode } from "react";

const HeaderContext = createContext({});

export function HeaderProvider({ children }: { children: ReactNode }) {
  return (
    <HeaderContext.Provider value={{}}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  return useContext(HeaderContext);
}
