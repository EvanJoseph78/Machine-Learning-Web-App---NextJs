import { db } from "@/lib/db"; // Importar a conexão com o banco de dados

/**
 * Registra um erro no banco de dados.
 *
 * @param message - A mensagem do erro.
 * @param stackTrace - O stack trace do erro (opcional).
 * @param endpoint - O endpoint da API onde o erro ocorreu (opcional).
 * @param userId - O ID do usuário relacionado ao erro, se disponível (opcional).
 */
export const logError = async (
  message: string,
  stackTrace: string | undefined,
  endpoint: string | undefined,
  userId: string | undefined
) => {
  try {
    await db.errorLog.create({
      data: {
        message,
        stackTrace,
        endpoint,
        userId,
      },
    });
    console.log("Error logged successfully.");
  } catch (error) {
    console.error("Failed to log error to database:", error);
  }
};
