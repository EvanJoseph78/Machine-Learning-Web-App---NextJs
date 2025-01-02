// src/api-docs/swagger.ts
import { createSwaggerSpec } from "next-swagger-doc";
import { OpenAPIV3 } from "openapi-types";
import { userPaths } from "./users";
import { coursePaths } from "./courses";

// Definindo as informações gerais da API
const apiInfo: OpenAPIV3.InfoObject = {
  title: "API Documentation",
  version: "1.0.0",
  description: "Generated API documentation using next-swagger-doc",
};

// Definindo os servidores
const apiServers: OpenAPIV3.ServerObject[] = [
  {
    url: "http://localhost:3000/",
  },
];

// Juntando todas as definições de paths
const apiPaths: OpenAPIV3.PathsObject = {
  ...userPaths,
  ...coursePaths,
};

// Função para criar e retornar a especificação Swagger
export const getApiDocs = async (): Promise<OpenAPIV3.Document> => {
  const spec: OpenAPIV3.Document = createSwaggerSpec({
    definition: {
      openapi: "3.0.0",
      info: apiInfo,
      servers: apiServers,
      paths: apiPaths,
      tags: [
        {
          name: "Users",
          description: "Endpoints relacionados a usuários",
        },
        {
          name: "Courses",
          description: "Endpoints relacionados a cursos",
        },
      ],
    },
  });

  return spec;
};
