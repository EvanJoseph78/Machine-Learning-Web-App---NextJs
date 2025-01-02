import { getAllUsers } from "@/services/userService"; // Importa a função para pegar todos os usuários do serviço
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
