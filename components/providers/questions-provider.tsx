import { Questions } from "@prisma/client"
import { createContext, useContext, useState, ReactNode } from "react";

// cria a interface para tipar o contexto.
interface QuestionContextType {
  questionsList: Questions[];
  setQuestionsList: (questionsList: Questions[]) => void;
}

// cria o contexto com valores padrão
const questionItemContext = createContext<QuestionContextType | undefined>(undefined);

// hook customizado para usar o questionItemContext
export const useQuestionItem = () => {
  const context = useContext(questionItemContext);
  if (!context) {
    throw new Error('useClassItem deve ser usado dentro de um ClassItemProvider');
  }
  return context;
};

// Provider component for the classItemContext
interface QuestionItemProviderProps {
  children: ReactNode;
}

export const ClassItemProvider = ({ children }: QuestionItemProviderProps) => {

  const [questionsList, setQuestionsList] = useState<Questions[]>([]);

  const value = {
    questionsList,
    setQuestionsList
  };

  return (
    <questionItemContext.Provider value={value}></questionItemContext.Provider>
  );
};

