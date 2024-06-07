import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  try {
    // Obtém o ID do usuário logado com Clerk
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Extrair os dados do corpo da solicitação
    const categories = await req.json();

    // Verificar se categories é um array
    if (!Array.isArray(categories)) {
      return new NextResponse("Invalid data format", { status: 400 });
    }

    // Processar categorias para lowercase e remover duplicados no vetor de entrada
    const uniqueCategoriesMap = new Map();
    for (const category of categories) {
      const nameLowerCase = category.name.toLowerCase();
      if (!uniqueCategoriesMap.has(nameLowerCase)) {
        uniqueCategoriesMap.set(nameLowerCase, { ...category, name: nameLowerCase });
      }
    }
    const uniqueCategories = Array.from(uniqueCategoriesMap.values());

    // Verificar duplicados no banco de dados
    const existingCategories = await db.category.findMany({
      where: {
        name: {
          in: uniqueCategories.map(category => category.name)
        }
      }
    });

    // Filtrar categorias que não existem no banco de dados
    const existingCategoryNames = new Set(existingCategories.map(category => category.name));
    const newCategories = uniqueCategories.filter(category => !existingCategoryNames.has(category.name));

    if (newCategories.length === 0) {
      return new NextResponse("No new categories to insert", { status: 400 });
    }

    // Criar novas categorias associadas ao usuário autenticado
    const createdCategories = await db.category.createMany({
      data: newCategories
    });

    return NextResponse.json("Created", { status: 201 });

  } catch (error) {
    console.error("[CATEGORIES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const categories = await db.category.findMany()
    console.log(categories);

    return NextResponse.json(categories, { status: 201 });
  } catch (error) {
    console.error("[CATEGORIES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
