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
  clerkId: string,
  updates: Partial<{ fullName: string }>
) => {
  try {
    // Verifica se o usuário existe antes de tentar atualizá-lo
    const existingUser = await db.user.findUnique({
      where: { clerkId },
    });

    if (!existingUser) {
      throw new Error(`User with clerkId ${clerkId} not found.`);
    }

    // Atualiza os campos fornecidos no objeto `updates`
    const updatedUser = await db.user.update({
      where: { clerkId },
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
