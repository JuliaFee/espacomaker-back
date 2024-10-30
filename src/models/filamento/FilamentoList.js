import db from "../../database/index.js";

class FilamentoList {
  constructor() {
    this.db = db;
  }

  async getFilamentos() {
    try {
      const allFilamentos = await this.db.manyOrNone("SELECT * FROM filamentos");
      return allFilamentos;
    } catch (error) {
      console.error("Failed to get filamentos:", error);
      throw error;
    }
  }

  async getFilamentoById(id) {
    try {
      const filamento = await this.db.oneOrNone(
        "SELECT * FROM filamentos WHERE id = $1",
        id
      );
      return filamento;
    } catch (error) {
      console.error(`Failed to get filamento by id ${id}:`, error);
      throw error;
    }
  }

  async registerFilamento(filamento) {
    try {
      await this.db.none(
        "INSERT INTO filamentos (id_impressora, tipo, cor, quantidade, valor_por_kg) VALUES ($1, $2, $3, $4, $5)",
        [filamento.id_impressora, filamento.tipo, filamento.cor, filamento.quantidade, filamento.valor_por_kg]
      );
      return filamento;
    } catch (error) {
      console.error("Failed to register filamento:", error);
      throw error;
    }
  }

  async updateFilamento(id, id_impressora, tipo, cor, quantidade, valor_por_kg) {
    try {
      const filamento = await this.getFilamentoById(id);
      if (!filamento) {
        return null;
      }

      const updatedFilamento = await this.db.one(
        "UPDATE filamentos SET id_impressora = $1, tipo = $2, cor = $3, quantidade = $4, valor_por_kg = $5 WHERE id = $6 RETURNING *",
        [id_impressora, tipo, cor, quantidade, valor_por_kg, id]
      );

      return updatedFilamento;
    } catch (error) {
      console.error(`Failed to update filamento ${id}:`, error);
      throw error;
    }
  }

  async deleteFilamento(id) {
    try {
      await this.db.none("DELETE FROM filamentos WHERE id = $1", id);
    } catch (error) {
      console.error(`Failed to delete filamento ${id}:`, error);
      throw error;
    }
  }
}

export default FilamentoList;
