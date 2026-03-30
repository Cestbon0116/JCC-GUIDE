import React, { createContext, useContext, useState, ReactNode } from "react";
import { Piece } from "@/lib/types";

interface AppContextType {
  globalSearch: string;
  setGlobalSearch: (term: string) => void;
  selectedUnit: Piece | null;
  setSelectedUnit: (unit: Piece | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [globalSearch, setGlobalSearch] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<Piece | null>(null);

  return (
    <AppContext.Provider value={{ globalSearch, setGlobalSearch, selectedUnit, setSelectedUnit }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
