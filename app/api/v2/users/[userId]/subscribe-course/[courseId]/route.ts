import { responseError } from "@/controllers/errorController";
import { subscribeCourseController } from "@/controllers/userController";
import { logError } from "@/services/logError";
import { NextRequest, NextResponse } from "next/server";

/**
 * Função que gerencia a inscrição de um usuário em um curso.
 *
 * @param {Object} params - Parâmetros da requisição.
 * @param {string} params.userId - ID do usuário que deseja se inscrever no curso.
 * @param {string} params.courseId - ID do curso ao qual o usuário deseja se inscrever.
 * @param {NextRequest} req - Objeto de requisição que contém informações adicionais.
 * @returns {Promise<Response>} Resposta HTTP com status e dados da inscrição ou erro.
 *
 * @throws {Error} Se ocorrer um erro durante a inscrição no curso.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string; courseId: string } }
): Promise<Response> {
  try {
    // Chama o controlador de inscrição no curso com os parâmetros fornecidos
    const response = await subscribeCourseController(
      params.userId,
      params.courseId
    );

    if (response.status == 409) {
      // Loga o erro
      await logError(
        "Erro ao tentar realizar inscrição no curso",
        "app/api/v2/users/[userId]/subscribe-course/[courseId]/route.ts",
        `${response}`
      );
      return new NextResponse(
        JSON.stringify({
          message: "Usuário já está inscrito nesse curso",
        }),

        { status: 409 }
      );
    }
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    // Se o erro capturado for uma instância da classe Error, ou seja, um erro tradicional do JavaScript
    if (error instanceof Error) {
      // Chama a função 'responseError', passando a mensagem de erro, o caminho do arquivo onde o erro ocorreu,
      // e o stack trace do erro (detalhes de onde e como o erro ocorreu no código)
      return responseError(
        error.message, // Mensagem do erro gerado
        "app/api/v2/users/[userId]/subscribe-course/[courseId]/route.ts", // Caminho do arquivo onde ocorreu o erro
        `${error.stack}` // Stack trace do erro, que pode ajudar a depurar o problema
      );
    }

    // Caso o erro não seja uma instância de Error, ou seja, um erro genérico ou desconhecido,
    // retorna uma resposta com a mensagem "Erro interno" e o código de status 500 (Erro Interno do Servidor)
    return new NextResponse("Erro interno", { status: 500 });
  }
}
