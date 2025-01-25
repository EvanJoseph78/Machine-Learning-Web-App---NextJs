import { db } from "@/lib/db";
import { errorMessages } from "@/utils/errorMessages";
import { Course, Module } from "@prisma/client";

/**
 * Cria um novo curso com base no título e na categoria fornecidos.
 *
 * @param {string} courseTitle - Título do curso a ser criado.
 * @returns {Promise<Course>} Objeto do curso criado.
 * @throws {Error} Lança erro caso a categoria não exista ou ocorra outro problema.
 */
export const createCourse = async (courseTitle: string): Promise<Course> => {
  try {
    // Cria o curso no banco de dados
    const course: Course = await db.course.create({
      data: {
        title: courseTitle,
      },
    });

    console.log(`Curso criado com sucesso: ${JSON.stringify(course)}`);

    return course;
  } catch (error) {
    // Trata erros específicos ou genéricos e os lança para o chamador
    throw new Error(
      error instanceof Error ? error.message : errorMessages.UNKNOWN_ERROR
    );
  }
};

export const createModule = async (
  courseId: string,
  values: any
): Promise<Module> => {
  try {
    const module: Module = await db.module.create({
      data: {
        courseId,
        ...values,
      },
    });
    return module;
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message.includes("Unique constraint failed on the constraint")
      ) {
        throw new Error(errorMessages.MODULE_NUMBER_CONFLICT);
      }
    }

    throw new Error(
      `${error instanceof Error
        ? error.message
        : `${errorMessages.UNKNOWN_ERROR}`
      }`
    );
  }
};

/**
 * Cria uma nova lição associada a um curso específico.
 *
 * @param courseId - O ID do curso ao qual a lição será associada.
 * @param values - Um objeto contendo os valores necessários para criar a lição, exceto o ID.
 * @returns A lição recém-criada como um objeto.
 * @throws Lança um erro se o curso não for encontrado ou se houver falhas durante a criação da lição.
 */
export const createLesson = async (courseId: string, values: any) => {
  try {
    if (!(await checkExistentCourse(courseId))) {
      console.log("não encontrado");
      throw new Error(errorMessages.COURSE_NOT_FOUND);
    }

    const lastLessonNumber: number = await getLastLessonNumber(courseId);

    const newLesson = await db.lesson.create({
      data: { courseId, number: lastLessonNumber, ...values },
    });

    return newLesson;
  } catch (error) {
    // Trata o erro e lança a mensagem apropriada
    const errorMessage =
      error instanceof Error ? error.message : errorMessages.UNKNOWN_ERROR;
    throw new Error(errorMessage);
  }
};

export const createQuestion = async () => { };
export const createOption = async () => { };

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
    return await db.course.findMany({ include: { Tag: true } });
  } catch (error) {
    throw new Error(
      `${error instanceof Error
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
 * @returns {Promise<Subscription>} - Retorna os dados dos usuários inscritos no curso, se encontrados.
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
    const subscribedUsers = await db.subscription.findMany({
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

/**
 * Busca todas as lições de um curso específico.
 *
 * @param courseId - O ID do curso cujas lições devem ser recuperadas.
 * @returns Uma lista de lições relacionadas ao curso fornecido.
 * @throws Lança um erro se o curso não for encontrado ou ocorrer uma falha no processo.
 */
export const getAllLessons = async (courseId: string) => {
  try {
    // Verifica se o ID do curso é válido e se o curso existe
    if (!courseId || typeof courseId !== "string") {
      throw new Error(
        "O parâmetro 'courseId' é obrigatório e deve ser uma string válida."
      );
    }

    // Checa a existência do curso
    const courseExists = await checkExistentCourse(courseId);
    if (!courseExists) {
      throw new Error(errorMessages.COURSE_NOT_FOUND);
    }

    // Busca todas as lições relacionadas ao curso
    const lessons = await db.lesson.findMany({
      where: { courseId: courseId },
    });

    return lessons;
  } catch (error) {
    // Lança o erro com a mensagem apropriada
    const errorMessage =
      error instanceof Error ? error.message : errorMessages.UNKNOWN_ERROR;
    throw new Error(errorMessage);
  }
};
// update

/**
 * Atualiza os detalhes de um curso existente no banco de dados.
 *
 * @param {string} courseId - ID único do curso que será atualizado.
 * @param {object} values - Objeto contendo as propriedades a serem atualizadas no curso.
 * @returns {Promise<Course>} - O curso atualizado.
 * @throws {Error} - Lança erro caso o curso não seja encontrado ou ocorra algum problema na atualização.
 */
export const updateCourse = async (
  courseId: string,
  values: Record<string, any>
): Promise<Course> => {
  try {
    // Verifica se o curso existe no banco de dados
    const courseExists = await checkExistentCourse(courseId);
    if (!courseExists) {
      throw new Error(errorMessages.COURSE_NOT_FOUND); // Lança erro caso o curso não exista
    }

    // Atualiza o curso com os valores fornecidos
    const updatedCourse = await db.course.update({
      where: { id: courseId },
      data: {
        ...values, // Atualiza com os valores fornecidos dinamicamente
      },
    });

    return updatedCourse;
  } catch (error) {
    console.error(`Erro ao atualizar o curso: ${error}`);
    // Lança erro específico ou genérico
    throw new Error(
      error instanceof Error ? error.message : errorMessages.UNKNOWN_ERROR
    );
  }
};

export const updateModule = async () => { };

/**
 * Atualiza os dados de uma lição existente no banco de dados.
 *
 * @param lessonId - O ID da lição a ser atualizada.
 * @param values - Um objeto contendo os campos a serem atualizados. Exemplo:
 * `{ title: string, number: number, moduleId: string, ... }`.
 *
 * @returns
 * - O objeto da lição atualizado, caso a operação seja bem-sucedida.
 *
 * @throws
 * - Lança um erro com a mensagem apropriada nos seguintes casos:
 *   - A lição não existe no banco de dados (`LESSON_NOT_FOUND`).
 *   - O módulo associado não existe no banco de dados (`MODULE_NOT_FOUND`).
 *   - Um erro desconhecido ocorreu durante a operação (`UNKNOWN_ERROR`).
 */
export const updateLesson = async (lessonId: string, values: any) => {
  try {
    // Verifica se a lição existe
    if (!(await checkExistentlesson(lessonId))) {
      throw new Error(errorMessages.LESSON_NOT_FOUND);
    }

    // Verifica se o módulo associado existe, se `moduleId` estiver presente nos valores
    if (values.moduleId && !(await checkExistentModule(values.moduleId))) {
      throw new Error(errorMessages.MODULE_NOT_FOUND);
    }

    // Atualiza a lição no banco de dados
    const updatedLesson = db.lesson.update({
      where: { id: lessonId },
      data: { ...values }, // Aplica as atualizações passadas no objeto `values`
    });

    return updatedLesson; // Retorna a lição atualizada
  } catch (error) {
    // Lança o erro apropriado
    throw new Error(
      `${error instanceof Error ? error.message : errorMessages.UNKNOWN_ERROR}`
    );
  }
};

// delete
export const deleteCourse = async () => { };
export const deleteModuele = async () => { };
export const deleteLesson = async () => { };
export const deleteQuestion = async () => { };

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

export const checkExistentModule = async (moduleId: string) => {
  try {
    const module = await db.module.findUnique({ where: { id: moduleId } });
    return module !== null;
  } catch (error) {
    throw new Error(
      `${error instanceof Error ? error.message : errorMessages.UNKNOWN_ERROR}`
    );
  }
};

export const checkExistentlesson = async (lessonId: string) => {
  try {
    const lesson = await db.lesson.findUnique({ where: { id: lessonId } });
    return lesson !== null;
  } catch (error) {
    throw new Error(
      `${error instanceof Error ? error.message : errorMessages.UNKNOWN_ERROR}`
    );
  }
};

/**
 * Obtém o próximo número disponível para uma lição em um curso específico.
 * Responsável por deixar automático o número da aula
 *
 * @param courseId - O ID do curso para o qual o número da próxima lição será calculado.
 * @returns O próximo número disponível para uma lição no curso (incrementa o maior número existente).
 * @throws Lança um erro caso ocorra uma falha durante a execução da operação.
 */
export const getLastLessonNumber = async (
  courseId: string
): Promise<number> => {
  try {
    // Obtém todas as lições do curso
    const lessons = await db.lesson.findMany({ where: { courseId } });

    // Caso não existam lições, retorna 1 como o próximo número
    if (!lessons || lessons.length === 0) {
      return 1;
    }

    // Calcula o maior número de lição existente
    const lastLessonNumber = lessons.reduce(
      (max, lesson) => (lesson.number > max ? lesson.number : max),
      1
    );

    // Retorna o próximo número incrementado
    return lastLessonNumber + 1;
  } catch (error) {
    // Trata e lança um erro apropriado
    const errorMessage =
      error instanceof Error ? error.message : errorMessages.UNKNOWN_ERROR;
    throw new Error(errorMessage);
  }
};
