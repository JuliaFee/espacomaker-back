import db from "../../database/index.js";

class horarioList {
    constructor() {
        this.db = db; // Banco de dados
    }

    // Obtém todos os horários
    async getHorarios() {
        try {
            const allHorarios = await this.db.manyOrNone("SELECT * FROM horarios");
            return allHorarios;
        } catch (error) {
            console.error("Falha ao obter os horários:", error);
            throw new Error("Falha ao obter os horários");
        }
    }

    // Obtém um horário específico por ID
    async getHorarioById(id) {
        try {
            const horario = await this.db.oneOrNone("SELECT * FROM horarios WHERE id = $1", id);
            return horario;
        } catch (error) {
            console.error(`Falha ao obter horário com ID ${id}:`, error);
            throw new Error(`Falha ao obter horário com ID ${id}`);
        }
    }

    // Registra um novo horário
    async registerHorario(horario) {
        try {
            const { id_impressora, id_ferramenta, hora_inicio, hora_fim } = horario;
            await this.db.none(
                "INSERT INTO horarios (id_impressora, id_ferramenta, hora_inicio, hora_fim) VALUES ($1, $2, $3, $4)",
                [id_impressora, id_ferramenta, hora_inicio, hora_fim]
            );
            return horario;
        } catch (error) {
            console.error("Falha ao registrar horário:", error);
            throw new Error("Falha ao registrar horário");
        }
    }

    // Atualiza um horário existente
    async updateHorario(id, id_impressora, id_ferramenta, hora_inicio, hora_fim) {
        try {
            const horario = await this.getHorarioById(id);
            if (!horario) {
                return null; // Retorna null se o horário não for encontrado
            }

            const updatedHorario = await this.db.one(
                "UPDATE horarios SET id_impressora = $1, id_ferramenta = $2, hora_inicio = $3, hora_fim = $4 WHERE id = $5 RETURNING *",
                [id_impressora, id_ferramenta, hora_inicio, hora_fim, id]
            );
            return updatedHorario;
        } catch (error) {
            console.error(`Falha ao atualizar horário com ID ${id}:`, error);
            throw new Error(`Falha ao atualizar horário com ID ${id}`);
        }
    }

    // Deleta um horário
    async deleteHorario(id) {
        try {
            await this.db.none("DELETE FROM horarios WHERE id = $1", id);
        } catch (error) {
            console.error(`Falha ao deletar horário com ID ${id}:`, error);
            throw new Error(`Falha ao deletar horário com ID ${id}`);
        }
    }
}

export default horarioList;