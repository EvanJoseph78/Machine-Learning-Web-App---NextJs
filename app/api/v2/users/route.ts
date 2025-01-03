import { responseError } from "@/controllers/errorController";
import {
  createUserController,
  getAllUsersController,
} from "@/controllers/userController";
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
    // Se o erro capturado for uma instância da classe Error, ou seja, um erro tradicional do JavaScript
    if (error instanceof Error) {
      // Chama a função 'responseError', passando a mensagem de erro, o caminho do arquivo onde o erro ocorreu,
      // e o stack trace do erro (detalhes de onde e como o erro ocorreu no código)
      return responseError(
        error.message, // Mensagem do erro gerado
        "app/api/v2/users/route.ts", // Caminho do arquivo onde ocorreu o erro
        `${error.stack}` // Stack trace do erro, que pode ajudar a depurar o problema
      );
    }

    // Caso o erro não seja uma instância de Error, ou seja, um erro genérico ou desconhecido,
    // retorna uma resposta com a mensagem "Erro interno" e o código de status 500 (Erro Interno do Servidor)
    return new NextResponse("Erro interno", { status: 500 });
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
    // Se o erro capturado for uma instância da classe Error, ou seja, um erro tradicional do JavaScript
    if (error instanceof Error) {
      // Chama a função 'responseError', passando a mensagem de erro, o caminho do arquivo onde o erro ocorreu,
      // e o stack trace do erro (detalhes de onde e como o erro ocorreu no código)
      return responseError(
        error.message, // Mensagem do erro gerado
        "app/api/v2/users/route.ts", // Caminho do arquivo onde ocorreu o erro
        `${error.stack}` // Stack trace do erro, que pode ajudar a depurar o problema
      );
    }

    // Caso o erro não seja uma instância de Error, ou seja, um erro genérico ou desconhecido,
    // retorna uma resposta com a mensagem "Erro interno" e o código de status 500 (Erro Interno do Servidor)
    return new NextResponse("Erro interno", { status: 500 });
  }
}
