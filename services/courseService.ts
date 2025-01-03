import { db } from "@/lib/db";
import { errorMessages } from "@/utils/errorMessages";
import { Course } from "@prisma/client";

// create
export const createCourse = async () => {};
export const createModule = async () => {};
export const createLesson = async () => {};
export const createQuestion = async () => {};
export const createOption = async () => {};

// read

/**
 * Função para recuperar todos os cursos cadastrados no banco de dados.
 *
 * @returns {Promise<Array<Object>>} Uma lista de todos os cursos disponíveis no banco de dados.
 *
 * @throws {Error} Lança um erro se houver um problema ao buscar os dados do banco de dados.
 *                 O erro retornará a mensagem apropriada, se disponível, ou uma mensagem de erro genérica.
 *
 * @example
 * try {
 *   const courses = await getAllCourses();
 *   console.log(courses);
 * } catch (error) {
 *   console.error("Erro ao obter cursos:", error.message);
 * }
 *
 * @description
 * A função utiliza o método `findMany` do Prisma para buscar todos os registros na tabela `course`.
 * Em caso de erro uma exceção será lançada.
 */
export const getAllCourses = async (): Promise<Array<object>> => {
  try {
    return await db.course.findMany();
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
 * Recupera um curso pelo ID.
 *
 * Esta função verifica se o curso com o ID fornecido existe no banco de dados
 * e o retorna. Caso o curso não seja encontrado, uma mensagem de erro apropriada
 * é lançada.
 *
 * @param {string} courseId - O identificador único do curso.
 * @returns {Promise<Course | null>} - Retorna o curso encontrado ou `null` caso não exista.
 *
 * @throws {Error} - Lança um erro com mensagens apropriadas para:
 *   - Curso já existente.
 *   - Curso não encontrado.
 *   - Erros inesperados do banco de dados.
 *
 * @example
 * try {
 *   const course = await getCourse("123");
 *   console.log(course);
 * } catch (error) {
 *   console.error(error.message);
 * }
 */
export const getCourse = async (courseId: string): Promise<Course | null> => {
  try {
    // Verifica se o curso já existe no banco de dados
    const courseExists = await checkExistentCourse(courseId);
    if (!courseExists) {
      throw new Error(errorMessages.COURSE_NOT_FOUND); // Retorna erro caso o curso não exista
    }

    // Recupera o curso do banco de dados
    const course = await db.course.findUnique({ where: { id: courseId } });

    // Verifica se o curso foi recuperado corretamente
    if (!course) {
      throw new Error(errorMessages.NOT_FOUND);
    }

    return course;
  } catch (error) {
    // Lança erro específico ou genérico
    throw new Error(
      error instanceof Error ? error.message : errorMessages.UNKNOWN_ERROR
    );
  }
};

export const getCourseSubscribedUsers = async () => {};

// read

// update
export const updateCourse = async () => {};
export const updateModule = async () => {};
export const updateLesson = async () => {};

// delete
export const deleteCourse = async () => {};
export const deleteModuele = async () => {};
export const deleteLesson = async () => {};
export const deleteQuestion = async () => {};

// utility functions
/**
 * Verifica se um curso existe no banco de dados pelo ID.
 *
 * @param {string} courseId - O ID do curso a ser verificado.
 * @returns {Promise<boolean>} Retorna `true` se o curso existir, caso contrário, `false`.
 * @throws {Error} Caso ocorra algum problema na consulta ao banco de dados.
 */
export const checkExistentCourse = async (
  courseId: string
): Promise<boolean> => {
  const course = await db.course.findUnique({ where: { id: courseId } });
  return course !== null;
};
