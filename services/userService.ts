import { db } from "@/lib/db"; // Importa a instância de conexão do banco de dados
import { User } from "@prisma/client"; // Importa o modelo de User do Prisma

/**
 * Função para obter todos os usuários do banco de dados.
 *
 * @returns {Promise<Array>} - Retorna uma lista de usuários.
 *
 * A função usa a instância db para buscar todos os usuários da coleção de usuários no banco de dados.
 * A função é assíncrona e retorna uma Promise contendo a lista de usuários.
 */
export const getAllUsers = async (): Promise<Array<any>> => {
  try {
    // Busca todos os usuários na coleção "user"
    const users = await db.user.findMany();

    // Retorna a lista de usuários
    return users;
  } catch (error) {
    // Em caso de erro, loga o erro e lança uma exceção
    console.error("Error fetching users:", error); // Log de erro
    throw new Error("Failed to fetch users from database.");
  }
};

/**
 * Função responsável por criar um novo usuário no banco de dados.
 *
 * @param user Objeto contendo os dados do usuário a ser criado.
 * @returns O usuário recém-criado.
 * @throws Erro caso ocorra alguma falha ao criar o usuário no banco de dados.
 */
export const createUser = async (user: User) => {
  try {
    // Inicia uma transação para garantir que a criação do usuário seja atômica.
    const newUser = await db.user.create({
      data: {
        clerkId: user.clerkId,
        fullName: user.fullName,
      },
    });

    console.log("User created successfully:", newUser);
    return newUser; // Retorna o usuário criado.
  } catch (error) {
    // Se ocorrer um erro, loga e lança uma exceção.
    console.error("Error creating user:", error);

    // Lança um erro em caso de falha na criação de um usuário
    throw new Error(
      `Failed to create user. Error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
