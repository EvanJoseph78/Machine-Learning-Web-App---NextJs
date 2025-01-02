import { createUser, getAllUsers } from "@/services/userService"; // Importa a função para pegar todos os usuários do serviço
import { User } from "@prisma/client";
import { NextResponse } from "next/server"; // Importa o NextResponse para retornar respostas HTTP

/**
 * Controlador para obter todos os usuários.
 * Este controlador chama a função getAllUsers para buscar os dados
 * e retorna os resultados com status 200 em formato JSON.
 * Em caso de erro, retorna uma resposta de erro 500.
 *
 * @returns {NextResponse} - Resposta HTTP com a lista de usuários ou erro interno.
 */
export const getAllUsersController = async (): Promise<NextResponse> => {
  try {
    // Chama o serviço para obter todos os usuários
    const users = await getAllUsers();

    // Retorna uma resposta HTTP com a lista de usuários em formato JSON
    return new NextResponse(JSON.stringify({ users }), { status: 200 });
  } catch (error) {
    // Caso ocorra um erro, retorna uma resposta de erro com status 500
    console.error("Error fetching users:", error); // Adiciona log de erro para rastreamento
    return new NextResponse("Internal Error", { status: 500 });
  }
};

/**
 * Controlador responsável por criar um novo usuário e retornar uma resposta apropriada.
 *
 * @param user Objeto contendo os dados do usuário a ser criado.
 * @returns Resposta HTTP com status adequado e a mensagem de sucesso ou erro.
 */
export const createUserController = async (user: User) => {
  try {
    // tenta criar um usuário com a função createUser
    const newUser = await createUser(user);

    // Se o usuário for criado com sucesso, retorna uma resposta com status 201 (Created)
    return new NextResponse(
      JSON.stringify({ message: "User created successfully", user: newUser }),
      {
        status: 201,
      }
    );
  } catch (error) {
    // Em caso de erro, loga o erro e retorna uma resposta apropriada
    console.error("Error creating user:", error);

    // Retorna uma resposta de erro com status 500 (Internal Server Error)
    return new NextResponse(
      JSON.stringify({
        message: "Failed to create user. Please try again later.",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 }
    );
  }
};
