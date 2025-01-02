// src/api-docs/users.ts
import { OpenAPIV3 } from "openapi-types";

// Definindo os endpoints de Usuários
export const userPaths: OpenAPIV3.PathsObject = {
  "/api/v2/users": {
    get: {
      summary: "Retrieve all users",
      description: "Endpoint para obter todos os usuários",
      tags: ["Users"],
      responses: {
        200: {
          description: "A successful response.",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    name: { type: "string" },
                  },
                  example: { id: "123", name: "John Doe" },
                },
              },
            },
          },
        },
      },
    },
    post: {
      summary: "Cria um usuário no banco de dados",
      description:
        "Este endpoint é utilizado para criar um novo usuário no banco de dados",
      tags: ["Users"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                clerkId: { type: "string" },
                fullName: { type: "string" },
              },
              required: ["clerkId", "fullName"],
              example: {
                clerkId: "iwjdijwdkau12",
                fullName: "Ednaldo Pereira",
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Usuário criado com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                  email: { type: "string", format: "email" },
                },
                example: {
                  id: "12345",
                  name: "João Silva",
                  email: "joao.silva@exemplo.com",
                },
              },
            },
          },
        },
        400: {
          description: "Requisição inválida",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: { type: "string" },
                },
                example: { error: "Campo 'name' ou 'email' ausente" },
              },
            },
          },
        },
      },
    },
  },
};
