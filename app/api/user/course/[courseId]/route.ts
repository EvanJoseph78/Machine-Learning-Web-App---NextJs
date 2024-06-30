
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Atualiza o módulo e a ultima aula vista pelo usuário.
export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {

    // obtém id do usuário logado com clerk
    const { userId } = auth();
    const { courseId } = params
    const { moduleId, classId } = await req.json();

    // valida o usuário 
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Obter o curso específico do banco de dados
    const course = await db.courses.findUnique({
      where: {
        id: courseId,
      }
    });

    // Verificar se o curso foi encontrado
    if (!course) {
      return new NextResponse("Curso não encontrado", { status: 404 });
    }

    // Busca no banco de dados um usuário pelo id
    const user = await db.users.findUnique({
      where: {
        userId: userId,
      },
    });

    // Valida se o usuário existe
    if (!user) {
      return new NextResponse("Usuário não encontrado", { status: 404 });
    }

    // Busca os dados do curso que o usuário está inscrito 
    const subscribedCourse = await db.subscribedCourses.findFirst({
      where: {
        usersId: user.id,
        courseId: courseId,
      },
    });

    // Valida a existencia dos dados
    if (!subscribedCourse) {
      return new NextResponse("Erro interno", { status: 404 });
    }

    // Atualiza os campos no database de currentIdClass e currentModuleId para salvar a última aula vista pelo usuário.
    const udpdatedSubscribedCourse = await db.subscribedCourses.update({
      where: {
        id: subscribedCourse.id,
      },
      data: {
        currentIdClass: classId,
        currentModuleId: moduleId,
      }
    })

    const lastClass = {
      lastModuleId: udpdatedSubscribedCourse.currentModuleId,
      lastClassId: udpdatedSubscribedCourse.currentIdClass,
    }

    return NextResponse.json(lastClass);

  } catch (error) {
    console.error("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// retorna a última aula que o usuário parou
export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {

  try {
    // obtém id do usuário logado com clerk
    const { userId } = auth();
    const { courseId } = params

    // valida o usuário 
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Obter o curso específico do banco de dados
    const course = await db.courses.findUnique({
      where: {
        id: courseId,
      }
    });

    // Verificar se o curso foi encontrado
    if (!course) {
      return new NextResponse("Curso não encontrado", { status: 404 });
    }

    // Busca no banco de dados um usuário pelo id
    const user = await db.users.findUnique({
      where: {
        userId: userId,
      },
    });

    // Valida se o usuário existe
    if (!user) {
      return new NextResponse("Usuário não encontrado", { status: 404 });
    }

    // Busca os dados do curso que o usuário está inscrito 
    const subscribedCourse = await db.subscribedCourses.findFirst({
      where: {
        usersId: user.id,
        courseId: courseId,
      },
    });

    // Valida a existencia dos dados
    if (!subscribedCourse) {
      return new NextResponse("Erro interno", { status: 404 });
    }

    const classInfo = await db.classes.findUnique({
      where: {
        id: subscribedCourse.currentIdClass
      }
    })

    const lastClass = {
      lastModuleId: subscribedCourse.currentModuleId,
      class: classInfo
    }

    return NextResponse.json(lastClass);
  } catch (error) {
    console.error("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

