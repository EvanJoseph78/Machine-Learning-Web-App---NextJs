
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"


export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
): Promise<Response> {
  try {
    // Obtém id do usuário logado com clerk
    const { userId } = auth();

    // Se o userId não for encontrado, retorna 401 Unauthorized
    // if (!userId) {
    //   return new NextResponse('Unauthorized', { status: 401 });
    // }

    // Parse o corpo JSON da requisição
    const values = await req.json();
    const { courseId } = params;

    if (!values || Object.keys(values).length === 0) {
      return new NextResponse('Invalid data', { status: 400 });
    }

    const { moduleTitle, moduleNumber } = values;

    // Verifica se existe algum módulo com o mesmo nome ou número
    const existingModule = await db.modules.findFirst({
      where: {
        OR: [
          { moduleNumber: moduleNumber },
          { moduleTitle: moduleTitle }
        ]
      }
    });

    if (existingModule) {
      return new NextResponse('Módulo já existe', { status: 400 });
    }

    // Verifica se o curso existe
    const course = await db.courses.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return new NextResponse('Curso não encontrado', { status: 404 });
    }

    // Cria um novo módulo associado ao curso
    const newModule = await db.modules.create({
      data: {
        moduleTitle: moduleTitle,
        moduleNumber: moduleNumber,
        coursesId: courseId,
      },
    });

    // Atualiza o curso para incluir o novo módulo
    await db.courses.update({
      where: { id: courseId },
      data: {
        modules: {
          connect: { id: newModule.id },
        },
      },
    });


    // Retorna o módulo criado como JSON
    return NextResponse.json(newModule);

  } catch (error) {
    // Log o erro para fins de depuração
    console.error('[MODULE_CREATION_ERROR]', error);

    // Retorna uma resposta de erro interno do servidor
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;

    // Busca o curso pelo ID especificado
    const course = await db.courses.findUnique({
      where: { id: courseId },
    });

    // Verifica a existência do curso
    if (!course) {
      return NextResponse.json("Curso não encontrado", { status: 404 });
    }

    const modules = await db.modules.findMany({
      where: {
        coursesId: courseId
      },
      include: {
        classes: true
      }
    });

    // Retorna um array de módulos
    return NextResponse.json({ modules }, { status: 200 });

  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

// Fazer a rota do tipo path
