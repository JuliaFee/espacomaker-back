import db from "../../database/index.js";

export default class UserList {
  constructor() {
    this.db = db;
  }

  async getUsers() {
    try {
      return await this.db.manyOrNone("SELECT * FROM users");
    } catch (error) {
      console.error("Falha ao obter usuários:", error.message);
      throw error;
    }
  }

  async getUserById(id) {
    return await this.db.oneOrNone("SELECT * FROM users WHERE id = $1", [id]);
  }

  async getUserByEmail(email) {
    try {
      return await this.db.oneOrNone("SELECT * FROM users WHERE email = $1", [email]);
    } catch (error) {
      console.error(`Falha ao obter usuário por email ${email}:`, error.message);
      throw error;
    }
  }

  async loginFunction (email, senha) {
    try {
      return await this.db.oneOrNone("SELECT * FROM users WHERE email = $1 AND senha = $2", [email, senha]);
    } catch (error) {
      console.error(`Login error:`, error.message);
      throw error;
    }

  }

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

  async updateUser(id, nome, email, senha, tipo) {
    try {
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

  async deleteUser(id) {
    try {
      await this.db.none("DELETE FROM users WHERE id = $1", [id]);
    } catch (error) {
      console.error(`Falha ao deletar usuário com ID ${id}:`, error.message);
      throw error;
    }
  }
}
