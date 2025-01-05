// errorController.ts
import { logError } from "@/services/logError";
import { errorMessages } from "@/utils/errorMessages"; // Mensagens de erro centralizadas
import { NextResponse } from "next/server";

/**
 * Captura, processa e retorna uma resposta apropriada para erros encontrados em endpoints da aplicação.
 * Também registra os detalhes do erro para fins de depuração e auditoria.
 *
 * @param {any} error - O erro capturado durante a execução. Idealmente, deve ser uma instância de `Error`.
 * @param {string} [path] - (Opcional) Caminho do arquivo ou contexto onde o erro ocorreu.
 * @param {string} [endpoint] - (Opcional) Endpoint associado à requisição onde o erro foi gerado.
 * @param {string} [userId] - (Opcional) Identificador do usuário, útil para rastrear o erro em relação a um usuário específico.
 * @returns {Promise<NextResponse>} Resposta apropriada com mensagem de erro e status HTTP correspondente.
 *
 * @example
 * // Uso em um endpoint
 * import { throwErrorMessage } from './errorHandler';
 *
 * export async function POST(req: NextRequest): Promise<NextResponse> {
 *   try {
 *     const body = await req.json();
 *
 *     if (!body.categoryId || !body.courseTitle) {
 *       throw new Error("categoryId e courseTitle são obrigatórios.");
 *     }
 *
 *     const course = await createCourse(body.courseTitle);
 *     return NextResponse.json(course, { status: 201 });
 *   } catch (error) {
 *     return await throwErrorMessage(error, "api/courses", "/courses", "user123");
 *   }
 * }
 *
 * @example
 * // Exemplo de resposta para um erro de ID malformado
 * {
 *   "messageError": "Malformed ObjectID"
 * }
 * // Código de status HTTP: 400
 */
export const throwErrorMessage = async (
  error: any, // Espera um erro específico, mas pode ser ajustado para aceitar outros tipos
  path?: string,
  endpoint?: string,
  userId?: string
): Promise<NextResponse> => {
  const errorMessage =
    error instanceof Error ? error.message : errorMessages.UNKNOWN_ERROR;
  const { statusCode, messageError } = getStatusDetails(error.message);

  console.log("========================================");
  console.log("ERROR: " + errorMessage);
  console.log("========================================");

  await logError(errorMessage, path, error.stack, endpoint, userId, statusCode);

  return new NextResponse(
    JSON.stringify({
      messageError, // Mensagem de erro correspondente ao tipo
    }),
    { status: statusCode } // Status adequado para o erro
  );
};

/**
 * Retorna o código de status HTTP e a mensagem de erro correspondente para uma mensagem de erro fornecida.
 *
 * @param {string} messageError - A mensagem de erro capturada.
 * @returns {{ statusCode: number; messageError: string }}
 * Um objeto contendo o código de status HTTP (`statusCode`) e a mensagem de erro (`messageError`) associada.
 *
 * @example
 * // Mensagem de erro para título do curso ausente
 * getStatusDetails("Course title is required");
 * // Retorno:
 * // {
 * //   statusCode: 400,
 * //   messageError: "Course title is required"
 * // }
 *
 * @example
 * // Mensagem de erro para ID malformado
 * getStatusDetails("Inconsistent column data: Malformed ObjectID");
 * // Retorno:
 * // {
 * //   statusCode: 400,
 * //   messageError: "Malformed ObjectID"
 * // }
 */

const getStatusDetails = (
  messageError: string
): { statusCode: number; messageError: string } => {
  switch (true) {
    case messageError.includes(errorMessages.COURSE_TITLE_REQUIRED):
      return {
        statusCode: 400,
        messageError: errorMessages.COURSE_TITLE_REQUIRED,
      };

    case messageError.includes("Malformed ObjectID"):
      return {
        statusCode: 400,
        messageError: errorMessages.MALFORMED_OBJECT_ID_ERROR,
      };

    case messageError.includes(errorMessages.USER_NOT_FOUND):
      return {
        statusCode: 404,
        messageError: errorMessages.USER_NOT_FOUND,
      };

    case messageError.includes(errorMessages.USERS_NOT_FOUND):
      return {
        statusCode: 404,
        messageError: errorMessages.USERS_NOT_FOUND,
      };

    case messageError.includes(errorMessages.COURSE_NOT_FOUND):
      return {
        statusCode: 404,
        messageError: errorMessages.COURSE_NOT_FOUND,
      };

    case messageError.includes(errorMessages.USER_ALREADY_EXISTS):
      return {
        statusCode: 409,
        messageError: errorMessages.USER_ALREADY_EXISTS,
      };

    case messageError.includes(errorMessages.USER_ALREADY_SUBSCRIBED):
      return {
        statusCode: 409,
        messageError: errorMessages.USER_ALREADY_SUBSCRIBED,
      };

    case messageError.includes(errorMessages.SUBSCRIPTION_ERROR):
      return {
        statusCode: 409,
        messageError: errorMessages.SUBSCRIPTION_ERROR,
      };

    case messageError.includes(errorMessages.MODULE_NUMBER_CONFLICT):
      return {
        statusCode: 409,
        messageError: errorMessages.MODULE_NUMBER_CONFLICT,
      };

    case messageError.includes(errorMessages.DATABASE_ERROR):
      return {
        statusCode: 500,
        messageError: errorMessages.DATABASE_ERROR,
      };

    case messageError.includes(errorMessages.INTERNAL_SERVER_ERROR):
      return {
        statusCode: 500,
        messageError: errorMessages.INTERNAL_SERVER_ERROR,
      };

    default:
      return {
        statusCode: 500,
        messageError: errorMessages.UNKNOWN_ERROR,
      };
  }
};
