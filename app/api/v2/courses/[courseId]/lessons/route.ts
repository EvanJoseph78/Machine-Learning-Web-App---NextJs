import { throwErrorMessage } from "@/controllers/errorController";
import { createLesson, getAllLessons } from "@/services/courseService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const values = await req.json();

    if (
      !values ||
      typeof values !== "object" ||
      Object.keys(values).length === 0
    ) {
      throw new Error("Os valores para atualização são obrigatórios.");
    }

    if (!values.number || !values.title) {
      throw new Error("Os valores number e title são obrigatórios");
    }

    const newLesson = await createLesson(params.courseId, values);
    return NextResponse.json(newLesson, { status: 200 });
  } catch (error) {
    throwErrorMessage(error, "app/api/v2/courses/[courseId]/lessons/route.ts");
  }
}

/**
 * GET handler para buscar todas as lições de um curso específico.
 *
 * @param _ - Objeto NextRequest (não utilizado neste caso).
 * @param params - Parâmetros da URL, incluindo o `courseId` para identificar o curso.
 * @returns Uma resposta JSON contendo as lições do curso ou um erro, caso ocorra.
 */
export async function GET(
  _: NextRequest,
  { params }: { params: { courseId: string } }
): Promise<NextResponse> {
  try {
    // Verifica se o parâmetro `courseId` foi fornecido
    if (!params.courseId || typeof params.courseId !== "string") {
      throw new Error(
        "O parâmetro 'courseId' é obrigatório e deve ser uma string válida."
      );
    }

    // Busca todas as lições relacionadas ao curso especificado
    const lessons = await getAllLessons(params.courseId);

    // Retorna as lições encontradas com o status 200 (OK)
    return NextResponse.json(lessons, { status: 200 });
  } catch (error) {
    // Lida com erros e retorna a mensagem apropriada
    return throwErrorMessage(
      error,
      "app/api/v2/courses/[courseId]/lessons/route.ts"
    );
  }
}
