import { responseError } from "@/controllers/errorController";
import { getAllCourses } from "@/services/courseService";
import { NextResponse } from "next/server";

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
    // Tratamento de erro específico para instâncias da classe Error
    if (error instanceof Error) {
      return responseError(
        error.message, // Mensagem do erro
        "app/api/v2/users/route.ts", // Caminho do arquivo onde ocorreu o erro
        `${error.stack}` // Stack trace para depuração
      );
    }

    // Tratamento genérico para erros desconhecidos
    return new NextResponse("Erro interno", { status: 500 });
  }
}
