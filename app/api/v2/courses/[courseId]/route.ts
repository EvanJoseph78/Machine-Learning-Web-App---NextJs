import { getCourseController } from "@/controllers/courseController";
import { responseError } from "@/controllers/errorController";
import { NextRequest, NextResponse } from "next/server";

/**
 * Função GET para buscar um curso pelo seu ID.
 *
 * Essa função é responsável por capturar a requisição HTTP para um curso específico,
 * chamar o controlador de cursos e retornar uma resposta JSON com o curso encontrado ou
 * uma mensagem de erro apropriada, caso não consiga encontrar o curso ou ocorra um erro
 * inesperado.
 *
 * A função também lida com exceções geradas pela função de controle e retorna uma resposta
 * com o código de status HTTP adequado, de acordo com o tipo de erro.
 *
 * @param {NextRequest} req - Objeto da requisição HTTP, que pode conter parâmetros de consulta, cabeçalhos, etc.
 * @param {object} params - Parâmetros da URL contendo o `courseId`, que é o identificador único do curso.
 * @param {string} params.courseId - O identificador único do curso a ser recuperado.
 *
 * @returns {Promise<NextResponse>} - Retorna uma resposta HTTP com os dados do curso encontrado ou uma mensagem de erro.
 *
 * @throws {Error} - Caso haja falha ao buscar o curso ou erro inesperado, lança um erro.
 *
 * @example
 * const response = await GET(req, { params: { courseId: "123" } });
 * console.log(response);
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string } }
): Promise<NextResponse> {
  try {
    // Chama o controlador para buscar o curso pelo ID
    return await getCourseController(params.courseId);
  } catch (error) {
    // Verifica se o erro é uma instância da classe Error (erro tradicional do JavaScript)
    if (error instanceof Error) {
      // Caso seja, chama a função de tratamento de erro passando detalhes relevantes
      return responseError(
        error.message, // Mensagem de erro gerada
        "app/api/v2/users/[userId]/subscribe-course/[courseId]/route.ts", // Caminho do arquivo onde ocorreu o erro
        `${error.stack}` // Stack trace do erro, útil para depuração
      );
    }

    // Caso o erro não seja uma instância de Error, retorna uma resposta de erro genérico
    return new NextResponse("Erro interno", { status: 500 });
  }
}
