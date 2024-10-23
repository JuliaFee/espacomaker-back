import db from "../../database/index.js";

class ImpressoraList {
  constructor() {
    this.db = db;
  }

  async getImpressoras() {
    try {
      const allImpressoras = await this.db.manyOrNone("SELECT * FROM impressoras");
      return allImpressoras;
    } catch (error) {
      console.error("Failed to get impressoras:", error);
      throw error;
    }
  }
  
  async getImpressoraById(id) {
    try {
      const impressora = await this.db.oneOrNone("SELECT * FROM impressoras WHERE id = $1", id);
      return impressora;
    } catch (error) {
      console.error(`Failed to get impressora by id ${id}:`, error);
      throw error;
    }
  }
  
  async addImpressora(impressora) {
    try {
        await this.db.none(
            "INSERT INTO impressoras (nome, descricao, img, statusI, filamento) VALUES ($1, $2, $3, $4, $5)",
            [impressora.nome, impressora.descricao, impressora.img, impressora.statusI, impressora.valor]
        );
        return impressora;
    } catch (error) {
        console.error("Failed to register impressora:", error);
        throw error; 
    }
}

  
  async updateImpressora(id, nome, descricao, img, statusI, valor) {
    try {
      const impressora = await this.getImpressoraById(id);
  
      if (!impressora) {
        return null;
      }
  
      const updatedImpressora = await this.db.one(
        "UPDATE impressoras SET nome = $1, descricao = $2, img = $3, statusI = $4, filamento = $5 WHERE id = $6 RETURNING *",
        [nome, descricao, img, statusI, valor, id]
      );
  
      return updatedImpressora;
    } catch (error) {
      console.error(`Failed to update impressora ${id}:`, error);
      throw error;
    }
  }
  
  async deleteImpressora(id) {
    try {
      await this.db.none("DELETE FROM impressoras WHERE id = $1", id);
    } catch (error) {
      console.error(`Failed to delete impressora ${id}:`, error);
      throw error;
    }
  }
  
}

export default ImpressoraList;