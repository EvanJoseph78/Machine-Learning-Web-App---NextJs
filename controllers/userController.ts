import {
  createUser,
  getAllUsers,
  subscribeCourse,
  updateUser,
} from "@/services/userService";
import { logError } from "@/services/logError";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

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

/**
 * Controlador responsável por atualizar um usuário.
 *
 * @param req - A requisição HTTP, que deve conter o body com os dados do usuário.
 * @param clerkId - O ID único do usuário (clerkId) que será atualizado.
 * @returns {NextResponse} - Retorna a resposta HTTP com o status da operação.
 */
export const updateUserController = async (
  req: NextRequest,
  clerkId: string
): Promise<NextResponse> => {
  try {
    // Obtém os dados de atualização do corpo da requisição
    const { fullName } = await req.json(); // Supondo que o corpo contenha um campo `fullName` para atualização

    // Verifica se o campo `fullName` foi fornecido
    if (!fullName) {
      return new NextResponse(
        JSON.stringify({
          message: "Missing fullName in request body.",
        }),
        { status: 400 } // 400 Bad Request
      );
    }

    // Tenta atualizar o usuário com os novos dados
    const updatedUser = await updateUser(clerkId, { fullName });

    // Retorna a resposta de sucesso com o status 200 (OK)
    return new NextResponse(
      JSON.stringify({
        message: "User updated successfully.",
        user: updatedUser,
      }),
      { status: 200 }
    );
  } catch (error) {
    // Caso ocorra um erro, loga o erro no banco de dados e retorna uma resposta de erro
    await logError(
      "Erro ao atualizar usuário",
      "controllers/userController.ts",
      error instanceof Error ? error.message : "Unknown error"
    );

    console.error("Error updating user:", error);

    // Verifica se o erro é relacionado à inexistência do usuário
    if (error instanceof Error && error.message.includes("not found")) {
      return new NextResponse(
        JSON.stringify({ message: "User not found." }),
        { status: 404 } // 404 Not Found
      );
    }

    // Para outros erros, retorna um status 500 (Internal Server Error)
    return new NextResponse(
      JSON.stringify({
        message: "Failed to update user. Please try again later.",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 }
    );
  }
};

/**
 * Controlador para gerenciar a inscrição de um usuário em um curso.
 *
 * @param {string} userId - O ID do usuário.
 * @param {string} courseId - O ID do curso.
 * @returns {Promise<NextResponse>} Resposta HTTP com o status e dados da inscrição ou erro.
 */
export const subscribeCourseController = async (
  userId: string,
  courseId: string
): Promise<NextResponse> => {
  if (!userId || !courseId) {
    return new NextResponse(
      JSON.stringify({
        message: "User ID and Course ID are required.",
      }),
      { status: 400 } // 400 Bad Request
    );
  }

  try {
    // Chama o serviço para inscrever o usuário no curso
    const subscription = await subscribeCourse(userId, courseId);
    // Retorna a resposta de sucesso
    return new NextResponse(
      JSON.stringify({
        message: "User successfully subscribed to the course.",
        subscription,
      }),
      { status: 200 } // 200 OK
    );
  } catch (error) {
    // console.error("Error in subscribeCourseController:", error);
    throw new Error(
      `${error instanceof Error ? error.message : "Unknown error"}`
    );
    // Retorna uma resposta de erro
    // return new NextResponse(
    //   JSON.stringify({
    //     message: "An error occurred while subscribing the user to the course.",
    //     error: error instanceof Error ? error.message : "Unknown error",
    //   }),
    //   { status: 500 } // 500 Internal Server Error
    // );
  }
};
