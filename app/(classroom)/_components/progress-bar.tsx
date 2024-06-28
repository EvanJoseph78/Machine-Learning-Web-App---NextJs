"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"
import { Questions } from "@prisma/client"
import { useQuestionItem } from "@/components/providers/questions-provider";

interface ProgressBarProps {
  questionsList?: Questions[],
}

export function ProgressBar() {

  const { questionsList, amountCorrect, currentQuestionNumber, isFinished, setPercentageCorrect } = useQuestionItem();
  const totalQuestions = questionsList ? questionsList.length : 1; // Evita divisão por zero

  const [progress, setProgress] = React.useState(0)

  const percentageCorrect = ((amountCorrect / totalQuestions) * 100).toFixed(2);

  React.useEffect(() => {
    // Calcula a porcentagem de progresso com base nas respostas corretas
    const calculatedProgress = (currentQuestionNumber / totalQuestions) * 100;
    setProgress(calculatedProgress);
    setPercentageCorrect(Number(percentageCorrect));
  }, [currentQuestionNumber, totalQuestions]) // Dependências

  return (
    <div className="py-4 flex flex-col">
      <div className="flex justify-center items-center flex-col gap-2">
        <h1 className="text-sm text-muted-foreground">Barra de progresso.</h1>
        {isFinished ? (
          <Progress value={progress} className="w-full" />
        ) : (
          <Progress value={progress} className="w-full" />
        )}
        <div>{currentQuestionNumber}/{totalQuestions} </div>
      </div>
      {/* <div>Porcentagem de acertos: {percentageCorrect} % </div> */}
    </div>
  );
}
