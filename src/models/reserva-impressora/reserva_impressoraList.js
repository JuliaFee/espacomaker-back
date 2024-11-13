import db from "../../database/index.js";

class ReservaImpressoraList {
    constructor() {
        this.db = db;
    }

    async getReservas_Impressora() {
        try {
            const reservas = await this.db.manyOrNone("SELECT * FROM reservas WHERE id_impressora IS NOT NULL");
            return reservas;
        } catch (error) {
            console.error("Erro ao buscar reservas de impressoras:", error);
            throw error;
        }
    }

    async getReservaById_Impressora(id) {
        try {
            const reserva = await this.db.oneOrNone("SELECT * FROM reservas WHERE id = $1 AND id_impressora IS NOT NULL", [id]);
            return reserva;
        } catch (error) {
            console.error(`Erro ao buscar reserva de impressora com ID ${id}:`, error);
            throw error;
        }
    }

    async addReserva_Impressora(reserva) {
        try {
            const existingReserva = await this.db.oneOrNone(
                `SELECT * FROM reservas
                 WHERE id_impressora = $1
                 AND data_reserva = $2`,
                [reserva.id_impressora, reserva.data_reserva]
            );
            if (existingReserva) {
                throw new Error("Já existe uma reserva para esta impressora na mesma data.");
            }

            // Insere a nova reserva caso não haja conflito
            await this.db.none(
                `INSERT INTO reservas (id_user, id_impressora, data_reserva, status_reserva)
                 VALUES ($1, $2, $3, $4)`,
                [reserva.id_user, reserva.id_impressora, reserva.data_reserva, reserva.status_reserva]
            );

            return reserva;
        } catch (error) {
            console.error("Erro ao criar reserva de impressora:", error);
            throw error;
        }
    }

    async updateReserva_Impressora(id, reserva) {
        try {
            const existingReserva = await this.getReservaById_Impressora(id);
            if (!existingReserva) {
                throw new Error("Reserva de impressora não encontrada.");
            }

            // Verifica se há um conflito de reserva no mesmo dia para a impressora
            const conflict = await this.db.oneOrNone(
                `SELECT * FROM reservas
                 WHERE id_impressora = $1
                 AND data_reserva = $2
                 AND id != $3`,
                [reserva.id_impressora, reserva.data_reserva, id]
            );
            if (conflict) {
                throw new Error("Conflito de data: já existe uma reserva para esta impressora na mesma data.");
            }

            const updatedReserva = await this.db.one(
                `UPDATE reservas
                 SET id_user = $1, id_impressora = $2, data_reserva = $3, status_reserva = $4
                 WHERE id = $5 RETURNING *`,
                [reserva.id_user, reserva.id_impressora, reserva.data_reserva, reserva.status_reserva, id]
            );

            return updatedReserva;
        } catch (error) {
            console.error(`Erro ao atualizar reserva de impressora ${id}:`, error);
            throw error;
        }
    }

    async deleteReserva_Impressora(id) {
        try {
            await this.db.none("DELETE FROM reservas WHERE id = $1", [id]);
        } catch (error) {
            console.error(`Erro ao deletar reserva de impressora ${id}:`, error);
            throw error;
        }
    }
}

export default ReservaImpressoraList;
