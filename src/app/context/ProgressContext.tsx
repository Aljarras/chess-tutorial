import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ProgressContextType {
  completedOpenings: string[];
  completeOpening: (openingId: string) => void;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

const STORAGE_KEY = "chess-tutorial-progress";

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedOpenings, setCompletedOpenings] = useState<string[]>(() => {
    // Initialize from localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to load progress from localStorage:", error);
      return [];
    }
  });

  // Save to localStorage whenever completedOpenings changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedOpenings));
    } catch (error) {
      console.error("Failed to save progress to localStorage:", error);
    }
  }, [completedOpenings]);

  const completeOpening = (openingId: string) => {
    setCompletedOpenings((prev) => {
      if (!prev.includes(openingId)) {
        return [...prev, openingId];
      }
      return prev;
    });
  };

  const resetProgress = () => {
    setCompletedOpenings([]);
  };

  return (
    <ProgressContext.Provider
      value={{ completedOpenings, completeOpening, resetProgress }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}