import ReservaFerramentaList from "../models/reserva-ferramenta/reserva_ferramentaList.js";
import Joi from 'joi';

const reservaSchema = Joi.object({
    id_user: Joi.number().integer().required(),
    id_ferramenta: Joi.number().integer().required(),
    id_horario: Joi.number().integer().required(),
    data_reserva: Joi.date().iso().required(),
    status_reserva: Joi.boolean().required()
});

const reservasRepository = new ReservaFerramentaList();

// Função auxiliar para formatar a data no padrão brasileiro sem alterar o dia
const formatDateToBrazilian = (date) => {
    const localDate = new Date(date); // Cria uma data com a mesma data, mantendo o horário local
    const day = String(localDate.getDate()).padStart(2, '0');
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const year = localDate.getFullYear();
    return `${day}/${month}/${year}`;
};

// Função para buscar todas as reservas
export const getReservas_Ferramenta = async (req, res) => {
    try {
        const reservas = await reservasRepository.getReservas_Ferramenta();
        if (!reservas || reservas.length === 0) {
            return res.status(404).send({ message: "Não há reservas" });
        }

        const formattedReservas = reservas.map(reserva => ({
            ...reserva,
            data_reserva: formatDateToBrazilian(reserva.data_reserva),
        }));

        return res.status(200).send({ totalReservas: reservas.length, reservas: formattedReservas });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar reservas", error: error.message });
    }
};

// Função para pegar uma reserva por ID
export const getReservaById_Ferramenta = async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await reservasRepository.getReservaById_Ferramenta(id);
        if (!reserva) {
            return res.status(404).send({ message: "Reserva não encontrada" });
        }

        reserva.data_reserva = formatDateToBrazilian(reserva.data_reserva);

        return res.status(200).send({ message: "Reserva encontrada", reserva });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar reserva", error: error.message });
    }
};

// Função para adicionar uma nova reserva
export const addReserva_Ferramenta = async (req, res) => {
    try {
        const { error } = reservaSchema.validate(req.body);
        if (error) {
            return res.status(400).send({ message: "Erro na validação dos dados", details: error.details });
        }

        const { id_user, id_ferramenta, id_horario, data_reserva, status_reserva } = req.body;

        const parsedDate = new Date(data_reserva + 'T00:00:00'); // Define a data explicitamente para meia-noite
        if (isNaN(parsedDate)) {
            return res.status(400).send({ message: "Data inválida" });
        }

        const newReserva = {
            id_user,
            id_ferramenta,
            id_horario,
            data_reserva: parsedDate,
            status_reserva
        };

        const createdReserva_Ferramenta = await reservasRepository.addReserva_Ferramenta(newReserva);
        return res.status(201).send({ message: "Reserva criada com sucesso", reserva: createdReserva_Ferramenta });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao criar reserva", error: error.message });
    }
};

// Função para atualizar uma reserva
export const updateReserva_Ferramenta = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_user, id_ferramenta, id_horario, data_reserva, status_reserva } = req.body;

        const parsedDate = new Date(data_reserva + 'T00:00:00'); // Define a data explicitamente para meia-noite
        if (isNaN(parsedDate)) {
            return res.status(400).send({ message: "Data inválida" });
        }

        const reservaById = await reservasRepository.getReservaById_Ferramenta(id);
        if (!reservaById) {
            return res.status(404).send({ message: "Reserva não encontrada" });
        }

        const updatedReserva = await reservasRepository.updateReserva_Ferramenta(
            id,
            id_user,
            id_ferramenta,
            id_horario,
            parsedDate,
            status_reserva
        );

        return res.status(200).send({ message: "Reserva atualizada com sucesso", updatedReserva });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao atualizar reserva", error: error.message });
    }
};

// Função para deletar uma reserva
export const deleteReserva_Ferramenta = async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await reservasRepository.getReservaById_Ferramenta(id);
        if (!reserva) {
            return res.status(404).send({ message: "Reserva não encontrada" });
        }
        await reservasRepository.deleteReserva_Ferramenta(id);
        return res.status(200).send({ message: "Reserva deletada com sucesso" });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao deletar reserva", error: error.message });
    }
};