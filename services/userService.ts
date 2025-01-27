import { db } from "@/lib/db"; // Instância de conexão do banco de dados
import { Subscription, User } from "@prisma/client"; // Modelo de User do Prisma
import { errorMessages } from "@/utils/errorMessages";
import { checkExistentCourse } from "./courseService";
import { checkExistentSubscription } from "./subscriptionService";

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
  // updates: Partial<{ fullName: string }>
  values: any
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
      data: {
        ...values,
      },
    });

    console.log("Usuário atualizado com sucesso:", updatedUser);
    return updatedUser;
  } catch (error) {
    // console.error("Error updating user:", error);
    if (error instanceof Error) {
      if (error.message.includes("User with clerkId")) {
        throw new Error(errorMessages.USER_NOT_FOUND);
      }
    }

    // Lança uma exceção para que o erro possa ser tratado no nível do controlador
    throw new Error(
      `Failed to update user. Error: ${error instanceof Error ? error.message : "Unknown error"
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

export const subscribeCourse = async (userId: string, courseId: string) => {
  try {
    if (!(await checkExistentUser(userId))) {
      throw new Error(errorMessages.USER_NOT_FOUND);
    }

    if (!(await checkExistentCourse(courseId))) {
      throw new Error(errorMessages.COURSE_NOT_FOUND);
    }

    if (await checkExistentSubscription(courseId, userId)) {
      throw new Error(errorMessages.USER_ALREADY_SUBSCRIBED);
    }

    const subscription = await db.subscription.create({
      data: { userId, courseId, startedAt: new Date() },
    });

    return subscription;
  } catch (error) {
    // Trata os erros e lança com uma mensagem específica
    throw new Error(
      error instanceof Error ? error.message : errorMessages.UNKNOWN_ERROR
    );
  }
};

export const checkExistentUser = async (userId: string) => {
  const user = await db.user.findUnique({ where: { id: userId } });
  return user !== null; // Retorna true se o usuário for encontrado, false caso contrário.
};
