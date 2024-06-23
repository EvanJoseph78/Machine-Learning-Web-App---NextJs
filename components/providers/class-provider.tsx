import { createContext, useContext, useState, ReactNode } from "react";

// Define the interface for the context type
interface ClassContextType {
  currentIdClass: string;
  currentClassTitle: string;
  currentUrlClassVideo: string;
  setCurrentIdClass: (id: string) => void;
  setCurrentClassTitle: (title: string) => void;
  setCurrentUrlClassVideo: (url: string) => void;
}

// Create the context with default values
const classItemContext = createContext<ClassContextType | undefined>(undefined);

// Custom hook to use the classItemContext
export const useClassItem = () => {
  const context = useContext(classItemContext);
  if (!context) {
    throw new Error('useClassItem deve ser usado dentro de um ClassItemProvider');
  }
  return context;
};

// Provider component for the classItemContext
interface ClassItemProviderProps {
  children: ReactNode;
}

export const ClassItemProvider = ({ children }: ClassItemProviderProps) => {
  const [currentIdClass, setCurrentIdClass] = useState<string>("");
  const [currentClassTitle, setCurrentClassTitle] = useState<string>("");
  const [currentUrlClassVideo, setCurrentUrlClassVideo] = useState<string>("dQw4w9WgXcQ");

  const value = {
    currentIdClass,
    currentClassTitle,
    currentUrlClassVideo,
    setCurrentIdClass,
    setCurrentClassTitle,
    setCurrentUrlClassVideo,
  };

  return (
    <classItemContext.Provider value={value}>
      {children}
    </classItemContext.Provider>
  );
};
