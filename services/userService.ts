import { db } from "@/lib/db"; // Instância de conexão do banco de dados
import { User } from "@prisma/client"; // Modelo de User do Prisma
import { logError } from "./logError";

/**
 * Obtém todos os usuários do banco de dados.
 *
 * @returns Lista de usuários.
 */
export const getAllUsers = async (): Promise<User[]> => {
  try {
    return await db.user.findMany();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users from the database.");
  }
};

/**
 * Cria um novo usuário no banco de dados.
 *
 * @param user Dados do usuário a ser criado.
 * @returns O usuário criado.
 */
export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  try {
    return await db.user.create({ data: user });
  } catch (error) {
    console.error("Error creating user:", error);
    await logError(
      "Erro na criação de usuário",
      "/services/userService.ts",
      error instanceof Error ? error.message : "Unknown error"
    );
    throw new Error(
      `Failed to create user. Error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

/**
 * Atualiza os dados de um usuário com base no `clerkId`.
 *
 * @param clerkId - Identificador único do usuário.
 * @param updates - Objeto contendo os campos a serem atualizados.
 * @returns O usuário atualizado.
 * @throws Erro caso a atualização falhe.
 */
export const updateUser = async (
  userId: string,
  updates: Partial<{ fullName: string }>
) => {
  try {
    // Verifica se o usuário existe antes de tentar atualizá-lo
    const existingUser = await db.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new Error(`User with clerkId ${userId} not found.`);
    }

    // Atualiza os campos fornecidos no objeto `updates`
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: updates,
    });

    console.log("Usuário atualizado com sucesso:", updatedUser);
    return updatedUser;
  } catch (error) {
    // console.error("Error updating user:", error);

    // Loga o erro no console e no banco de dados
    await logError(
      "Erro ao atualizar usuário",
      "services/userService.ts",
      error instanceof Error ? error.message : "Unknown error"
    );

    // Lança uma exceção para que o erro possa ser tratado no nível do controlador
    throw new Error(
      `Failed to update user. Error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
/**
 * Função responsável por inscrever um usuário em um curso.
 *
 * A função verifica se o usuário já está inscrito no curso. Caso o usuário já esteja inscrito, retorna uma mensagem indicando isso. Caso contrário, a função cria uma nova inscrição, definindo o horário de início da inscrição e outros parâmetros padrão.
 * Em caso de erro, a função lança uma exceção com uma mensagem de erro apropriada.
 *
 * @param user {User} - O objeto `user` contém as informações do usuário a ser inscrito no curso.
 * @param courseId {string} - O ID do curso em que o usuário deseja se inscrever.
 *
 * @returns {Promise<Object|string>} - Retorna a inscrição recém-criada, ou uma mensagem indicando que o usuário já está inscrito.
 *
 * @throws {Error} - Lança um erro caso haja falha durante a inscrição do usuário no curso.
 *
 * @example
 * const user = { id: '123', fullName: 'John Doe' };
 * const courseId = 'course-001';
 *
 * const result = await subscribeCourse(user, courseId);
 * if (typeof result === 'string') {
 *   console.log(result); // Exemplo de mensagem: "User is already subscribed to this course."
 * } else {
 *   console.log(result); // Exemplo de retorno: A inscrição criada
 * }
 */
export const subscribeCourse = async (userId: string, courseId: string) => {
  try {
    // Verifica se o usuário já está inscrito no curso
    const subscription = await db.subscribedCourse.findFirst({
      where: {
        userId: userId,
        courseId: courseId, // Adiciona a verificação para o curso específico
      },
    });

    // Se o usuário já estiver inscrito, retorna uma mensagem
    if (subscription) {
      return "User is already subscribed to this course.";
    }

    // Caso o usuário não esteja inscrito, cria uma nova inscrição
    const newSubscription = await db.subscribedCourse.create({
      data: {
        userId: userId,
        courseId: courseId,
        finishedAt: "",
        startedAt: new Date(),
        currentLessonId: "",
      },
    });

    return newSubscription; // Retorna a inscrição criada
  } catch (error) {
    console.error("Error subscribing user to course:", error);

    // Lança uma exceção para que o erro possa ser tratado no nível do controlador
    throw new Error(
      `An error occurred while subscribing to the course: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
