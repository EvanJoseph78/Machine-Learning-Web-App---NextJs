import { getAllCourses } from "@/services/courseService";
import { errorMessages } from "@/utils/errorMessages";
import { NextResponse } from "next/server";

/**
 * Controlador responsável por buscar e retornar todos os cursos cadastrados.
 *
 * @returns {Promise<NextResponse>} Uma resposta HTTP contendo a lista de cursos e o status 200 em caso de sucesso.
 *                                  Em caso de erro, uma exceção é lançada com a mensagem apropriada.
 *
 * @throws {Error} Lança um erro se ocorrer um problema ao buscar os cursos,
 *                 retornando a mensagem de erro apropriada ou uma mensagem genérica.
 *
 * @example
 * try {
 *   const response = await getAllCoursesController();
 *   console.log(response); // Exibe a resposta JSON com a lista de cursos
 * } catch (error) {
 *   console.error("Erro ao buscar cursos:", error.message);
 * }
 *
 * @description
 * Esta função serve como um controlador no padrão MVC.
 * Ela utiliza a função `getAllCourses` para recuperar a lista de cursos do banco de dados e retorna uma resposta JSON no formato padrão Next.js.
 * Em caso de erro, a função lança uma exceção com a mensagem apropriada.
 */
export const getAllCoursesController = async (): Promise<NextResponse> => {
  try {
    const courses = await getAllCourses();
    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    throw new Error(
      `${
        error instanceof Error
          ? error.message
          : `${errorMessages.UNKNOWN_ERROR}`
      }`
    );
  }
};
