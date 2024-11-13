import { Router } from "express";

import {
  getUsers,
  getUserById,
  registerUser,
  updateUser,
  deleteUser,
  loginUser
} from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUserById);
usersRouter.post("/", registerUser);
usersRouter.put("/:id", updateUser);
usersRouter.delete("/:id", deleteUser);
usersRouter.post("/login", loginUser);

export default usersRouter;
