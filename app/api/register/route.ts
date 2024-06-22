import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// adiciona um novo usuário no banco
export async function POST(
  body: NextRequest
) {
  try {
    const { userId, fullName } = await body.json();

    const existingUser = await db.users.findUnique({
      where: {
        userId: userId
      }
    })

    if (existingUser) return new NextResponse("usuário já existe", { status: 200 });

    const newUser = await db.users.create({
      data: {
        userId: userId,
        fullname: fullName,
      }
    });

    return new NextResponse("created", { status: 200 });
  } catch (error) {
    console.error("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


