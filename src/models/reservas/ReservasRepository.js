import db from "../../db/index.js";

class ReservaList {
  constructor() {
    this.db = db;
  }

  async getReservas() {
    try {
      const allReservas = await this.db.manyOrNone("SELECT * FROM reserva");
      return allReservas;
    } catch (error) {
      console.error("Failed to get reservas:", error);
      throw error; 
    }
  }

  async getReservaById(id) {
    try {
      const reserva = await this.db.oneOrNone(
        "SELECT * FROM reserva WHERE id = $1",
        id
      );
      return reserva;
    } catch (error) {
      console.error(`Failed to get reserva by id ${id}:`, error);
      throw error;
    }
  }

  async registerReserva(reserva) {
    try {
      await this.db.none(
        "INSERT INTO reserva (id_user, id_ferramenta, id_impressora, data_reserva, hora_inicio, hora_fim, status_reserva) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [reserva.id_user, reserva.id_ferramenta, reserva.id_impressora, reserva.data_reserva, reserva.hora_inicio, reserva.hora_fim, reserva.status_reserva]
      );
      return reserva;
    } catch (error) {
      console.error("Failed to register reserva:", error);
      throw error; 
    }
  }

  async updateReserva(id, id_user, id_ferramenta, id_impressora, data_reserva, hora_inicio, hora_fim, status_reserva) {
    try {
      const reserva = await this.getReservaById(id);

      if (!reserva) {
        return null;
      }

      const updatedReserva = await this.db.one(
        "UPDATE reserva SET id_user = $1, id_ferramenta = $2, id_impressora = $3, data_reserva = $4, hora_inicio = $5, hora_fim = $6, status_reserva = $7 WHERE id = $8 RETURNING *",
        [id_user, id_ferramenta, id_impressora, data_reserva, hora_inicio, hora_fim, status_reserva, id]
      );

      return updatedReserva;
    } catch (error) {
      console.error(`Failed to update reserva ${id}:`, error);
      throw error; 
    }
  }

  async deleteReserva(id) {
    try {
      await this.db.none("DELETE FROM reserva WHERE id = $1", id);
    } catch (error) {
      console.error(`Failed to delete reserva ${id}:`, error);
      throw error; 
    }
  }
}

export default ReservaList;