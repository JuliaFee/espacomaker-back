import db from "../../database/index.js";

class FerramentaList {
  constructor() {
    this.db = db;
  }

  async getFerramentas() {
    try {
      const allFerramentas = await this.db.manyOrNone("SELECT * FROM ferramentas");
      return allFerramentas;
    } catch (error) {
      console.error("Failed to get ferramentas:", error.message);
      throw new Error("Erro ao buscar ferramentas no banco de dados.");
    }
  }

  async getFerramentaById(id) {
    try {
      const ferramenta = await this.db.oneOrNone(
        "SELECT * FROM ferramentas WHERE id = $1",
        [id]
      );
      return ferramenta;
    } catch (error) {
      console.error(`Failed to get ferramenta by id ${id}:`, error.message);
      throw new Error("Erro ao buscar ferramenta no banco de dados.");
    }
  }

  async registerFerramenta(ferramenta) {
    try {
      const query = `
        INSERT INTO ferramentas (nome, descricao, img, statusF)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
      const newFerramenta = await this.db.one(query, [
        ferramenta.nome,
        ferramenta.descricao,
        ferramenta.img,
        ferramenta.statusF,
      ]);
      return newFerramenta;
    } catch (error) {
      console.error("Failed to register ferramenta:", error.message);
      throw new Error("Erro ao registrar ferramenta no banco de dados.");
    }
  }

  async updateFerramenta(id, nome, descricao, img, statusF) {
    try {
      const existingFerramenta = await this.getFerramentaById(id);

      if (!existingFerramenta) {
        return null; // Retorna null se a ferramenta não existir
      }

      const updatedFerramenta = await this.db.one(
        `
        UPDATE ferramentas
        SET nome = $1, descricao = $2, img = $3, statusF = $4
        WHERE id = $5
        RETURNING *;
        `,
        [nome, descricao, img, statusF, id]
      );

      return updatedFerramenta;
    } catch (error) {
      console.error(`Failed to update ferramenta ${id}:`, error.message);
      throw new Error("Erro ao atualizar ferramenta no banco de dados.");
    }
  }

  async deleteFerramenta(id) {
    try {
      const ferramenta = await this.getFerramentaById(id);

      if (!ferramenta) {
        return false; // Retorna false se a ferramenta não existir
      }

      await this.db.none("DELETE FROM ferramentas WHERE id = $1", [id]);
      return true;
    } catch (error) {
      console.error(`Failed to delete ferramenta ${id}:`, error.message);
      throw new Error("Erro ao deletar ferramenta no banco de dados.");
    }
  }
}

export default FerramentaList;
