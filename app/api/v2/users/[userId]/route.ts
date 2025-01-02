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
    return new NextResponse(
      JSON.stringify({
        message: "Erro interno no servidor. Tente novamente mais tarde.",
      }),
      { status: 500 }
    );
  }
}
