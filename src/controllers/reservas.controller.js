// import { hash } from "bcrypt";
import Reservas from "../models/reservas/Reservas.js";
import ReservasRepository from "../models/reservas/ReservasRepository.js";

const reservasRepository = new ReservasRepository();

export const getReserva = async (req, res) => {
    try {
        const reservas = await reservasRepository.getReserva();
        if (!reservas || reservas.length === 0) {
            return res.status(404).send({ message: "Não há reservas" });
        }
        return res.status(200).send({ totalReservas: reservas.length, reservas });
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
        return res.status(200).send({ message: "Reserva encontrada", reserva });
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Erro ao buscar reserva", error: error.message });
    }
}

export const addReserva = async (req, res) => {
    try {
        const { id_user, id_item, id_equipamento, tipo_item, data_reserva, hora_inicio, hora_fim, status_reserva } = req.body;
        const reserva = await reservasRepository.getReservaById(id_user, id_item, id_equipamento, tipo_item, data_reserva, hora_inicio, hora_fim, status_reserva);
        if (reserva) {
            return res.status(409).send({ message: "Essa reserva já existe" });
        }
        const newReserva = new Reservas(id_user, id_item, id_equipamento, tipo_item, data_reserva, hora_inicio, hora_fim, status_reserva);
        await reservasRepository.addReserva(newReserva);
        return res
            .status(201)
            .send({ message: "Reserva criada com sucesso", newReserva });
    
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Erro ao criar reserva", error: error.message });
    }
}


export const updateReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_user, id_item, id_equipamento, tipo_item, data_reserva, hora_inicio, hora_fim, status_reserva } = req.body;
        const reservaById = await reservasRepository.getReservaById(id);
        if (!reservaById) {
            return res.status(404).send({ message: "Reserva não encontrada" });
        }

        const updateReserva = await reservasRepository.updateReserva(
            id,
            id_user, 
            id_item, 
            id_equipamento, 
            tipo_item, 
            data_reserva, 
            hora_inicio, 
            hora_fim, 
            status_reserva);
        return res
            .status(200)
            .send({ message: "Reserva atualizada com sucesso", updateReserva });
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Erro ao atualizar reserva", error: error.message });
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

