import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"

export async function POST(
  req: Request
) {
  try {
    // obtém id do usuário logado com clerk
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Extrair os dados do corpo da solicitação
    const { courseTitle } = await req.json();

    // Criar um novo curso associado ao usuário autenticado
    const course = await db.courses.create({
      data: {
        userId: userId,
        courseTitle
      }
    });

    return NextResponse.json(course);

  } catch (error) {
    console.error("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const course = await db.courses.findMany();

    return NextResponse.json(course);
  } catch (error) {
    console.error("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

