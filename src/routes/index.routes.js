import { Router } from "express";
import ferramentaRouter from "./ferramentas.routes.js";
import impressoraRouter from "./impressora.routes.js";
import reservasRouterImpressora from "./reserva_impressora.routes.js";
import reservasRouterFerramenta from "./reserva_ferramenta.routes.js";
import usersRouter from "./users.routes.js";
import horarioRouter from "./horario.routes.js";
import filamentoRouter from "./filamento.routes.js";
import authRouter from "./auth.routes.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send({ message: "Servidor rodando perfeitamente!" });
});


router.use("/ferramentas", ferramentaRouter);
router.use("/horarios", horarioRouter);
router.use("/impressora", impressoraRouter);
router.use("/reservas-impressora", reservasRouterImpressora);
router.use("/reservas-ferramenta", reservasRouterFerramenta);
router.use("/users", usersRouter);
router.use("/filamentos", filamentoRouter);
router.use("/login", authRouter); 


export { router };
