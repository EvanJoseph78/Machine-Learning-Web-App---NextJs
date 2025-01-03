import { db } from "@/lib/db"; // Importar a conexão com o banco de dados

/**
 * Registra um erro no banco de dados.
 * Caso a gravação no banco falhe, o erro será registrado em um arquivo de log.
 *
 * @param message - A mensagem do erro.
 * @param stackTrace - O stack trace do erro (opcional).
 * @param endpoint - O endpoint da API onde o erro ocorreu (opcional).
 * @param userId - O ID do usuário relacionado ao erro, se disponível (opcional).
 */
export const logError = async (
  message: string,
  path?: string | undefined, // salva o caminho do arquivo onde ocorreu o erro
  stackTrace?: string | undefined,
  endpoint?: string | undefined,
  userId?: string | undefined,
  statusCode?: number | undefined // Alterado para 'number' em vez de 'string'
) => {
  try {
    // Tentando gravar o erro no banco de dados
    await db.errorLog.create({
      data: {
        message,
        stackTrace,
        endpoint,
        userId,
        path,
        statusCode,
      },
    });
    console.log("Error logged successfully to the database.");
  } catch (error) {
    console.error("Failed to log error to database:", error);
  }
};
