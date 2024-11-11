import db from "../../database/index.js";

// models/impressora/ImpressoraList.js

class ImpressoraList {
  constructor() {
    this.db = db; // Supondo que você esteja usando o `pg-promise` ou outra biblioteca para o banco de dados
  }

  // Método para pegar todas as impressoras
  async getImpressoras() {
    try {
      const allImpressoras = await this.db.manyOrNone("SELECT * FROM impressoras");
      return allImpressoras;
    } catch (error) {
      console.error("Failed to get impressoras:", error);
      throw error;
    }
  }
  
  // Método para pegar uma impressora pelo ID
  async getImpressoraById(id) {
    try {
      const impressora = await this.db.oneOrNone("SELECT * FROM impressoras WHERE id = $1", id);
      return impressora;
    } catch (error) {
      console.error(`Failed to get impressora by id ${id}:`, error);
      throw error;
    }
  }
  
  // Método para adicionar uma impressora
  async addImpressora(impressora) {
    try {
      const result = await this.db.one(
        "INSERT INTO impressoras (nome, descricao, img, statusI) VALUES ($1, $2, $3, $4) RETURNING id",
        [impressora.nome, impressora.descricao, impressora.img, impressora.statusI]
      );
      return { ...impressora, id: result.id }; // Retorna a impressora com o ID gerado
    } catch (error) {
      console.error("Failed to register impressora:", error);
      throw error;
    }
  }

  // Adicionar filamento à impressora
  async addFilamento(filamento) {
    try {
      const result = await this.db.one(
        "INSERT INTO filamentos (id_impressora, tipo, cor, quantidade, valor_por_kg) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [filamento.id_impressora, filamento.tipo, filamento.cor, filamento.quantidade, filamento.valor_por_kg]
      );
      return result; // Retorna o filamento inserido
    } catch (error) {
      console.error("Failed to add filamento:", error);
      throw error;
    }
  }

  // Método para atualizar a impressora
  async updateImpressora(id, nome, descricao, img, statusI, filamento) {
    try {
      const impressora = await this.getImpressoraById(id);
  
      if (!impressora) {
        return null;
      }
  
      const updatedImpressora = await this.db.one(
        "UPDATE impressoras SET nome = $1, descricao = $2, img = $3, statusI = $4 WHERE id = $5 RETURNING *",
        [nome, descricao, img, statusI, id]
      );
  
      return updatedImpressora;
    } catch (error) {
      console.error(`Failed to update impressora ${id}:`, error);
      throw error;
    }
  }

   // Função para excluir filamentos associados à impressora
  async deleteFilamentosByImpressora(idImpressora) {
    try {
      await this.db.none("DELETE FROM filamentos WHERE id_impressora = $1", idImpressora);
    } catch (error) {
      console.error(`Erro ao excluir filamentos para impressora ${idImpressora}:`, error);
      throw error;
    }
  }

  // Função para excluir a impressora
  async deleteImpressora(id) {
    try {
      await this.db.none("DELETE FROM impressoras WHERE id = $1", id);
    } catch (error) {
      console.error(`Erro ao excluir impressora ${id}:`, error);
      throw error;
    }
  }
}


export default ImpressoraList;
