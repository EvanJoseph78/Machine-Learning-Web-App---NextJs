
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

// inscreve um usuário em um curso
export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }

) {
  try {

    const { userId } = await req.json();
    const { courseId } = params;

    const existingUser = await db.users.findUnique({
      where: {
        userId: userId
      },
      include: {
        subscribedCourses: true
      }
    })

    if (!existingUser) return new NextResponse("usuário não cadastrado", { status: 200 });

    // Verifica se o curso já está inscrito pelo usuário
    const isCourseSubscribed = existingUser.subscribedCourses.some(course => course.courseId === courseId);
    if (isCourseSubscribed) {
      return new NextResponse("Usuário já está inscrito neste curso", { status: 409 });
    }

    const newSubscribedUser = await db.subscribedCourses.create({
      data: {
        courseId: courseId
      }
    })

    const updateUser = await db.users.update({
      where: { userId },
      data: {
        subscribedCourses: {
          connect: {
            id: newSubscribedUser.id,
          }
        }
      }
    })

    return new NextResponse("created", { status: 200 });
  } catch (error) {
    console.error("Error", error);
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

    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingUser = await db.users.findUnique({
      where: {
        userId: userId
      },
      include: {
        subscribedCourses: true
      }
    })

    if (!existingUser) return new NextResponse("usuário não cadastrado", { status: 200 });

    // Verifica se o curso já está inscrito pelo usuário
    const isCourseSubscribed = existingUser.subscribedCourses.some(course => course.courseId === courseId);
    if (isCourseSubscribed) {
      return new NextResponse("true", { status: 200 });
    }

    return new NextResponse("false", { status: 200 });
  } catch (error) {
    console.error("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

