import {
  createUserController,
  getAllUsersController,
} from "@/controllers/userController";
import { NextRequest, NextResponse } from "next/server";
import { logError } from "@/services/logError";
import { User } from "@prisma/client";

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
    const endpoint = "/api/users";
    const userId = undefined;

    // Registrar o erro no banco de dados
    await logError(errorMessage, errorStack, endpoint, userId);

    console.error("Error in GET users endpoint:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
/**
 * Função para lidar com requisições POST.
 * Processa a requisição, cria um novo usuário e retorna uma resposta adequada.
 *
 * @returns {NextResponse}
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Supondo que o corpo da requisição contenha os dados do usuário
    const { clerkId, fullName } = await req.json();

    // Monta o objeto user com os dados recebidos
    const user: User = {
      clerkId,
      fullName,
      id: "677602e404e4b3ad0a29cf35",
    };

    // Chama o controlador para criar o usuário
    await createUserController(user);

    // Responde com sucesso após a criação do usuário
    return new NextResponse("User created successfully", { status: 201 });
  } catch (error) {
    // Log de erro para diagnóstico
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;
    const endpoint = "/api/users";
    const userId = undefined;

    // Registrar o erro no banco de dados
    await logError(errorMessage, errorStack, endpoint, userId);

    // Em caso de erro, loga o erro para depuração
    console.error("Error processing the POST request:", error);

    // Retorna uma resposta de erro 500 (Internal Server Error)
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
