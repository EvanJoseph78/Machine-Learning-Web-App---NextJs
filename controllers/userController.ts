import { createUser, getAllUsers } from "@/services/userService";
import { logError } from "@/services/logError";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

/**
 * Controlador para obter todos os usuários.
 *
 * @returns Resposta HTTP com a lista de usuários ou erro.
 */
export const getAllUsersController = async (): Promise<NextResponse> => {
  try {
    const users = await getAllUsers();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

/**
 * Controlador para criar um novo usuário.
 *
 * @param user Dados do usuário a ser criado.
 * @returns Resposta HTTP indicando sucesso ou erro.
 */
export const createUserController = async (
  user: Omit<User, "id">
): Promise<NextResponse> => {
  try {
    const newUser = await createUser(user);
    return NextResponse.json(
      { message: "Usuário criado com sucesso.", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    await logError(
      "Erro na criação de usuário",
      "/controllers/userController.ts",
      error instanceof Error ? error.message : "Unknown error"
    );

    if (
      error instanceof Error &&
      error.message.includes(
        "Unique constraint failed on the constraint: `User_clerkId_key`"
      )
    ) {
      return NextResponse.json(
        { message: "Usuário já cadastrado." },
        { status: 409 }
      );
    }

    return NextResponse.json({ message: "Erro no servidor." }, { status: 500 });
  }
};
