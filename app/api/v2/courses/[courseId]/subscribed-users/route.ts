import { responseError } from "@/controllers/errorController";
import { getCourseSubscribedUsers } from "@/services/courseService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const subscribedUsers = await getCourseSubscribedUsers(params.courseId);
    return NextResponse.json(subscribedUsers, { status: 200 });
  } catch (error) {
    // Verifica se o erro é uma instância da classe Error (erro tradicional do JavaScript)
    if (error instanceof Error) {
      // Caso seja, chama a função de tratamento de erro passando detalhes relevantes
      return responseError(
        error.message, // Mensagem de erro gerada
        "app/api/v2/users/[userId]/subscribe-course/[courseId]/route.ts", // Caminho do arquivo onde ocorreu o erro
        `${error.stack}` // Stack trace do erro, útil para depuração
      );
    }

    // Caso o erro não seja uma instância de Error, retorna uma resposta de erro genérico
    return new NextResponse("Erro interno", { status: 500 });
  }
}
