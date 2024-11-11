import db from "../../database/index.js";

class ReservaList {
    constructor() {
        this.db = db;
    }

    // Método para pegar todas as reservas
    async getReservas() {
        try {
            const allReservas = await this.db.manyOrNone("SELECT * FROM reservas");
            return allReservas;
        } catch (error) {
            console.error("Failed to get reservas:", error);
            throw error;
        }
    }

    // Verificar se o horário existe
    async getHorarioById(id_horario) {
        try {
            const horario = await this.db.oneOrNone(
                "SELECT * FROM horarios WHERE id = $1", 
                [id_horario]
            );
            return horario;
        } catch (error) {
            console.error(`Erro ao verificar o horário ${id_horario}:`, error);
            throw error;
        }
    }

    // Buscar uma reserva pelo ID
    async getReservaById(id) {
        try {
            const reserva = await this.db.oneOrNone(
                "SELECT * FROM reservas WHERE id = $1", 
                [id]
            );
            return reserva;
        } catch (error) {
            console.error(`Failed to get reserva by id ${id}:`, error);
            throw error;
        }
    }

    // Adicionar uma nova reserva
    async addReserva(reserva) {
        try {
            // Verifique se o id_horario existe na tabela horarios
            console.log("Verificando se o horário existe...");
            const horario = await this.db.oneOrNone(
                "SELECT * FROM horarios WHERE id = $1", 
                [reserva.id_horario]
            );

            if (!horario) {
                throw new Error("O horário informado não existe.");
            }
            
            // Verifica se já existe uma reserva para o mesmo horário
            console.log("Verificando se já existe uma reserva para esse horário...");
            const existingReserva = await this.db.oneOrNone(
                `SELECT * FROM reservas 
                 WHERE id_impressora = $1 
                 AND id_horario = $2 
                 AND data_reserva = $3`,
                [reserva.id_impressora, reserva.id_horario, reserva.data_reserva]
            );
            
            if (existingReserva) {
                throw new Error("Já existe uma reserva para este horário.");
            }

            // Inserir a nova reserva
            console.log("Criando nova reserva...");
            await this.db.none(
                "INSERT INTO reservas (id_user, id_ferramenta, id_impressora, id_horario, data_reserva, status_reserva) VALUES ($1, $2, $3, $4, $5, $6)",
                [reserva.id_user, reserva.id_ferramenta, reserva.id_impressora, reserva.id_horario, reserva.data_reserva, reserva.status_reserva]
            );
            
            return reserva;
        } catch (error) {
            console.error("Erro ao criar reserva:", error);
            throw error;
        }
    }

    // Atualizar uma reserva existente
    async updateReserva(id, id_user, id_ferramenta, id_impressora, id_horario, data_reserva, status_reserva) {
        try {
            const reserva = await this.getReservaById(id);
            if (!reserva) {
                return null;
            }

            const existingReserva = await this.db.oneOrNone(
                `SELECT * FROM reservas 
                 WHERE id_impressora = $1 
                 AND id_horario = $2 
                 AND data_reserva = $3 
                 AND id != $4`,
                [id_impressora, id_horario, data_reserva, id]
            );

            if (existingReserva) {
                throw new Error("Já existe uma reserva para este horário.");
            }

            const updatedReserva = await this.db.one(
                "UPDATE reservas SET id_user = $1, id_ferramenta = $2, id_impressora = $3, id_horario = $4, data_reserva = $5, status_reserva = $6 WHERE id = $7 RETURNING *",
                [id_user, id_ferramenta, id_impressora, id_horario, data_reserva, status_reserva, id]
            );

            return updatedReserva;
        } catch (error) {
            console.error(`Erro ao atualizar reserva ${id}:`, error);
            throw error;
        }
    }

    // Deletar uma reserva
    async deleteReserva(id) {
        try {
            await this.db.none("DELETE FROM reservas WHERE id = $1", id);
        } catch (error) {
            console.error(`Erro ao deletar reserva ${id}:`, error);
            throw error;
        }
    }
}

export default ReservaList;
