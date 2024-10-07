import { Router } from "express";
import admRouter from "./adm.routes.js";
import ferramentaRouter from "./ferramentas.routes.js";
import impressoraRouter from "./impressora.routes.js";
import reservasRouter from "./reservas.routes.js";
import usersRouter from "./users.routes.js";
import authRouter from "./auth.routes.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send({ message: "Servidor rodando perfeitamente!" });
});

router.use("/adm", admRouter);
router.use("/ferramentas", ferramentaRouter);
router.use("/impressora", impressoraRouter);
router.use("/reservas", reservasRouter);
router.use("/users", usersRouter);
router.use("/login", authRouter)

export { router };
