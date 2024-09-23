import { hash } from "bcrypt";
import User from "../models/user/Users.js";
import UsersRepository from "../models/user/UsersRepository.js";

const usersRepository = new UsersRepository();

export const getUsers = async (req, res) => {
  try {
    const users = await usersRepository.getUsers();
    if (!users || users.length === 0) {
      return res.status(404).send({ message: "Não há usuários cadastrados" });
    }
    return res.status(200).send({ totalUsers: users.length, users });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Erro ao buscar usuários", error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersRepository.getUserById(id);
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    return res.status(200).send({ message: "Usuário encontrado", user });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Erro ao buscar usuário", error: error.message });
  }
};

export const addUser = async (req, res) => {
  try {
    const { nome, email, turma, senha } = req.body;
    const userAlreadyExists = await usersRepository.getUserByEmail(email);
    if (userAlreadyExists) {
      return res.status(409).send({ message: "Usuário já cadastrado" });
    }
    const senhaHash = await hash(senha, 8);
    const user = new User(nome, email, turma, senhaHash);
    await usersRepository.addUser(user);
    return res
      .status(201)
      .send({ message: "Usuário criado com sucesso", user });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Erro ao criar usuário", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, turma, senha } = req.body;
    const userById = await usersRepository.getUserById(id);
    if (!userById) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    const userByEmail = await usersRepository.getUserByEmail(email);
    if (userByEmail && userByEmail.id !== id) {
      return res.status(409).send({ message: "Email já cadastrado" });
    }
    const senhaHash = await hash(senha, 8);
    const updatedUser = await usersRepository.updateUser(
      id,
      nome,
      email,
      turma,
      senhaHash
    );
    return res
      .status(200)
      .send({ message: "Usuário atualizado com sucesso", updatedUser });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Erro ao atualizar usuário", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersRepository.getUserById(id);
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    await usersRepository.deleteUser(id);
    return res.status(200).send({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Erro ao deletar usuário", error: error.message });
  }
};
