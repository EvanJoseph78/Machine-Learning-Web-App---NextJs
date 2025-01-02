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
