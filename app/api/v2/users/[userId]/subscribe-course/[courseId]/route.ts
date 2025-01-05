import { throwErrorMessage } from "@/controllers/errorController";
import { subscribeCourse } from "@/services/userService";
import { NextRequest, NextResponse } from "next/server";

/**
 * Função que gerencia a inscrição de um usuário em um curso.
 *
 * @param {Object} params - Parâmetros da requisição.
 * @param {string} params.userId - ID do usuário que deseja se inscrever no curso.
 * @param {string} params.courseId - ID do curso ao qual o usuário deseja se inscrever.
 * @param {NextRequest} req - Objeto de requisição que contém informações adicionais.
 * @returns {Promise<Response>} Resposta HTTP com status e dados da inscrição ou erro.
 *
 * @throws {Error} Se ocorrer um erro durante a inscrição no curso.
 */
export async function POST(
  _: NextRequest,
  { params }: { params: { userId: string; courseId: string } }
): Promise<Response> {
  try {
    const subscription = await subscribeCourse(params.userId, params.courseId);

    return NextResponse.json(subscription, { status: 201 });
  } catch (error) {
    return throwErrorMessage(
      error,
      "app/api/v2/users/[userId]/subscribe-course/[courseId]/route.ts"
    );
  }
}
