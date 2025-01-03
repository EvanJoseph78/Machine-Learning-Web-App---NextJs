import { db } from "@/lib/db";
import { errorMessages } from "@/utils/errorMessages";
import { Course, Subscripion } from "@prisma/client";

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
export const getAllCourses = async (): Promise<Array<Course>> => {
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

/**
 * Recupera os usuários inscritos em um curso específico.
 *
 * Essa função verifica se o curso existe e, caso ele exista, retorna os usuários que estão inscritos nele.
 * Caso contrário, retorna um erro indicando que o curso não foi encontrado.
 *
 * @param {string} courseId - O ID do curso para o qual os usuários inscritos devem ser recuperados.
 * @returns {Promise<Subscripion>} - Retorna os dados dos usuários inscritos no curso, se encontrados.
 * @throws {Error} - Lança um erro se o curso não existir ou se ocorrer um erro na consulta.
 */
export const getCourseSubscribedUsers = async (
  courseId: string
): Promise<Object | null> => {
  try {
    // Verifica se o curso já existe no banco de dados
    const courseExists = await checkExistentCourse(courseId);
    if (!courseExists) {
      throw new Error(errorMessages.COURSE_NOT_FOUND); // Retorna erro caso o curso não exista
    }

    // Consulta os usuários inscritos no curso
    const subscribedUsers = await db.subscripion.findMany({
      where: { courseId: courseId },
      include: { user: true, course: true },
    });

    // Organiza os dados no formato desejado
    const result = subscribedUsers.reduce((acc, subscription) => {
      const courseTitle = subscription.course.title; // Obtém o nome do curso

      // Se o curso já existir no acumulador, adiciona o usuário
      if (acc[courseTitle]) {
        acc[courseTitle].push({
          clerkId: subscription.courseId.toString(), // ou use outro identificador
          userFullName: subscription.user.fullName,
        });
      } else {
        // Caso o curso não exista ainda no acumulador, cria uma nova entrada
        acc[courseTitle] = [
          {
            clerkId: subscription.courseId.toString(),
            userFullName: subscription.user.fullName,
          },
        ];
      }

      return acc;
    }, {} as { [key: string]: { clerkId: string; userFullName: string }[] });

    return result;
  } catch (error) {
    // Lança erro específico ou genérico
    // console.log(error);
    throw new Error(
      error instanceof Error ? error.message : errorMessages.UNKNOWN_ERROR
    );
  }
};

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
