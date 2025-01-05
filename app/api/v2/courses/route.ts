import { throwErrorMessage } from "@/controllers/errorController";
import { createCourse, getAllCourses } from "@/services/courseService";
import { NextRequest, NextResponse } from "next/server";

/**
 * Manipulador do método GET para a rota da API.
 *
 * @returns {Promise<NextResponse>} Uma resposta HTTP contendo os cursos no caso de sucesso
 *                                  ou uma mensagem de erro no caso de falha.
 *
 * @throws {NextResponse} Retorna uma resposta de erro com status apropriado se ocorrer um problema.
 *
 * @description
 * Esta função é o manipulador para requisições GET em uma rota da API Next.js.
 * Ele chama o controlador `getAllCoursesController` para buscar os dados dos cursos e retorna o resultado.
 * Em caso de falha, utiliza a função `responseError` para centralizar o tratamento de erros e retorna uma resposta apropriada.
 *
 * @example
 * // Chamando a rota através de um cliente HTTP
 * fetch('/api/v2/users')
 *   .then(response => response.json())
 *   .then(data => console.log(data))
 *   .catch(error => console.error("Erro:", error));
 */
export async function GET(): Promise<NextResponse> {
  try {
    // Tenta buscar os cursos usando o controlador centralizado
    const courses = await getAllCourses();

    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    return throwErrorMessage(error, "app/api/v2/users/route.ts");
  }
}

/**
 * Lida com a criação de cursos através de uma requisição HTTP POST.
 *
 * @param {NextRequest} req - Objeto da requisição HTTP contendo os dados do curso no corpo.
 * @returns {Promise<NextResponse>} Resposta contendo os detalhes do curso criado ou mensagem de erro.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Processa o corpo da requisição
    const body = await req.json();

    // Valida os dados obrigatórios
    if (!body.courseTitle) {
      throw new Error("CourseTitle are needed.");
    }

    // Cria o curso utilizando os dados fornecidos
    const course = await createCourse(body.courseTitle);

    // Retorna o curso criado com status 201
    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    return throwErrorMessage(error, "app/api/v2/users/route.ts");
  }
}
