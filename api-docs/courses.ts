// src/api-docs/courses.ts
import { OpenAPIV3 } from "openapi-types";

// Definindo os endpoints de Cursos
export const coursePaths: OpenAPIV3.PathsObject = {
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
  "/api/v2/courses/{courseId}": {
    get: {
      tags: ["Courses"],
      summary: "Recupera um curso específico pelo ID",
      description:
        "Essa operação recupera as informações de um curso específico a partir do seu ID, retornando os dados do curso ou uma mensagem de erro em caso de falha.",
      operationId: "getCourse",
      parameters: [
        {
          name: "courseId",
          in: "path",
          required: true,
          description: "O ID único do curso a ser recuperado.",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        "200": {
          description: "Curso recuperado com sucesso.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  course: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        description: "O ID do curso.",
                      },
                      name: {
                        type: "string",
                        description: "O nome do curso.",
                      },
                      description: {
                        type: "string",
                        description: "Descrição do curso.",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Curso não encontrado.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Curso não encontrado.",
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "Erro interno do servidor.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Erro interno",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v2/courses/{courseId}/subscribed-users": {
    get: {
      tags: ["Course Subscription"],
      summary: "Obtém os usuários inscritos em um curso",
      description:
        "Este endpoint retorna os usuários inscritos em um curso específico, identificado pelo ID do curso.",
      operationId: "getCourseSubscribedUsers",
      parameters: [
        {
          name: "courseId",
          in: "path",
          required: true,
          description: "ID do curso para o qual os usuários estão inscritos.",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        "200": {
          description: "Usuários inscritos retornados com sucesso.",
          content: {
            "application/json": {
              example: {
                "Curso 1": [
                  {
                    clerkId: "1",
                    userFullName: "João Silva",
                  },
                  {
                    clerkId: "1",
                    userFullName: "Maria Oliveira",
                  },
                ],
              },
            },
          },
        },
        "500": {
          description: "Erro interno do servidor.",
          content: {
            "application/json": {
              example: {
                message: "Erro interno",
              },
            },
          },
        },
        "404": {
          description: "Curso não encontrado.",
          content: {
            "application/json": {
              example: {
                message: "Curso não encontrado.",
              },
            },
          },
        },
      },
    },
  },
};
