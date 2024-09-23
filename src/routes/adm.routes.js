 import { Router } from "express";

 import {
    getAdm,
    getAdmById,
    addAdm,
    updateAdm,
    deleteAdm,
  } from "../controllers/adm.controller.js";
  
  const admRouter = Router();
  
  admRouter.get("/", getAdm);
  admRouter.get("/:id", getAdmById);
  admRouter.post("/", addAdm);
  admRouter.put("/:id", updateAdm);
  admRouter.delete("/:id", deleteAdm);
  
  export default admRouter;

