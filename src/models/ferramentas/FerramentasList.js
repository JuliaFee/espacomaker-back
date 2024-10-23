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
      console.error("Failed to get ferramentas:", error);
      throw error; 
    }
  }

  async getFerramentaById(id) {
    try {
      const ferramenta = await this.db.oneOrNone(
        "SELECT * FROM ferramentas WHERE id = $1",
        id
      );
      return ferramenta;
    } catch (error) {
      console.error(`Failed to get ferramenta by id ${id}:`, error);
      throw error;
    }
  }

  async registerFerramenta(ferramenta) {
    try {
      await this.db.none(
        "INSERT INTO ferramentas (nome, descricao, img, statusF) VALUES ($1, $2, $3, $4)",
        [ferramenta.nome, ferramenta.descricao, ferramenta.img, ferramenta.statusF]
      );
      return ferramenta;
    } catch (error) {
      console.error("Failed to register ferramenta:", error);
      throw error; 
    }
  }

  async updateFerramenta(id, nome, descricao, img, statusF) {
    try {
        const ferramenta = await this.getFerramentaById(id);

        if (!ferramenta) {
            return null;
        }

        const updatedFerramenta = await this.db.one(
            "UPDATE ferramentas SET nome = $1, descricao = $2, img = $3, statusF = $4 WHERE id = $5 RETURNING *",
            [nome, descricao, img, statusF, id]
        );

        return updatedFerramenta;
    } catch (error) {
        console.error(`Failed to update ferramenta ${id}:`, error);
        throw error; 
    }
}


  async deleteFerramenta(id) {
    try {
      await this.db.none("DELETE FROM ferramentas WHERE id = $1", id);
    } catch (error) {
      console.error(`Failed to delete ferramenta ${id}:`, error);
      throw error; 
    }
  }
}

export default FerramentaList;