import { throwErrorMessage } from "@/controllers/errorController";
import { updateUserController } from "@/controllers/userController";
import { updateUser } from "@/services/userService";
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
  try {
    const { userId } = params; // Extrai o userId dos parâmetros da URL.
    const values = await req.json();

    const updatedUser = await updateUser(userId, values);
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return throwErrorMessage(error, "app/api/v2/users/[userId]/route.ts");
  }
}
