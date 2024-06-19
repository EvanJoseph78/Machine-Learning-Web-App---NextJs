import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: Request,
  { params }: { params: { courseId: string, moduleId: string } }
) {
  try {
    // Obtendo o ID do usuário autenticado
    // const { userId } = auth(req);

    // Obtendo os parâmetros courseId e moduleId
    const { courseId, moduleId } = params;

    // Buscando o curso pelo ID
    const course = await db.courses.findFirst({
      where: { id: courseId }
    });

    // Buscando o módulo pelo ID
    const _module = await db.modules.findFirst({
      where: { id: moduleId }
    });

    // Verificando se o curso e o módulo existem
    if (!course) {
      return NextResponse.json("Curso não encontrado", { status: 404 });
    }

    if (!_module) {
      return NextResponse.json("Módulo não encontrado", { status: 404 });
    }

    // Buscando as aulas do módulo específico
    const classes = await db.classes.findMany({
      where: { modulesId: moduleId }
    });

    // Retornando as aulas encontradas
    return NextResponse.json({ classes }, { status: 200 });

  } catch (error) {
    console.error('[MODULE_CREATION_ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { courseId: string, moduleId: string } }
) {
  try {
    const { courseId, moduleId } = params;
    // const values = await req.json();
    const { classTitle, classNumber } = await req.json()

    // Criar uma nova aula vinculada ao módulo específico
    const aula = await db.classes.create({
      data: {
        classTitle: classTitle,
        modulesId: moduleId, // Assumindo que o campo no banco de dados é moduleId
        classNumber: classNumber
      }
    });

    return NextResponse.json({ aula }, { status: 201 });
  } catch (error) {
    console.error('[CLASS_CREATION_ERROR]', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

