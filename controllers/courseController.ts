import { getAllCourses, getCourse } from "@/services/courseService";
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

/**
 * Controlador responsável por buscar um curso pelo ID e retornar uma resposta apropriada.
 *
 * Esta função é usada para fazer a interface entre a lógica de negócios e a resposta HTTP.
 * Ela chama a função `getCourse` para recuperar os dados de um curso, e, se o curso for encontrado,
 * retorna uma resposta JSON com o status 200. Caso ocorra um erro, retorna uma resposta de erro com
 * o status adequado.
 *
 * @param {string} courseId - O identificador único do curso.
 * @returns {Promise<NextResponse>} - Retorna uma resposta com o curso encontrado ou erro.
 *
 * @throws {Error} - Lança um erro em caso de falha ao recuperar o curso ou erros inesperados.
 *
 * @example
 * try {
 *   const response = await getCourseController("123");
 *   console.log(response);
 * } catch (error) {
 *   console.error(error.message);
 * }
 */
export const getCourseController = async (
  courseId: string
): Promise<NextResponse> => {
  try {
    // Chama a função getCourse para buscar o curso
    const course = await getCourse(courseId);

    // Verifica se o curso foi encontrado
    if (!course) {
      throw new Error(errorMessages.NOT_FOUND); // Lança erro se o curso não existir
    }

    // Retorna a resposta com o curso encontrado
    return NextResponse.json({ course }, { status: 200 });
  } catch (error) {
    // Lida com erros e retorna a resposta de erro apropriada
    throw new Error(
      `${
        error instanceof Error
          ? error.message
          : `${errorMessages.UNKNOWN_ERROR}`
      }`
    );
  }
};
