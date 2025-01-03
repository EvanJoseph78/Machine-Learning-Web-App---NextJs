// errorController.ts
import { logError } from "@/services/logError";
import { errorMessages } from "@/utils/errorMessages"; // Mensagens de erro centralizadas
import { NextResponse } from "next/server";

/**
 * Função centralizada para retornar uma resposta de erro padronizada.
 *
 * @param {string} errorType - Tipo do erro que ocorreu.
 * @returns {NextResponse} Resposta com a mensagem de erro e o status adequado.
 */
export const responseError = async (
  errorType: string,
  path: string,
  stackTrace: any,
  endpoint?: string | undefined,
  userId?: string | undefined
): Promise<NextResponse> => {
  let message = "";
  let statusCode = 500; // Default para erros internos do servidor

  // Verifica o tipo de erro e ajusta a resposta
  switch (errorType) {
    // erros de user
    case `${errorMessages.USER_NOT_FOUND}`:
      message = errorMessages.USER_NOT_FOUND;
      statusCode = 404;
      break;
    case `${errorMessages.USER_ALREADY_EXISTS}`:
      message = errorMessages.USER_ALREADY_EXISTS;
      statusCode = 409;
      break;
    case `${errorMessages.USERS_NOT_FOUND}`:
      message = errorMessages.USERS_NOT_FOUND;
      statusCode = 404;
      break;
    case `${errorMessages.SUBSCRIPTION_ERROR}`:
      message = errorMessages.SUBSCRIPTION_ERROR;
      statusCode = 409; // Conflito (já está inscrito)
      break;

    // erros em cursos
    case `${errorMessages.COURSE_NOT_FOUND}`:
      message = errorMessages.COURSE_NOT_FOUND;
      statusCode = 409; // Conflito (já está inscrito)
      break;

    // erros genéricos
    case `${errorMessages.DATABASE_ERROR}`:
      message = errorMessages.DATABASE_ERROR;
      statusCode = 500; // Erro interno de banco de dados
      break;
    case `${errorMessages.NOT_FOUND}`:
      message = errorMessages.NOT_FOUND;
      statusCode = 404; // Não encontrado
      break;
    case `${errorMessages.INTERNAL_SERVER_ERROR}`:
    default:
      message = errorMessages.INTERNAL_SERVER_ERROR;
      statusCode = 500; // Erro genérico
      break;
  }

  // Loga o erro no banco de dados
  await logError(message, path, stackTrace, endpoint, userId, statusCode);

  // Retorna a resposta de erro
  return new NextResponse(
    JSON.stringify({
      message, // Mensagem de erro correspondente ao tipo
    }),
    { status: statusCode } // Status adequado para o erro
  );
};
