// src/api-docs/users.ts
import { OpenAPIV3 } from "openapi-types";

// Definindo a documentação dos endpoints de Usuários
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
                  fullName: { type: "string" },
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
  "/api/v2/users/{clerkId}": {
    patch: {
      summary: "Atualizar dados do usuário",
      tags: ["Users"],
      description:
        "Este endpoint permite a atualização de dados de um usuário com base no seu clerkId.",
      parameters: [
        {
          name: "clerkId",
          in: "path",
          required: true,
          description: "O ID único do usuário (clerkId) a ser atualizado.",
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                fullName: {
                  type: "string",
                  description: "Nome completo do usuário.",
                },
              },
              required: ["fullName"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Usuário atualizado com sucesso.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "User updated successfully",
                  },
                },
              },
            },
          },
        },
        "400": {
          description: "Dados inválidos ou incompletos fornecidos.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Invalid data",
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Usuário não encontrado com o clerkId fornecido.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "User not found",
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "Erro interno no servidor.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Internal server error",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
