import { ListQuestions } from "@/lib/types";
import { createContext, useContext, useState, ReactNode } from "react";

// Cria a interface para tipar o contexto.
interface QuestionContextType {
  questionsList: ListQuestions[]; //lista de questões do curso
  setQuestionsList: (questionsList: ListQuestions[]) => void; // define a lista de questões do curso
  currentQuestionNumber: number; //número da quetão atual - posição no array - necessário ir para a próxima questão
  setCurrentQuestionNumber: (currentQuestion: number) => void; // define o número da questão
  isDisabled: boolean; // variável para desabilitar o botão de resposta depois de o usuário marcar uma alternativa
  setIsDisabled: (isDisabled: boolean) => void; // define isDisabled
  amountCorrect: number; // guarda a quantidade de questões acertadas pelo usuário
  setAmountCorrect: (amountCorrect: number) => void; // define amountCorrect
  isFinished: boolean; // variável pra verificar se o usuário terminou o questionário
  setIsFinished: (isFinished: boolean) => void; // define isFinished
  percentageCorrect: number;
  setPercentageCorrect: (percentageCorrect: number) => void;
}

// Cria o contexto com valores padrão
const questionItemContext = createContext<QuestionContextType | undefined>(undefined);

// Hook customizado para usar o questionItemContext
export const useQuestionItem = () => {
  const context = useContext(questionItemContext);
  if (!context) {
    throw new Error('useQuestionItem deve ser usado dentro de um QuestionItemProvider');
  }
  return context;
};

// Provider component para o questionItemContext
interface QuestionItemProviderProps {
  children: ReactNode;
}

export const QuestionItemProvider = ({ children }: QuestionItemProviderProps) => {

  const [questionsList, setQuestionsList] = useState<ListQuestions[]>([]);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [amountCorrect, setAmountCorrect] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [percentageCorrect, setPercentageCorrect] = useState<number>(0);

  // expõe para todos os components inscritos os valores
  const value = {
    questionsList,
    setQuestionsList,
    currentQuestionNumber,
    setCurrentQuestionNumber,
    isDisabled,
    setIsDisabled,
    amountCorrect,
    setAmountCorrect,
    isFinished,
    setIsFinished,
    percentageCorrect,
    setPercentageCorrect
  };

  return (
    // expõe para todos os components inscritos os valores
    <questionItemContext.Provider value={value}>
      {children}
    </questionItemContext.Provider>
  );
};
