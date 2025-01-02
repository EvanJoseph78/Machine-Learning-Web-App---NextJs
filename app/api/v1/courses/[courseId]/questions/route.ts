import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _: Request,
  { params }: { params: { courseId: string } }
) {
  try {

    // Verificar se o curso foi encontrado
    const { courseId } = params
    // Obter o curso específico do banco de dados
    const course = await db.courses.findUnique({
      where: {
        id: courseId,
      }
    });

    const questions = await db.questions.findMany({
      where: {
        courseId: courseId,
      },
      include: {
        options: true,
      }
    });

    // Retornar o curso encontrado
    return NextResponse.json(questions);

  } catch (error) {
    console.error("[QUESTIONS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

