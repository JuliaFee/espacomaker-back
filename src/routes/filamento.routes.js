import { Router } from "express";

import {
    getFilamentos,
    getFilamentoById,
    addFilamento,
    updateFilamento,
    deleteFilamento
 } from "../controllers/filamento.controller.js";
 
 const filamentoRouter = Router();
 
 filamentoRouter.get("/", getFilamentos);
 filamentoRouter.get("/:id", getFilamentoById);
 filamentoRouter.post("/", addFilamento);
 filamentoRouter.put("/:id", updateFilamento);
 filamentoRouter.delete("/:id", deleteFilamento);

 
 export default filamentoRouter;

 
 
 
 