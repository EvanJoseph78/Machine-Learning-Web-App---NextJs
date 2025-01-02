import {
  createUserController,
  getAllUsersController,
} from "@/controllers/userController";
import { logError } from "@/services/logError";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handler para requisições GET (retorna todos os usuários).
 *
 * @returns Resposta HTTP com a lista de usuários ou erro.
 */
export async function GET(): Promise<NextResponse> {
  try {
    return await getAllUsersController();
  } catch (error) {
    console.error("Error in GET users endpoint:", error);
    await logError(
      "Erro na rota GET de usuários",
      "/api/users",
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * Handler para requisições POST (criação de usuário).
 *
 * @param req Requisição HTTP com os dados do usuário.
 * @returns Resposta HTTP indicando sucesso ou erro.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { clerkId, fullName } = await req.json();

    const user: Omit<User, "id"> = { clerkId, fullName };
    return await createUserController(user);
  } catch (error) {
    console.error("Error processing POST request:", error);
    await logError(
      "Erro na rota POST de criação de usuário",
      "/api/users",
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
