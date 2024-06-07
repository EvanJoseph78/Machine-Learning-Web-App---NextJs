
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {

    // obtém id do usuário logado com clerk
    const { userId } = auth();
    const { courseId } = params
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Criar um novo curso associado ao usuário autenticado
    const course = await db.courses.update({
      where: {
        id: courseId,
        // userId // valida o usuário que criou o curso
      },
      data: {
        ...values,
      }
    });

    return NextResponse.json(course);

  } catch (error) {

    console.error("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// Função para lidar com a solicitação GET para obter um curso específico
export async function GET(
  _: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params

    // Obter o curso específico do banco de dados
    const course = await db.courses.findUnique({
      where: {
        id: courseId,
      },
    });

    // Verificar se o curso foi encontrado
    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    // Retornar o curso encontrado
    return NextResponse.json(course);
  } catch (error) {
    console.error("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
