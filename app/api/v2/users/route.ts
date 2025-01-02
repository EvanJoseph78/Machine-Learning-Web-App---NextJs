import { getAllUsersController } from "@/controllers/userController";
import { NextResponse } from "next/server";
import { logError } from "@/services/logError";

/**
 * Handler para a rota GET que retorna todos os usuários.
 * Caso haja erro, ele é registrado no banco de dados.
 *
 * @returns {NextResponse} - Retorna uma resposta com a lista de usuários ou um erro 500.
 */
export async function GET(): Promise<NextResponse> {
  try {
    // Chama o controller que busca todos os usuários
    return await getAllUsersController();
  } catch (error) {
    // Log de erro para diagnóstico
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;
    const endpoint = "/api/users"; // Substitua pelo seu endpoint atual
    const userId = undefined; // Se você tiver a informação do usuário, adicione aqui

    // Registrar o erro no banco de dados
    await logError(errorMessage, errorStack, endpoint, userId);

    // Responder com erro 500
    console.error("Error in GET users endpoint:", error); // Log do erro no console também
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(): Promise<NextResponse> {
  try {
    return new NextResponse("Internal Server Error", { status: 500 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
