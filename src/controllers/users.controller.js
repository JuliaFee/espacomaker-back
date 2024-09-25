import User from "../models/user/Users.js";
import UserList from "../models/user/UsersList.js";

const UserList_A = new UserList();

// Função para listar todos os usuários (GET)
export const getUsers = async (req, res) => {
  try {
    const users = await UserList_A.getUsers();
    if (!users || users.length === 0) {
      return res.status(404).send({ message: "Não há usuários cadastrados" });
    }
    return res.status(200).send({ totalUsers: users.length, users });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar usuários", error: error.message });
  }
};

// Função para buscar um usuário por ID (GET)
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserList_A.getUserById(id);
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    return res.status(200).send({ message: "Usuário encontrado", user });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar usuário", error: error.message });
  }
};

// Função para buscar um usuário por email (GET)
export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await UserList_A.getUserByEmail(email);
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    return res.status(200).send({ message: "Usuário encontrado", user });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar usuário", error: error.message });
  }
};

// Função para criar um novo usuário (POST)
export const addUser = async (req, res) => {
  try {
    const { nome, email, turma, senha } = req.body;

    const userAlreadyExists = await UserList_A.getUserByEmail(email);
    if (userAlreadyExists) {
      return res.status(409).send({ message: "Usuário já cadastrado" });
    }

    const user = new User(nome, email, turma, senha);
    await UserList_A.addUser(user);

    return res.status(201).send({ message: "Usuário criado com sucesso", user });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao criar usuário", error: error.message });
  }
};

// Função para atualizar um usuário existente (PUT)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, turma, senha } = req.body;

    // Verifica se o usuário existe
    const userById = await UserList_A.getUserById(id);
    if (!userById) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    // Atualiza os dados do usuário
    const updatedUser = await UserList_A.updateUser(
      id,
      nome,
      email,
      turma,
      senha
    );

    return res.status(200).send({ message: "Usuário atualizado com sucesso", updatedUser });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao atualizar usuário", error: error.message });
  }
};

// Função para deletar um usuário (DELETE)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o usuário existe
    const user = await UserList_A.getUserById(id);
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    // Deleta o usuário
    await UserList_A.deleteUser(id);

    return res.status(200).send({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao deletar usuário", error: error.message });
  }
};
