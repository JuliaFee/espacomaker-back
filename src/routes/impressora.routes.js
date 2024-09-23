import { Router } from "express";

import{
    getImpressora,
    getImpressoraById,
    addImpressora,
    updateImpressora,
    deleteImpressora
} from "../controllers/impressora.controller.js";

const impressoraRouter = Router();

impressoraRouter.get("/", getImpressora);  
impressoraRouter.get("/:id", getImpressoraById);
impressoraRouter.post("/", addImpressora);
impressoraRouter.put("/:id", updateImpressora);
impressoraRouter.delete("/:id", deleteImpressora);  

export default impressoraRouter;


