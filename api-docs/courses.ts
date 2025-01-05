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
    post: {
      tags: ["Courses"],
      summary: "Cria um novo curso",
      description: "Endpoint para criar um curso com base no título fornecido.",
      operationId: "createCourse",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                courseTitle: {
                  type: "string",
                  description: "Título do curso a ser criado.",
                },
              },
              required: ["courseTitle"],
            },
            example: {
              courseTitle: "Introdução à Programação",
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Curso criado com sucesso.",
          content: {
            "application/json": {
              example: {
                id: "67890",
                title: "Introdução à Programação",
                createdAt: "2025-01-04T12:00:00Z",
                updatedAt: "2025-01-04T12:00:00Z",
              },
            },
          },
        },
        "400": {
          description: "Erro de validação dos parâmetros.",
          content: {
            "application/json": {
              example: {
                message: "courseTitle é obrigatório.",
              },
            },
          },
        },
        "500": {
          description: "Erro interno no servidor.",
          content: {
            "application/json": {
              example: {
                message: "Erro interno no servidor.",
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
    patch: {
      summary: "Atualizar Curso",
      description:
        "Atualiza um curso com base no ID fornecido e nos valores enviados no corpo da requisição.",
      tags: ["Courses"],
      parameters: [
        {
          name: "courseId",
          in: "path",
          description: "ID do curso a ser atualizado",
          required: true,
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
                title: {
                  type: "string",
                  description: "Novo título do curso",
                  example: "Introdução ao JavaScript",
                },
                description: {
                  type: "string",
                  description: "Nova descrição do curso",
                  example:
                    "Um curso introdutório para aprender os fundamentos do JavaScript.",
                },
                categoryId: {
                  type: "string",
                  description: "Nova categoria",
                  example: "677954b8cfffa6bf50c3bb23",
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Curso atualizado com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  id: "123",
                  title: "Novo título",
                  categoryId: "456",
                },
              },
            },
          },
        },
        "400": {
          description: "Erro de validação nos dados enviados",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  message: "Os valores para atualização são obrigatórios.",
                },
              },
            },
          },
        },
        "500": {
          description: "Erro interno no servidor",
          content: {
            "application/json": {
              schema: {
                type: "string",
                example: "Erro interno no servidor",
              },
            },
          },
        },
      },
    },
  },
  "/api/v2/courses/{courseId}/course-modules": {
    post: {
      tags: ["Module"],
      summary: "Cria um novo módulo associado a um curso",
      description:
        "Endpoint para criar um módulo associado a um curso existente no sistema.",
      parameters: [
        {
          name: "courseId",
          in: "path",
          required: true,
          description: "O ID do curso ao qual o módulo será associado.",
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
                title: {
                  type: "string",
                  description: "O título do módulo.",
                  example: "Introdução ao JavaScript",
                },
                number: {
                  type: "integer",
                  description: "O número sequencial do módulo dentro do curso.",
                  example: 1,
                },
              },
              required: ["title", "number"],
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Módulo criado com sucesso.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Module",
              },
            },
          },
        },
        "400": {
          description: "Erro de validação nos dados enviados.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    description: "Descrição do erro.",
                    example: "O ID do curso é obrigatório.",
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
                    description: "Mensagem detalhada do erro.",
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
  "/api/v2/courses/{courseId}/lessons": {
    get: {
      tags: ["Lessons"],
      summary: "Obté todas as aulas de um curso",
      operationId: "getCourseLessons",
      parameters: [
        {
          name: "courseId",
          in: "path",
          required: true,
          description: "ID do curso para o retornar as aulas do curso.",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Aulas do curso retornadas com sucesso.",
        },
      },
    },
  },
};
