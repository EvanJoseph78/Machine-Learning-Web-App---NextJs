import { db } from "@/lib/db"; // Instância de conexão do banco de dados
import { User } from "@prisma/client"; // Modelo de User do Prisma
import { errorMessages } from "@/utils/errorMessages";

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
    throw new Error(errorMessages.USERS_NOT_FOUND);
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
    if (error instanceof Error) {
      if ((error.message = "Unique constraint failed on the constraint")) {
        throw new Error(errorMessages.USER_ALREADY_EXISTS);
      }
    }
    throw new Error(errorMessages.USER_CREATION_ERROR);
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
 */

export const subscribeCourse = async (
  userId: string,
  courseId: string
): Promise<object | string> => {
  try {
    if (!(await checkExistentUser(userId))) {
      // Lança uma exceção para que o erro possa ser tratado no nível do controlador
      throw new Error(errorMessages.USER_NOT_FOUND);
    }

    // Verifica se o usuário já está inscrito no curso
    const subscription = await db.subscripion.findFirst({
      where: {
        courseId: courseId, // Adiciona a verificação para o curso específico
        userId: userId,
      },
    });

    // Se o usuário já estiver inscrito, lança um erro
    if (subscription) {
      // Lança uma exceção para que o erro possa ser tratado no nível do controlador
      throw new Error(errorMessages.ALREADY_SUBSCRIBED);
    }

    // Caso ousuário não esteja inscrito, cria uma nova inscrição
    const newSubscription = await db.subscripion.create({
      data: {
        userId: userId,
        courseId: courseId,
        startedAt: new Date(),
      },
    });

    return newSubscription; // Retorna a inscrição criada
  } catch (error) {
    // Lança uma exceção para que o erro possa ser tratado no nível do controlador
    throw new Error(
      `${
        error instanceof Error
          ? error.message
          : `${errorMessages.UNKNOWN_ERROR}`
      }`
    );
  }
};

export const checkExistentUser = async (userId: string) => {
  const user = await db.user.findUnique({ where: { id: userId } });
  return user !== null; // Retorna true se o usuário for encontrado, false caso contrário.
};
