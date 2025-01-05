import { throwErrorMessage } from "@/controllers/errorController";
import { getCourse, updateCourse } from "@/services/courseService";
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
    const course = await getCourse(params.courseId);

    return NextResponse.json({ course }, { status: 200 });
  } catch (error) {
    return throwErrorMessage(error, "app/api/v2/users/route.ts");
  }
}

/**
 * Função para atualizar um curso com base no ID fornecido.
 *
 * @param req - Objeto da requisição do Next.js contendo os dados para atualização.
 * @param params - Parâmetro contendo o ID do curso a ser atualizado.
 * @returns Retorna a resposta JSON com o curso atualizado ou o erro correspondente.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string } }
): Promise<NextResponse> {
  try {
    // Processa o corpo da requisição
    const values = await req.json();

    // Valida os dados obrigatórios
    if (
      !values ||
      typeof values !== "object" ||
      Object.keys(values).length === 0
    ) {
      return NextResponse.json(
        { message: "Os valores para atualização são obrigatórios." },
        { status: 400 }
      );
    }
    // Atualiza o curso no banco de dados
    const updatedCourse = await updateCourse(params.courseId, values);

    // Retorna o curso atualizado com status 200
    return NextResponse.json(updatedCourse, { status: 200 });
  } catch (error) {
    return throwErrorMessage(error, "app/api/v2/users/route.ts");
  }
}
