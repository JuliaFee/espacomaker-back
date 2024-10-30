import db from "../../database/index.js";

class horarioList {
    constructor() {
        this.db = db;
    }

    async getHorarios() {
        try {
            const allHorarios = await this.db.manyOrNone("SELECT * FROM horarios");
            return allHorarios;
        } catch (error) {
            console.error("Failed to get horarios:", error);
            throw error; 
        }
    }

    async getHorarioById(id) {
        try {
            const horario = await this.db.oneOrNone(
                "SELECT * FROM horarios WHERE id = $1",
                id
            );
            return horario;
        } catch (error) {
            console.error(`Failed to get horario by id ${id}:`, error);
            throw error;
        }
    }

    async registerHorario(horario) {
        try {
            await this.db.none(
                "INSERT INTO horarios (id_impressora, id_ferramenta, hora_inicio, hora_fim) VALUES ($1, $2, $3, $4)",
                [horario.id_impressora, horario.id_ferramenta, horario.hora_inicio, horario.hora_fim]
            );
            return horario;
        } catch (error) {
            console.error("Failed to register horario:", error);
            throw error; 
        }
    }

    async updateHorario(id, id_impressora, id_ferramenta, hora_inicio, hora_fim) {
        try {
            const horario = await this.getHorarioById(id);

            if (!horario) {
                return null;
            }

            const updatedHorario = await this.db.one(
                "UPDATE horarios SET id_impressora = $1, id_ferramenta = $2, hora_inicio = $3, hora_fim = $4 WHERE id = $5 RETURNING *",
                [id_impressora, id_ferramenta, hora_inicio, hora_fim, id]
            );

            return updatedHorario;
        } catch (error) {
            console.error(`Failed to update horario ${id}:`, error);
            throw error; 
        }
    }

    async deleteHorario(id) {
        try {
            await this.db.none("DELETE FROM horarios WHERE id = $1", id);
        } catch (error) {
            console.error(`Failed to delete horario ${id}:`, error);
            throw error; 
        }
    }
}

export default horarioList;