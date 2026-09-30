import db from "../../db/db.js";

export const resolvers = {
  Mutation: {
    createUser: async (_, { input }) => {
      try {
        const { username, email, full_name, age, role = 'user', is_active = true } = input;
        const query = `
          INSERT INTO users (username, email, full_name, age, role, is_active)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *;
        `;
        const values = [username, email, full_name, age, role, is_active];
        const result = await db.query(query, values);
        return result.rows[0];
      } catch (error) {
        console.error('Error al crear usuario:', error);
        if (error.code === '23505') {
          throw new Error('El username o email ya existe.');
        }
        throw new Error('Error al crear el usuario');
      }
    },

    updateUser: async (_, { id, input }) => {
      try {
        // Obtenemos primero el usuario actual para hacer una actualización parcial opcional si se requiere
        const currentUser = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        if (currentUser.rows.length === 0) {
          throw new Error('Usuario no encontrado');
        }

        const current = currentUser.rows[0];
        const username = input.username !== undefined ? input.username : current.username;
        const email = input.email !== undefined ? input.email : current.email;
        const full_name = input.full_name !== undefined ? input.full_name : current.full_name;
        const age = input.age !== undefined ? input.age : current.age;
        const role = input.role !== undefined ? input.role : current.role;
        const is_active = input.is_active !== undefined ? input.is_active : current.is_active;

        const query = `
          UPDATE users 
          SET username = $1, email = $2, full_name = $3, age = $4, role = $5, is_active = $6
          WHERE id = $7
          RETURNING *;
        `;
        const values = [username, email, full_name, age, role, is_active, id];
        const result = await db.query(query, values);
        return result.rows[0];
      } catch (error) {
        console.error('Error al actualizar usuario:', error);
        throw new Error(error.message || 'Error al actualizar el usuario');
      }
    },

    deleteUser: async (_, { id }) => {
      try {
        const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING *;', [id]);
        if (result.rows.length === 0) {
          throw new Error('Usuario no encontrado');
        }
        return result.rows[0];
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        throw new Error('Error al eliminar el usuario');
      }
    }
  }
};
