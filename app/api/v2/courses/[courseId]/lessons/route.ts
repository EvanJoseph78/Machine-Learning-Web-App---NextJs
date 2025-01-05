import { throwErrorMessage } from "@/controllers/errorController";
import {
  createLesson,
  getAllLessons,
  updateLesson,
} from "@/services/courseService";
import { Lesson } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * Endpoint para criar uma nova lição em um curso específico.
 *
 * Este endpoint aceita uma solicitação POST com os detalhes da lição a ser criada,
 * vinculada a um curso identificado por `courseId`.
 *
 * @param req - Objeto de requisição que contém os dados da nova lição no corpo (JSON).
 * @param params - Parâmetros da rota contendo o ID do curso (`courseId`).
 * @returns Retorna a nova lição criada em formato JSON (status 201) ou uma mensagem de erro detalhada.
 *
 * @throws {Error} Caso `courseId` não seja fornecido.
 * @throws {Error} Caso os dados para a criação da lição estejam ausentes ou inválidos.
 * @throws {Error} Caso o curso associado não exista.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const values = await req.json();
    const lesson = await createLesson(params.courseId, values);

    return NextResponse.json(lesson, { status: 201 });
  } catch (error) {
    return throwErrorMessage(
      error,
      "app/api/v2/courses/[courseId]/lessons/route.ts"
    );
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

/**
 * Handler para o endpoint PATCH que atualiza os dados de uma lição existente.
 *
 * @param req - Objeto da requisição que contém o corpo da atualização (JSON) com os campos para atualizar.
 * @returns
 * - Um JSON com a lição atualizada e o status 200 se bem-sucedido.
 * - Um JSON com uma mensagem de erro e o status apropriado em caso de falha.
 *
 * @throws Lança um erro detalhado com contexto se ocorrer falha na atualização.
 */
export async function PATCH(req: NextRequest) {
  try {
    // Extrai o lessonId e outros valores do corpo da requisição
    const { lessonId, ...values } = await req.json();

    // Valida se o campo 'lessonId' foi fornecido
    if (!lessonId) {
      return NextResponse.json("Campo 'lessonId' é necessário.", {
        status: 400, // Bad Request
      });
    }

    // Atualiza a lição utilizando a função apropriada
    const updatedLesson = await updateLesson(lessonId, values);

    // Retorna a lição atualizada com sucesso
    return NextResponse.json(updatedLesson, { status: 200 }); // OK
  } catch (error) {
    // Trata o erro de forma centralizada
    return throwErrorMessage(
      error,
      "app/api/v2/courses/[courseId]/lessons/route.ts"
    );
  }
}
