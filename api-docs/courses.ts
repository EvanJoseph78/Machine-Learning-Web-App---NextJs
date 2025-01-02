// src/api-docs/courses.ts
import { OpenAPIV3 } from "openapi-types";

// Definindo os endpoints de Cursos
export const coursePaths: OpenAPIV3.PathsObject = {
  "/api/v2/courses": {
    get: {
      summary: "Retrieve all courses",
      description: "Endpoint para obter todos os cursos",
      tags: ["Courses"],
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
                    courseId: { type: "string" },
                    title: { type: "string" },
                  },
                  example: {
                    courseId: "001",
                    title: "Introdução ao JavaScript",
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
