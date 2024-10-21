import db from "../../database/index.js";

class ReservaList {
    constructor() {
        this.db = db;
    }

    async getReservas() {
        try {
            const allReservas = await this.db.manyOrNone("SELECT * FROM reservas");
            return allReservas;
        } catch (error) {
            console.error("Failed to get reservas:", error);
            throw error; 
        }
    }

    async getReservaById(id) {
        try {
            const reserva = await this.db.oneOrNone(
                "SELECT * FROM reservas WHERE id = $1",
                id
            );
            return reserva;
        } catch (error) {
            console.error(`Failed to get reserva by id ${id}:`, error);
            throw error;
        }
    }

    async addReserva(reserva) {
        try {
            await this.db.none(
                "INSERT INTO reservas (id_user, id_ferramenta, id_impressora, id_horario, data_reserva, status_reserva) VALUES ($1, $2, $3, $4, $5, $6)",
                [reserva.id_user, reserva.id_ferramenta, reserva.id_impressora, reserva.id_horario, reserva.data_reserva, reserva.status_reserva]
            );
            return reserva;
        } catch (error) {
            console.error("Failed to add reserva:", error);
            throw error; 
        }
    }

    async updateReserva(id, id_user, id_ferramenta, id_impressora, id_horario, data_reserva, status_reserva) {
        try {
            const reserva = await this.getReservaById(id);

            if (!reserva) {
                return null;
            }

            const updatedReserva = await this.db.one(
                "UPDATE reservas SET id_user = $1, id_ferramenta = $2, id_impressora = $3, id_horario = $4, data_reserva = $5, status_reserva = $6 WHERE id = $7 RETURNING *",
                [id_user, id_ferramenta, id_impressora, id_horario, data_reserva, status_reserva, id]
            );

            return updatedReserva;
        } catch (error) {
            console.error(`Failed to update reserva ${id}:`, error);
            throw error; 
        }
    }

    async deleteReserva(id) {
        try {
            await this.db.none("DELETE FROM reservas WHERE id = $1", id);
        } catch (error) {
            console.error(`Failed to delete reserva ${id}:`, error);
            throw error; 
        }
    }

    async getHorariosDisponiveis(id_impressora, data_reserva) {
        try {
            const horarios = await this.db.manyOrNone(
                `SELECT * FROM horarios 
                 WHERE id_impressora = $1 
                 AND NOT EXISTS (
                     SELECT 1 FROM reservas 
                     WHERE reservas.id_horario = horarios.id 
                     AND reservas.data_reserva = $2
                 )`,
                [id_impressora, data_reserva]
            );
            return horarios;
        } catch (error) {
            console.error("Failed to get available horarios:", error);
            throw error; 
        }
    }
}

export default ReservaList;
