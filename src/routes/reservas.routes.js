import { Router } from "express";

import{
    getReservas,
    getReserva,
    createReserva,
    updateReserva,
    deleteReserva
} from "../controllers/reservas.controller.js";

const reservasRouter = Router();

reservasRouter.get("/", getReservas);
reservasRouter.get("/:id", getReserva);
reservasRouter.post("/", createReserva);
reservasRouter.put("/:id", updateReserva);
reservasRouter.delete("/:id", deleteReserva);

export default reservasRouter;


