import { Router } from "express";

import {
    getFerramentas,
    getFerramentaById,
    addFerramenta,
    updateFerramenta,
    deleteFerramenta
 } from "../controllers/ferramentas.controller.js";
 
 const ferramentaRouter = Router();
 
 ferramentaRouter.get("/", getFerramentas);
 ferramentaRouter.get("/:id", getFerramentaById);
 ferramentaRouter.post("/", addFerramenta);
 ferramentaRouter.put("/:id", updateFerramenta);
 ferramentaRouter.delete("/:id", deleteFerramenta);
 
 export default ferramentaRouter;

 
 
 
 