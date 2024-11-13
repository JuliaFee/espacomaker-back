import ReservasRepository from "../models/reserva-impressora/reserva_impressoraList.js";
import Joi from 'joi';

const reservaImpressoraSchema = Joi.object({
    id_user: Joi.number().integer().required(),
    id_impressora: Joi.number().integer().required(),
    data_reserva: Joi.date().iso().required(),
    status_reserva: Joi.boolean().required()
});

const reservasRepository = new ReservasRepository();

export const getReservas_Impressora = async (req, res) => {
    try {
        const reservas = await reservasRepository.getReservas_Impressora();
        if (!reservas || reservas.length === 0) {
            return res.status(404).send({ message: "Não há reservas" });
        }

        const formatDateToBrazilian = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        };

        const formattedReservas = reservas.map(reserva => ({
            ...reserva,
            data_reserva: formatDateToBrazilian(new Date(reserva.data_reserva)),
        }));

        return res.status(200).send({ totalReservas: reservas.length, reservas: formattedReservas });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar reservas", error: error.message });
    }
}

// Função para pegar uma reserva por ID
export const getReservaById_Impressora = async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await reservasRepository.getReservaById_Impressora(id);
        if (!reserva) {
            return res.status(404).send({ message: "Reserva não encontrada" });
        }

        const formatDateToBrazilian = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        };

        reserva.data_reserva = formatDateToBrazilian(new Date(reserva.data_reserva));

        return res.status(200).send({ message: "Reserva encontrada", reserva });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar reserva", error: error.message });
    }
};

// Função para adicionar uma nova reserva
export const addReserva_Impressora = async (req, res) => {
    try {
        const { error } = reservaImpressoraSchema.validate(req.body);
        if (error) {
            return res.status(400).send({ message: "Erro na validação dos dados", details: error.details });
        }

        const { id_user, id_impressora, data_reserva, status_reserva } = req.body;

        // Validando a data
        const parsedDate = new Date(data_reserva);
        if (isNaN(parsedDate)) {
            return res.status(400).send({ message: "Data inválida" });
        }

        const newReserva = {
            id_user,
            id_impressora,
            data_reserva: parsedDate,
            status_reserva
        };

        const createdReserva_Impressora = await reservasRepository.addReserva_Impressora(newReserva);
        return res.status(201).send({ message: "Reserva criada com sucesso", reserva: createdReserva_Impressora });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao criar reserva", error: error.message });
    }
};

export const updateReserva_Impressora = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_user, id_impressora, data_reserva, status_reserva } = req.body;

        // Validando a data
        const parsedDate = new Date(data_reserva);
        if (isNaN(parsedDate)) {
            return res.status(400).send({ message: "Data inválida" });
        }

        const reservaById = await reservasRepository.getReservaById_Impressora(id);
        if (!reservaById) {
            return res.status(404).send({ message: "Reserva não encontrada" });
        }

        const updatedReserva = await reservasRepository.updateReserva_Impressora(
            id,
            id_user,
            id_impressora,
            parsedDate,
            status_reserva
        );

        return res.status(200).send({ message: "Reserva atualizada com sucesso", updatedReserva });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao atualizar reserva", error: error.message });
    }
};

export const deleteReserva_Impressora = async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await reservasRepository.getReservaById_Impressora(id);
        if (!reserva) {
            return res.status(404).send({ message: "Reserva não encontrada" });
        }
        await reservasRepository.deleteReserva_Impressora(id);
        return res.status(200).send({ message: "Reserva deletada com sucesso" });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao deletar reserva", error: error.message });
    }
}