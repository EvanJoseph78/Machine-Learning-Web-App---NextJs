import axios from 'axios';

// Cria uma instância do Axios com a URL base definida nas variáveis de ambiente
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Defina a URL base da API
});

/**
 * Fetches the list of available courses.
 * 
 * @returns {Promise<any>} A promise that resolves to the list of courses.
 */
export const fetchCourses = async (): Promise<any> => {
  const response = await api.get('/api/courses/');
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
export const fetchRegisterUser = async (userId: string, fullName: string): Promise<any> => {
  const response = await api.post('/api/register', {
    userId: userId,
    fullName: fullName
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
export const fetchSubscribeCourse = async (courseId: string, userId: string): Promise<any> => {
  const response = await axios.post(`/api/courses/${courseId}/subscribe`, {
    userId: userId,
  })
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
