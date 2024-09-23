import { Router } from "express";

import {
    getFerramentas,
    getFerramentaById,
    registerFerramenta,
    updateFerramenta,
    deleteFerramenta
 } from "../controllers/ferramentas.controller.js";
 
 const ferramentaRouter = Router();
 
 ferramentaRouter.get("/", getFerramentas);
 ferramentaRouter.get("/:id", getFerramentaById);
 ferramentaRouter.post("/", registerFerramenta);
 ferramentaRouter.put("/:id", updateFerramenta);
 ferramentaRouter.delete("/:id", deleteFerramenta);
 
 export default ferramentaRouter;

 
 
 
 