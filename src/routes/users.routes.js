import { Router } from "express";

import {
  getUsers,
  getUserById,
  registerUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUserById);
usersRouter.post("/", registerUser);
usersRouter.put("/:id", updateUser);
usersRouter.delete("/:id", deleteUser);

export default usersRouter;
