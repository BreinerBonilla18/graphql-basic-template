import db from "../../db/db.js";

export const resolvers = {
  Query: {
    getUsers: async (_, { search, role, is_active, page = 1, limit = 5 }) => {
      try {
        let query = 'SELECT * FROM users WHERE 1=1';
        const queryParams = [];
        let paramIndex = 1;

        if (search) {
          query += ` AND username ILIKE $${paramIndex}`;
          queryParams.push(`%${search}%`);
          paramIndex++;
        }

        if (role && role !== 'all') {
          query += ` AND role = $${paramIndex}`;
          queryParams.push(role);
          paramIndex++;
        }

        if (is_active !== undefined && is_active !== null) {
          query += ` AND is_active = $${paramIndex}`;
          queryParams.push(is_active);
          paramIndex++;
        }

        // Conteo total para paginación
        const countQuery = query.replace('SELECT *', 'SELECT COUNT(*)');
        const totalResult = await db.query(countQuery, queryParams);
        const totalItems = parseInt(totalResult.rows[0].count, 10);

        // Paginación
        const offset = (page - 1) * limit;
        query += ` ORDER BY id DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
        queryParams.push(limit, offset);

        const result = await db.query(query, queryParams);

        return {
          data: result.rows,
          pagination: {
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
            perPage: limit
          }
        };
      } catch (error) {
        console.error('Error al obtener usuarios en GraphQL:', error);
        throw new Error('Error al obtener los usuarios');
      }
    }
  },
};
