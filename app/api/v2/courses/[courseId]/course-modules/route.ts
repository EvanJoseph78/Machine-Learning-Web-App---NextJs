import { throwErrorMessage } from "@/controllers/errorController";
import { createModule } from "@/services/courseService";
import { errorMessages } from "@/utils/errorMessages";
import { Module } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * Manipula requisições POST para criar um novo módulo associado a um curso.
 *
 * @param {NextRequest} req - Objeto da requisição contendo os dados do módulo no corpo.
 * @param {{ params: { courseId: string } }} context - Objeto contendo os parâmetros da rota, como o `courseId`.
 * @returns {Promise<NextResponse>} - Retorna uma resposta HTTP com o módulo criado ou um erro.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
): Promise<NextResponse> {
  try {
    // Obtém os dados do corpo da requisição
    const values = await req.json();

    // Validações básicas de entrada
    if (!params.courseId) {
      return NextResponse.json(
        { message: "O ID do curso é obrigatório." },
        { status: 400 }
      );
    }

    if (!values.title || !values.number) {
      return NextResponse.json(
        { message: "Os campos 'title' e 'number' são obrigatórios." },
        { status: 400 }
      );
    }

    // Cria o módulo associado ao curso
    const module: Module = await createModule(params.courseId, values);

    // Retorna o módulo criado com status 201 (recurso criado)
    return NextResponse.json(module, { status: 201 });
  } catch (error) {
    return throwErrorMessage(
      error,
      "app/api/v2/courses/[courseId]/course-modules/route.ts"
    );
  }
}
