 import { Router } from "express";

 import {
    getAdms,
    getAgetAdmById,
    registerAdm,
    updateAdm,
    deleteAdm,
  } from "../controllers/adm.controller.js";
  
  const admRouter = Router();
  
  admRouter.get("/", getAdms);
  admRouter.get("/:id", getAgetAdmById);
  admRouter.post("/", registerAdm);
  admRouter.put("/:id", updateAdm);
  admRouter.delete("/:id", deleteAdm);
  
  export default admRouter;

