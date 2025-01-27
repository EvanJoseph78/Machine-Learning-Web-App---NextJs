import { Course } from "@prisma/client";
import axios from "axios";
import { errorMessages } from "@/utils/errorMessages"; // Mensagens de erro centralizadas

// Cria uma instância do Axios com a URL base definida nas variáveis de ambiente
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Defina a URL base da API
});

const API_VERSION = "/api/v2";

/**
 * Fetches the list of available courses.
 *
 * @returns {Promise<any>} A promise that resolves to the list of courses.
 */
export const fetchCourses = async (): Promise<any> => {
  const response = await api.get("/api/courses/");
  return response.data;
};

/**
 * Fetches a specific course by its ID.
 *
 * @param {string} courseId - The ID of the course to fetch.
 * @returns {Promise<any>} A promise that resolves to the course data.
 */
export const fetchCourse = async (courseId: string): Promise<any> => {
  const response = await api.get(`/api/courses/${courseId}`);
  return response.data;
};

/**
 * Registers a user on the platform. (Duplicate function with the same functionality as fetchRegisterUser1)
 *
 * @param {string} userId - The ID of the user.
 * @param {string} fullName - The full name of the user.
 * @returns {Promise<any>} A promise that resolves to the registration response.
 */
export const fetchRegisterUser = async (
  userId: string,
  fullName: string
): Promise<any> => {
  const response = await api.post("/api/register", {
    userId: userId,
    fullName: fullName,
  });
  return response.data;
};

/**
 * Checks if a user is subscribed to a specific course.
 *
 * @param {string} courseId - The ID of the course.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<any>} A promise that resolves to the subscription status.
 */
export const fetchSubscribeCourse = async (
  courseId: string,
  userId: string
): Promise<any> => {
  const response = await axios.post(`/api/courses/${courseId}/subscribe`, {
    userId: userId,
  });
  return response.data;
};

/**
 * Checks if a user is subscribed to a specific course.
 *
 * @param {string} courseId - The ID of the course.
 * @returns {Promise<any>} A promise that resolves to the subscription status.
 */
export const fetchIsUserSubscribed = async (courseId: string): Promise<any> => {
  const response = await axios.get(`/api/courses/${courseId}/subscribe`);
  return response.data;
};

/**
 * Saves the lat class for a user in a specific course from the database.
 *
 * @param {string} courseId - The ID of the course.
 * @returns {Promise<any>} A promise that resolves to the last saved class data.
 */
export const fetchSaveLastClass = async (
  courseId: string,
  moduleId: string,
  classId: string
): Promise<any> => {
  const response = await axios.patch(`/api/user/course/${courseId}`, {
    moduleId,
    classId,
  });
  return response.data;
};

/**
 * Gets the lat class for a user in a specific course from the database.
 *
 * @param {string} courseId - The ID of the course.
 * @returns {Promise<any>} A promise that resolves to the last saved class data.
 */
export const fetchGetLastClass = async (courseId: string): Promise<any> => {
  const response = await axios.get(`/api/user/course/${courseId}`);
  return response.data;
};

// ========================================================================


/**
 * Função assíncrona que busca a lista de cursos da API.
 * 
 * @async
 * @returns {Promise<Course[] | null>} Retorna um array de cursos se a requisição for bem-sucedida, ou null em caso de erro.
 */
export const fetchGetCourses = async (): Promise<any | null> => {
  try {
    // Faz a requisição para buscar os cursos e obtém a resposta
    const response = await axios.get(`${API_VERSION}/courses`);

    // Retorna os dados dos cursos
    return response.data; // Assume que a API retorna um array de cursos diretamente
  } catch (error) {
    console.error("Erro ao buscar os cursos:", error);

    // Retorna null em caso de erro
    return null;
  }
};

/**
 * Função para buscar os detalhes de um curso específico.
 * 
 * @param courseId - ID único do curso a ser buscado.
 * @returns Os dados do curso em formato de objeto (ou null em caso de erro).
 * 
 * @example
 * ```typescript
 * const course = await fetchGetCourse("677955300ec743ea99d572e1");
 * if (course) {
 *   console.log(course.title); // Exemplo de acesso a um campo do curso
 * }
 * ```
 */
export const fetchGetCourse = async (courseId: string): Promise<any | null> => {
  try {
    // Faz a requisição para obter os dados do curso
    const response = await axios.get(`${API_VERSION}/courses/${courseId}`);
    return response.data.course; // Retorna os dados do curso
  } catch (error) {
    console.error("Erro ao buscar curso:", error);
    return null; // Retorna null em caso de erro
  }
};

/**
 * Realiza a inscrição de um usuário em um curso específico.
 *
 * @param {string} userClerkId - O identificador único do usuário do clerkId.
 * @returns {Promise<void | null>} - Retorna void em caso de sucesso, ou null em caso de erro.
 * @throws {Error} - Caso ocorra algum erro crítico durante a requisição.
 */
export const fetchUserSignUp = async (clerkId: string, fullName: string): Promise<any | null> => {
  try {

    const url = `${API_VERSION}/users`;
    const response = await axios.post(url, { clerkId, fullName });

    if (response.status === 200 || response.status === 201) {
      return "Usuário cadastrado na plataforma";
    } else if (response.status === 409) {
      return errorMessages.USER_ALREADY_SUBSCRIBED; // Retorna null em caso de erro
    }
  } catch (error) {
    return errorMessages.USER_ALREADY_SUBSCRIBED; // Retorna null em caso de erro
  }
};

