// src/api-docs/users.ts
import { OpenAPIV3 } from "openapi-types";

// Definindo a documentação dos endpoints de Usuários
export const userPaths: OpenAPIV3.PathsObject = {
  // rotas de usuários
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
                  userId: { type: "string" },
                  fullName: { type: "string" },
                },
                example: {
                  id: "677688027d02698dd6e3815e",
                  userId: "12456jikadw2",
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
                example: { error: "Campo 'userId' ou 'fullName' ausente" },
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
  "/api/v2/users/{userId}": {
    patch: {
      summary: "Atualizar dados do usuário",
      tags: ["Users"],
      description:
        "Este endpoint permite a atualização de dados de um usuário com base no seu userId.",
      parameters: [
        {
          name: "userId",
          in: "path",
          required: true,
          description: "O ID único do usuário (userId) a ser atualizado.",
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
          description: "Usuário não encontrado com o userId fornecido.",
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
  "/api/v2/users/{userId}/subscribe-course/{courseId}": {
    post: {
      tags: ["Course Subscription"],
      summary: "Inscrever um usuário em um curso",
      description:
        "Gerencia a inscrição de um usuário em um curso com base no ID do usuário e no ID do curso.",
      parameters: [
        {
          name: "userId",
          in: "path",
          required: true,
          description: "ID do usuário que deseja se inscrever no curso.",
          schema: {
            type: "string",
          },
        },
        {
          name: "courseId",
          in: "path",
          required: true,
          description: "ID do curso ao qual o usuário deseja se inscrever.",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        "200": {
          description: "Usuário inscrito com sucesso no curso.",
        },
        "409": {
          description: "Usuário já inscrito no curso.",
        },
        "500": {
          description: "Erro interno.",
        },
      },
    },
  },
  "/api/v2/users/{userId}/get-userInfo": {},
  "/api/v2/users/{userId}/course/{courseId}/finish-course": {},
  "/api/v2/users/{userId}/course/{courseId}/get-certificate-info": {},
  // rotas de cursos
  "/api/v2/courses": {
    get: {
      summary: "Obter todos os cursos",
      description: "Retorna uma lista de todos os cursos disponíveis.",
      tags: ["Courses"],
      responses: {
        "200": {
          description: "Lista de cursos obtida com sucesso.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  courses: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                          example: "12345",
                        },
                        name: {
                          type: "string",
                          example: "Introdução à Programação",
                        },
                        description: {
                          type: "string",
                          example:
                            "Curso básico de programação para iniciantes.",
                        },
                        createdAt: {
                          type: "string",
                          format: "date-time",
                          example: "2023-12-01T12:00:00Z",
                        },
                        updatedAt: {
                          type: "string",
                          format: "date-time",
                          example: "2023-12-15T12:00:00Z",
                        },
                      },
                    },
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
                    example: "Erro interno no servidor.",
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
