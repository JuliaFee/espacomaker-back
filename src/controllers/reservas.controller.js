import Reservas from "../models/reservas/Reservas.js";
import ReservasRepository from "../models/reservas/ReservasList.js";
import Joi from 'joi';

const reservaSchema = Joi.object({
    id_user: Joi.number().integer().required(),
    id_ferramenta: Joi.number().integer().required(),
    id_impressora: Joi.number().integer().required(),
    id_horario: Joi.number().integer().required(),
    data_reserva: Joi.date().iso().required(),
    status_reserva: Joi.boolean().required()
});

const reservasRepository = new ReservasRepository();

export const getReservas = async (req, res) => {
    try {
        const reservas = await reservasRepository.getReservas();
        if (!reservas || reservas.length === 0) {
            return res.status(404).send({ message: "Não há reservas" });
        }

        // Format the dates in the Brazilian standard (DD/MM/YYYY)
        const formatDateToBrazilian = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        };

        const formattedReservas = reservas.map(reserva => ({
            ...reserva,
            data_reserva: formatDateToBrazilian(new Date(reserva.data_reserva)), // Format the date
        }));

        return res.status(200).send({ totalReservas: reservas.length, reservas: formattedReservas });
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Erro ao buscar reservas", error: error.message });
    }
}


export const getReservaById = async (req, res) => {
    try {
        const { id } = req.params; 
        const reserva = await reservasRepository.getReservaById(id); 
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
}

export const addReserva = async (req, res) => {
    try {
        const { id_user, id_ferramenta, id_impressora, id_horario, data_reserva, status_reserva } = req.body;

        const newReserva = new Reservas(
            parseInt(id_user),
            parseInt(id_ferramenta),
            parseInt(id_impressora),
            parseInt(id_horario),
            new Date(data_reserva),
            status_reserva
        );

        const existingReserva = await reservasRepository.getReservaById(newReserva.id_impressora, newReserva.id_horario, newReserva.data_reserva);
        if (existingReserva) {
            return res.status(409).send({ message: "Essa reserva já existe" });
        }

        await reservasRepository.addReserva(newReserva);
        
        const formatDateToBrazilian = (date) => {
            const day = String(date.getDate()).padStart(2, '0'); 
            const month = String(date.getMonth() + 1).padStart(2, '0'); 
            const year = date.getFullYear(); 
            return `${day}/${month}/${year}`; Y
        };

        const formattedDate = formatDateToBrazilian(newReserva.data_reserva);

        return res.status(201).send({ message: "Reserva criada com sucesso", newReserva: { ...newReserva, data_reserva: formattedDate } });

    } catch (error) {
        return res.status(500).send({ message: "Erro ao criar reserva", error: error.message });
    }
}




export const updateReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_user, id_ferramenta, id_impressora, id_horario, data_reserva, status_reserva } = req.body;

        const parsedDate = new Date(data_reserva);
        if (isNaN(parsedDate)) {
            return res.status(400).send({ message: "Data inválida" });
        }

        const reservaById = await reservasRepository.getReservaById(id);
        if (!reservaById) {
            return res.status(404).send({ message: "Reserva não encontrada" });
        }

        const updatedReserva = await reservasRepository.updateReserva(
            id,
            id_user, 
            id_ferramenta, 
            id_impressora, 
            id_horario,  
            parsedDate, 
            status_reserva
        );

        return res.status(200).send({ message: "Reserva atualizada com sucesso", updatedReserva });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao atualizar reserva", error: error.message });
    }
}



export const deleteReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await reservasRepository.getReservaById(id);
        if (!reserva) {
            return res.status(404).send({ message: "Reserva não encontrada" });
        }
        await reservasRepository.deleteReserva(id);
        return res.status(200).send({ message: "Reserva deletada com sucesso" });
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Erro ao deletar reserva", error: error.message });
    }
}
