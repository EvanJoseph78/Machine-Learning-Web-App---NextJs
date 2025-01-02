import { db } from "@/lib/db"; // Importa a instância de conexão do banco de dados

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

export const createUser = async () => {
  try {
  } catch (error) {
    console.error("Error fetching users:", error); // Log de erro
    throw new Error("Failed to fetch users from database.");
  }
};
