import db from "../../db/index.js";

class AdmList {
  constructor() {
    this.db = db;
  }

  async getAdms() {
    try {
      const allAdms = await this.db.manyOrNone("SELECT * FROM adm");
      return allAdms;
    } catch (error) {
      console.error("Failed to get adms:", error);
      throw error; 
    }
  }

  async getAdmById(id) {
    try {
      const adm = await this.db.oneOrNone(
        "SELECT * FROM adm WHERE id = $1",
        id
      );
      return adm;
    } catch (error) {
      console.error(`Failed to get adm by id ${id}:`, error);
      throw error;
    }
  }

  async registerAdm(adm) {
    try {
      await this.db.none(
        "INSERT INTO adm (nome, email, senha) VALUES ($1, $2, $3)",
        [adm.nome, adm.email, adm.senha]
      );
      return adm;
    } catch (error) {
      console.error("Failed to register adm:", error);
      throw error; 
    }
  }

  async updateAdm(id, nome, email, senha) {
    try {
      const adm = await this.getAdmById(id);

      if (!adm) {
        return null;
      }

      const updatedAdm = await this.db.one(
        "UPDATE adm SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *",
        [nome, email, senha, id]
      );

      return updatedAdm;
    } catch (error) {
      console.error(`Failed to update adm ${id}:`, error);
      throw error; 
    }
  }

  async deleteAdm(id) {
    try {
      await this.db.none("DELETE FROM adm WHERE id = $1", id);
    } catch (error) {
      console.error(`Failed to delete adm ${id}:`, error);
      throw error; 
    }
  }
}

export default AdmList;