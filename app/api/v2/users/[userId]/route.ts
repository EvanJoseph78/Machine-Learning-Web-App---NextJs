import { responseError } from "@/controllers/errorController";
import {
  subscribeCourseController,
  updateUserController,
} from "@/controllers/userController";
import { NextRequest, NextResponse } from "next/server";

/**
 * Rota responsável por atualizar o usuário.
 * Este método será chamado quando a requisição PATCH for realizada para a URL de atualização do usuário.
 *
 * @param req - A requisição HTTP (que contém os dados de atualização do usuário no corpo).
 * @param params - Parâmetros extraídos da URL, incluindo o `userId` do usuário.
 * @returns {NextResponse} - Resposta HTTP que indica o status da operação de atualização.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse> {
  const { userId } = params; // Extrai o userId dos parâmetros da URL.

  try {
    // Chama o controlador updateUserController para lidar com a atualização do usuário
    return await updateUserController(req, userId);
  } catch (error) {
    // Caso ocorra algum erro inesperado, retorna um erro genérico
    console.error("Erro na rota PATCH:", error);
    // Se o erro capturado for uma instância da classe Error, ou seja, um erro tradicional do JavaScript
    if (error instanceof Error) {
      // Chama a função 'responseError', passando a mensagem de erro, o caminho do arquivo onde o erro ocorreu,
      // e o stack trace do erro (detalhes de onde e como o erro ocorreu no código)
      return responseError(
        error.message, // Mensagem do erro gerado
        "app/api/v2/users/[userId]/route.ts", // Caminho do arquivo onde ocorreu o erro
        `${error.stack}` // Stack trace do erro, que pode ajudar a depurar o problema
      );
    }

    // Caso o erro não seja uma instância de Error, ou seja, um erro genérico ou desconhecido,
    // retorna uma resposta com a mensagem "Erro interno" e o código de status 500 (Erro Interno do Servidor)
    return new NextResponse("Erro interno", { status: 500 });
  }
}
