import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(body: NextRequest) {
  try {
    // Extrai userId e fullName do corpo da requisição
    const { userId, fullName } = await body.json();

    // Verifica se o usuário já existe no banco
    const existingUser = await db.users.findUnique({
      where: { userId }
    });

    // Se o usuário existir, retorna um status 200 indicando que já existe
    if (existingUser) {
      return new NextResponse("Usuário já existe", { status: 200 });
    }

    // Cria um novo usuário no banco de dados
    const newUser = await db.users.create({
      data: {
        userId,
        fullname: fullName
      }
    });

    // Retorna uma resposta de sucesso indicando que o usuário foi criado
    return new NextResponse("Usuário criado com sucesso", { status: 201 });
  } catch (error) {
    // Captura e loga erros internos
    console.error("[POST /api/user/new-user]", error);
    // Retorna uma resposta de erro interno caso ocorra uma exceção
    return new NextResponse("Erro interno ao criar usuário", { status: 500 });
  }
}
