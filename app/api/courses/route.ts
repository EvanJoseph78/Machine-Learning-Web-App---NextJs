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
    const course = await db.courses.findMany(
      {
        include: {
          modules: {
            include: {
              classes: true
            }
          }
        }
      }
    );

    // Mapear os cursos e adicionar a quantidade de aulas
    const coursesWithLessonCount = course.map(course => {
      const totalLessons = course.modules.reduce((acc, module) => acc + module.classes.length, 0);


      return {
        ...course,
        totalLessons, // Contagem total de aulas no curso
      };
    });

    console.log((coursesWithLessonCount))

    return NextResponse.json(coursesWithLessonCount);
  } catch (error) {
    console.error("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

