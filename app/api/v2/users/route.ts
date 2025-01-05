import { throwErrorMessage } from "@/controllers/errorController";
import { createUser, getAllUsers } from "@/services/userService";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handler para requisições GET (retorna todos os usuários).
 *
 * @returns Resposta HTTP com a lista de usuários ou erro.
 */
export async function GET(): Promise<NextResponse> {
  try {
    const users = await getAllUsers();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    // Se o erro capturado for uma instância da classe Error, ou seja, um erro tradicional do JavaScript
    return throwErrorMessage(error, "app/api/v2/users/route.ts");
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
    const userResponse = await createUser(user);

    return NextResponse.json(userResponse, { status: 200 });
  } catch (error) {
    // Se o erro capturado for uma instância da classe Error, ou seja, um erro tradicional do JavaScript
    return throwErrorMessage(error, "app/api/v2/users/route.ts");
  }
}
