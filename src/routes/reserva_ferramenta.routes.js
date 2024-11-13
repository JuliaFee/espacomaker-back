import { Router } from "express";

import{
    getReservas_Ferramenta,
    getReservaById_Ferramenta,
    addReserva_Ferramenta,
    updateReserva_Ferramenta,
    deleteReserva_Ferramenta
} from "../controllers/reserva_ferramenta.controller.js";

const reservasRouterFerramenta = Router();

reservasRouterFerramenta.get("/", getReservas_Ferramenta);
reservasRouterFerramenta.get("/:id", getReservaById_Ferramenta);
reservasRouterFerramenta.post("/", addReserva_Ferramenta);
reservasRouterFerramenta.put("/:id", updateReserva_Ferramenta);
reservasRouterFerramenta.delete("/:id", deleteReserva_Ferramenta);

export default reservasRouterFerramenta;


