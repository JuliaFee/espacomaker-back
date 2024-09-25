import db from "../../database/index.js";

class ImpressoraList {
  constructor() {
    this.db = db;
  }

  async getImpressoras() {
    try {
      const allImpressoras = await this.db.manyOrNone("SELECT * FROM impressora");
      return allImpressoras;
    } catch (error) {
      console.error("Failed to get impressoras:", error);
      throw error; 
    }
  }

  async getImpressoraById(id) {
    try {
      const impressora = await this.db.oneOrNone(
        "SELECT * FROM impressora WHERE id = $1",
        id
      );
      return impressora;
    } catch (error) {
      console.error(`Failed to get impressora by id ${id}:`, error);
      throw error;
    }
  }

  async addImpressora(impressora) {
    try {
      await this.db.none(
        "INSERT INTO impressora (nome, descricao, img, statusI, valor) VALUES ($1, $2, $3, $4, $5)",
        [impressora.nome, impressora.descricao, impressora.img, impressora.status, impressora.valor]
      );
      return impressora;
    } catch (error) {
      console.error("Failed to register impressora:", error);
      throw error; 
    }
  }

  async updateImpressora(id, nome, descricao, img, status, valor) {
    try {
      const impressora = await this.getImpressoraById(id);

      if (!impressora) {
        return null;
      }

      const updatedImpressora = await this.db.one(
        "UPDATE impressora SET nome = $1, descricao = $2, img = $3, statusI = $4, valor = $5 WHERE id = $6 RETURNING *",
        [nome, descricao, img, status, valor, id]
      );

      return updatedImpressora;
    } catch (error) {
      console.error(`Failed to update impressora ${id}:`, error);
      throw error; 
    }
  }

  async deleteImpressora(id) {
    try {
      await this.db.none("DELETE FROM impressora WHERE id = $1", id);
    } catch (error) {
      console.error(`Failed to delete impressora ${id}:`, error);
      throw error; 
    }
  }
}

export default ImpressoraList;