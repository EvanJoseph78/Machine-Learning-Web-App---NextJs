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
              required: ["name", "email"],
              example: {
                clerkId: "12456jikadw2",
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
                  clerkId: { type: "string" },
                  fullName: { type: "string", format: "email" },
                },
                example: {
                  id: "677688027d02698dd6e3815e",
                  clerkId: "12456jikadw2",
                  fullName: "Ednaldo Pereira",
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
                example: { error: "Campo 'clerkId' ou 'fullName' ausente" },
              },
            },
          },
        },
        409: {
          description: "Usuário já existente no banco de dados",
        },
      },
    },
  },
};
