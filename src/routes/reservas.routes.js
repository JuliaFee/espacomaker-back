import { Router } from "express";

import{
    getReserva,
    getReservaById,
    addReserva,
    updateReserva,
    deleteReserva
} from "../controllers/reservas.controller.js";

const reservasRouter = Router();

reservasRouter.get("/", getReserva);
reservasRouter.get("/:id", getReservaById);
reservasRouter.post("/", addReserva);
reservasRouter.put("/:id", updateReserva);
reservasRouter.delete("/:id", deleteReserva);

export default reservasRouter;


