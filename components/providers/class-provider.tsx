import { createContext, useContext, useState, ReactNode } from "react";

// Define the interface for the context type
interface ClassContextType {
  currentIdClass: string;
  currentModuleId: string;
  currentClassTitle: string;
  currentClassNumber: string;
  currentUrlClassVideo: string;
  setCurrentIdClass: (id: string) => void;
  setCurrentModuleId: (id: string) => void;
  setCurrentClassTitle: (title: string) => void;
  setCurrentClassNumber: (number: string) => void;
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
  const [currentModuleId, setCurrentModuleId] = useState<string>("");
  const [currentClassTitle, setCurrentClassTitle] = useState<string>("");
  const [currentClassNumber, setCurrentClassNumber] = useState<string>("");
  const [currentUrlClassVideo, setCurrentUrlClassVideo] = useState<string>("ts8i-6AtDfc");

  const value = {
    currentIdClass,
    currentModuleId,
    currentClassTitle,
    currentClassNumber,
    currentUrlClassVideo,
    setCurrentIdClass,
    setCurrentModuleId,
    setCurrentClassTitle,
    setCurrentClassNumber,
    setCurrentUrlClassVideo,
  };

  return (
    <classItemContext.Provider value={value}>
      {children}
    </classItemContext.Provider>
  );
};

