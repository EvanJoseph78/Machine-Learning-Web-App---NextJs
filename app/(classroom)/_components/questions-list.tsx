"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { ProgressBar } from "./progress-bar"
import { useEffect, useState } from "react"
import { Questions } from "@prisma/client"
import { QuestionItemProvider, useQuestionItem } from "@/components/providers/questions-provider"
import axios from "axios"
import { QuestionCard } from "./question-card"
import { Buda } from "next/font/google"
import toast from "react-hot-toast"
import CircularProgressBar from "@/components/circular-progress-bar"

interface QuestionsListProps {
  courseId: string
}

export function QuestionsList({ courseId }: QuestionsListProps) {

  const {
    questionsList,
    setQuestionsList,
    currentQuestionNumber,
    setCurrentQuestionNumber,
    isDisabled,
    setIsDisabled,
    isFinished,
    setIsFinished,
    percentageCorrect
  } = useQuestionItem();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLastQuestion, setIsLastQuestion] = useState<boolean>(false);


  const fetchQuestionsList = async () => {
    try {
      const response = await axios.get(`/api/courses/${courseId}/questions`);
      setQuestionsList(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("error");
    }
  }

  useEffect(() => {
    fetchQuestionsList();
  }, [])

  const handleQuestionChange = () => {
    const nextQuestionNumber = currentQuestionNumber + 1;

    if (nextQuestionNumber >= questionsList.length) {
      setCurrentQuestionNumber(0);
    } else {
      setCurrentQuestionNumber(nextQuestionNumber);
    }

    if (nextQuestionNumber === questionsList.length - 1) {
      setIsLastQuestion(true);
    }

    setIsDisabled(false);
  }

  const handleFinishQuestions = () => {
    setIsFinished(true);
    setCurrentQuestionNumber(currentQuestionNumber + 1);
    toast.success("Questionário finalizado!")
  }

  const handleGetCertificate = () => {
    toast.success("obtendo certificado...")
  }

  const [percentage, setPercentage] = useState(10);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(100, Math.max(0, Number(e.target.value)));
    setPercentage(value);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default">Iniciar questionário</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <ProgressBar></ProgressBar>

          {isLoading ? (
            <div>Carregando...</div>
          ) : questionsList.length === 0 ? (
            <div>Sem questões ainda</div> // Conteúdo a ser exibido quando a lista de questões estiver vazia
          ) : isFinished ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '50px' }}>
              <CircularProgressBar percentage={percentageCorrect} />
              <h1>Finalizado</h1>
            </div>
          ) : (
            <QuestionCard
              questionText={questionsList[currentQuestionNumber].text}
              options={questionsList[currentQuestionNumber].options}
            />
          )}

        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Fechar</AlertDialogCancel>

          {isLastQuestion && !isFinished ? (
            <Button onClick={() => handleFinishQuestions()} disabled={!isDisabled}>Finalizar</Button>
          ) : isFinished ? (
            <Button onClick={() => handleGetCertificate()} disabled={!isDisabled}>Obter certificado</Button>
          ) : (
            <Button onClick={() => handleQuestionChange()} disabled={!isDisabled}>Próxima</Button>
          )}

        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog >
  )
}















//
// const questoes = [
//   {
//     "enunciado": "1. Qual das opções a seguir é a forma correta de importar a biblioteca pandas no Python?",
//     "opcoes": [
//       {
//         "texto": "a) import pandas as pd",
//         "correta": true,
//         "_id": "664a18a66f1a93eef679d5c0"
//       },
//       {
//         "texto": "b) import panda as np",
//         "correta": false,
//         "_id": "664a18a66f1a93eef679d5c1"
//       },
//       {
//         "texto": "c) from pandas import *",
//         "correta": false,
//         "_id": "664a18a66f1a93eef679d5c2"
//       },
//       {
//         "texto": "d) from pandas import pandas as pd",
//         "correta": false,
//         "_id": "664a18a66f1a93eef679d5c3"
//       }
//     ],
//     "_id": "664a18a66f1a93eef679d5bf"
//   },
//   {
//     "enunciado": "2. Qual das opções a seguir define melhor um dataset?",
//     "opcoes": [
//       {
//         "texto": "a) Um algoritmo de aprendizado de máquina.",
//         "correta": false,
//         "_id": "664a18f96f1a93eef679d5f6"
//       },
//       {
//         "texto": "b) Uma coleção estruturada de dados utilizada para análise ou treinamento de modelos.",
//         "correta": true,
//         "_id": "664a18f96f1a93eef679d5f7"
//       },
//       {
//         "texto": "c) from pandas import *",
//         "correta": false,
//         "_id": "664a18f96f1a93eef679d5f8"
//       },
//       {
//         "texto": "d) Um conjunto de instruções para executar uma tarefa específica.",
//         "correta": false,
//         "_id": "664a18f96f1a93eef679d5f9"
//       }
//     ],
//     "_id": "664a18f96f1a93eef679d5f5"
//   },
//   {
//     "enunciado": "3. Qual alternativa representa corretamente a estrutura da árvore de decisão?",
//     "opcoes": [
//       {
//         "texto": "a) A raiz da árvore representa a decisão final e as folhas representam as condições que levaram a essa decisão.",
//         "correta": false,
//         "_id": "664a19546f1a93eef679d631"
//       },
//       {
//         "texto": "b) A raiz da árvore representa a condição inicial e as ramificações representam as possíveis decisões a serem tomadas.",
//         "correta": true,
//         "_id": "664a19546f1a93eef679d632"
//       },
//       {
//         "texto": "c) A raiz da árvore representa uma condição intermediária e as ramificações representam as possíveis subcondições a serem avaliadas.",
//         "correta": false,
//         "_id": "664a19546f1a93eef679d633"
//       },
//       {
//         "texto": "d) A raiz da árvore representa uma decisão intermediária e as ramificações representam as possíveis ações a serem tomadas.",
//         "correta": false,
//         "_id": "664a19546f1a93eef679d634"
//       }
//     ],
//     "_id": "664a19546f1a93eef679d630"
//   },
//   {
//     "enunciado": "4. Em qual tarefa o algoritmo de K-means é usado?",
//     "opcoes": [
//       {
//         "texto": "a) Classificação de Imagens.",
//         "correta": false,
//         "_id": "664a19b66f1a93eef679d671"
//       },
//       {
//         "texto": "b) Previsão de séries temporais",
//         "correta": false,
//         "_id": "664a19b66f1a93eef679d672"
//       },
//       {
//         "texto": "c) Redução de dimensionalidade.",
//         "correta": false,
//         "_id": "664a19b66f1a93eef679d673"
//       },
//       {
//         "texto": "d) Clusterização.",
//         "correta": true,
//         "_id": "664a19b66f1a93eef679d674"
//       }
//     ],
//     "_id": "664a19b66f1a93eef679d670"
//   },
//   {
//     "enunciado": "5. O que é Overfitting em aprendizado de máquina??",
//     "opcoes": [
//       {
//         "texto": "a) Um modelo que se ajusta muito bem aos dados de treinamento e é capaz de generalizar para novos dados.",
//         "correta": false,
//         "_id": "664a19f66f1a93eef679d6b6"
//       },
//       {
//         "texto": "b) Um modelo que não se ajusta bem aos dados de treinamento, mas é capaz de generalizar para novos dados.",
//         "correta": false,
//         "_id": "664a19f66f1a93eef679d6b7"
//       },
//       {
//         "texto": "c) Um modelo que não se ajusta bem aos dados de treinamento e não é capaz de generalizar para novos dados.",
//         "correta": false,
//         "_id": "664a19f66f1a93eef679d6b8"
//       },
//       {
//         "texto": "d) Um modelo que se ajusta muito bem aos dados de treinamento, mas não é capaz de generalizar para novos dados.",
//         "correta": true,
//         "_id": "664a19f66f1a93eef679d6b9"
//       }
//     ],
//     "_id": "664a19f66f1a93eef679d6b5"
//   },
//   {
//     "enunciado": "6. Qual o exemplo de visão computacional que os dados das imagens/vídeos são interpretados como sim e não (0 ou 1)?",
//     "opcoes": [
//       {
//         "texto": "a) Visão como proposta",
//         "correta": false,
//         "_id": "664a1a366f1a93eef679d700"
//       },
//       {
//         "texto": "b) Visão como “IO”",
//         "correta": true,
//         "_id": "664a1a366f1a93eef679d701"
//       },
//       {
//         "texto": "c) Visão como biometria",
//         "correta": false,
//         "_id": "664a1a366f1a93eef679d702"
//       },
//       {
//         "texto": "d) Visão como detecção",
//         "correta": false,
//         "_id": "664a1a366f1a93eef679d703"
//       }
//     ],
//     "_id": "664a1a366f1a93eef679d6ff"
//   },
//   {
//     "enunciado": "9. Julgue a afirmação: Uma vantagem do MobileNet é que ele já foi treinado em grandes conjuntos de dados e tem a capacidade de reconhecer uma ampla variedade de objetos e categorias do nosso mundo. Aproveitar esse conhecimento prévio é uma estratégia inteligente para desenvolver uma aplicação personalizada. Podemos treinar o MobileNet com nossos próprios dados, para que ele seja capaz de classificar as nossas coisas específicas.",
//     "opcoes": [
//       {
//         "texto": "Certo",
//         "correta": true,
//         "_id": "664a1a6a6f1a93eef679d74f"
//       },
//       {
//         "texto": "Errado",
//         "correta": false,
//         "_id": "664a1a6a6f1a93eef679d750"
//       }
//     ],
//     "_id": "664a1a6a6f1a93eef679d74e"
//   }
// ]
//
