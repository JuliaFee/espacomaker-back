import { Router } from "express";

import{
    getReservas,
    getReservaById,
    addReserva,
    updateReserva,
    deleteReserva
} from "../controllers/reservas.controller.js";

const reservasRouter = Router();

reservasRouter.get("/", getReservas);
reservasRouter.get("/:id", getReservaById);
reservasRouter.post("/", addReserva);
reservasRouter.put("/:id", updateReserva);
reservasRouter.delete("/:id", deleteReserva);

export default reservasRouter;


