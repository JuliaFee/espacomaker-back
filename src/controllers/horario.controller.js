import horarioList from "../models/horarios/horarioList.js";
const horarioRepository = new horarioList();

export const getHorarios = async (req, res) => {
    try {
        const horarios = await horarioRepository.getHorarios();
        if (!horarios || horarios.length === 0) {
            return res.status(404).send({ message: "Não há horários disponíveis" });
        }
        return res.status(200).send({ totalHorarios: horarios.length, horarios });
    } catch (error) {
        console.error("Erro ao buscar horários:", error);
        return res.status(500).send({ message: "Erro ao buscar horários", error: error.message });
    }
}

export const getHorarioById = async (req, res) => {
    try {
        const { id } = req.params;
        const horario = await horarioRepository.getHorarioById(id);
        if (!horario) {
            return res.status(404).send({ message: `Horário com ID ${id} não encontrado` });
        }
        return res.status(200).send({ message: "Horário encontrado", horario });
    } catch (error) {
        console.error("Erro ao buscar horário:", error);
        return res.status(500).send({ message: "Erro ao buscar horário", error: error.message });
    }
}

export const addHorario = async (req, res) => {
    try {
        const { hora_inicio, hora_fim } = req.body;
        const newHorario = { hora_inicio, hora_fim };
        const horario = await horarioRepository.registerHorario(newHorario);
        return res.status(201).send({ message: "Horário criado com sucesso", horario });
    } catch (error) {
        console.error("Erro ao criar horário:", error);
        return res.status(500).send({ message: "Erro ao criar horário", error: error.message });
    }
}

export const updateHorario = async (req, res) => {
    try {
        const { id } = req.params;
        const { hora_inicio, hora_fim } = req.body;
        const horarioById = await horarioRepository.getHorarioById(id);
        if (!horarioById) {
            return res.status(404).send({ message: `Horário com ID ${id} não encontrado` });
        }

        const updatedHorario = await horarioRepository.updateHorario(
            id, hora_inicio, hora_fim
        );
        return res.status(200).send({ message: "Horário atualizado com sucesso", updatedHorario });
    } catch (error) {
        console.error("Erro ao atualizar horário:", error);
        return res.status(500).send({ message: "Erro ao atualizar horário", error: error.message });
    }
}

export const deleteHorario = async (req, res) => {
    try {
        const { id } = req.params;
        const horario = await horarioRepository.getHorarioById(id);
        if (!horario) {
            return res.status(404).send({ message: `Horário com ID ${id} não encontrado` });
        }
        await horarioRepository.deleteHorario(id);
        return res.status(200).send({ message: "Horário deletado com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar horário:", error);
        return res.status(500).send({ message: "Erro ao deletar horário", error: error.message });
    }
}