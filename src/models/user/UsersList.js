import db from "../../database/index.js";

export default class UserList {
  constructor() {
    this.db = db;
  }

  // Método para obter todos os usuários
  async getUsers() {
    try {
      const allUsers = await this.db.manyOrNone("SELECT * FROM users");
      return allUsers;
    } catch (error) {
      console.error("Falha ao obter usuários:", error.message);
      throw error;
    }
  }

  // Método para obter um usuário pelo ID
  async getUserById(id) {
    // Check if `id` is a number and log it
    console.log(`Fetching user with ID: ${id}`);
    const user = await this.db.oneOrNone("SELECT * FROM users WHERE id = $1", [id]);
    return user;
}


  // Método para obter um usuário pelo email
  async getUserByEmail(email) {
    try {
      const user = await this.db.oneOrNone("SELECT * FROM users WHERE email = $1", [email]);
      return user;
    } catch (error) {
      console.error(`Falha ao obter usuário por email ${email}:`, error.message);
      throw error;
    }
  }

  // Método para adicionar um novo usuário
  async addUser(user) {
    try {
      await this.db.none(
        "INSERT INTO users (nome, email, senha, tipo) VALUES ($1, $2, $3, $4)",
        [user.nome, user.email, user.senha, user.tipo]
      );
      return user;
    } catch (error) {
      console.error("Falha ao adicionar usuário:", error.message);
      throw error;
    }
  }

  // Método para atualizar um usuário existente
  async updateUser(id, nome, email, senha, tipo) {
    try {
      const user = await this.getUserById(id);

      if (!user) {
        console.error(`Usuário com ID ${id} não encontrado.`);
        return null;
      }

      const updatedUser = await this.db.one(
        "UPDATE users SET nome = $1, email = $2, senha = $3, tipo = $4 WHERE id = $5 RETURNING *",
        [nome, email, senha, tipo, id]
      );

      return updatedUser;
    } catch (error) {
      console.error(`Falha ao atualizar usuário com ID ${id}:`, error.message);
      throw error;
    }
  }

  // Método para deletar um usuário
  async deleteUser(id) {
    try {
      const user = await this.getUserById(id);

      if (!user) {
        console.error(`Usuário com ID ${id} não encontrado.`);
        return null;
      }

      await this.db.none("DELETE FROM users WHERE id = $1", [id]);
      return { message: `Usuário com ID ${id} foi deletado com sucesso.` };
    } catch (error) {
      console.error(`Falha ao deletar usuário com ID ${id}:`, error.message);
      throw error;
    }
  }
}
