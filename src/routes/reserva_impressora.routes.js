import { Router } from "express";

import{
    getReservas_Impressora,
    getReservaById_Impressora,
    addReserva_Impressora,
    updateReserva_Impressora,
    deleteReserva_Impressora
} from "../controllers/reserva_impressora.controller.js";

const reservasRouterImpressora = Router();

reservasRouterImpressora.get("/", getReservas_Impressora);
reservasRouterImpressora.get("/:id", getReservaById_Impressora);
reservasRouterImpressora.post("/", addReserva_Impressora);
reservasRouterImpressora.put("/:id", updateReserva_Impressora);
reservasRouterImpressora.delete("/:id", deleteReserva_Impressora);

export default reservasRouterImpressora;


