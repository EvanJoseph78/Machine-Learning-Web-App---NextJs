// utility functions

import { db } from "@/lib/db";

/**
 * Verifica se um curso existe no banco de dados pelo ID.
 *
 * @param {string} categoryId - O ID da categoria a ser verificada.
 * @returns {Promise<boolean>} Retorna `true` se a categoria exista, caso contrário, `false`.
 * @throws {Error} Caso ocorra algum problema na consulta ao banco de dados.
 */
export const checkExistentCategory = async (
  categoryId: string
): Promise<boolean> => {
  const course = await db.category.findUnique({ where: { id: categoryId } });
  return course !== null;
};
