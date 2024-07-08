import { useQuestionItem } from "@/components/providers/questions-provider";
import { Card, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Options } from "@prisma/client";
import { useState } from "react";

interface QuestionCardProps {
  questionText: string | null;
  options: Options[];
}

export const QuestionCard = ({ questionText, options }: QuestionCardProps) => {
  const { isDisabled, setIsDisabled, amountCorrect, setAmountCorrect } = useQuestionItem();
  const [questionMarked, setQuestionMarked] = useState<boolean>(false);
  const [currentOptionId, setCurrentOptionId] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleResponse = (isCorrect: boolean, optionId: string) => {
    setQuestionMarked(true);
    setCurrentOptionId(optionId);
    setDisabled(true);
    setIsDisabled(true);
    if (isCorrect) {
      setAmountCorrect(amountCorrect + 1);
    };
  };

  return (
    <Card className="p-2 space-y-4 min-h-96">
      <CardTitle className="text-sm">{questionText}</CardTitle>

      <div className="space-y-2">
        {options.map((option) => (
          <div
            onClick={() => !isDisabled && handleResponse(option.isCorrect, option.id)}
            key={option.id}
            className={cn(
              "border p-1 rounded-md text-md transition duration-300 ease-in-out",
              isDisabled ? "cursor-auto" : "cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-200/50",
              questionMarked && currentOptionId === option.id
                ? option.isCorrect
                  ? "bg-green-500/50 hover:bg-green-500/80"
                  : "bg-red-500/50 hover:bg-red-500/80"
                : ""
            )}
          >
            <p className={cn(option.isCorrect === true ? "text-vermelho-vinho" : "")}>{option.text}</p>
          </div>
        ))}
      </div>

    </Card>
  );
};

