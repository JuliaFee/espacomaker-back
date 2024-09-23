import User from "../models/user/Users.js";
import UsersRepository from "../models/user/UsersRepository.js";

const usersRepository = new UsersRepository();

// Função para listar todos os usuários (GET)
export const getUsers = async (req, res) => {
  try {
    const users = await usersRepository.getUsers();
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
    const user = await usersRepository.getUserById(id);
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
    const user = await usersRepository.getUserByEmail(email);
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

    // Verifica se o usuário já existe pelo email
    const userAlreadyExists = await usersRepository.getUserByEmail(email);
    if (userAlreadyExists) {
      return res.status(409).send({ message: "Usuário já cadastrado" });
    }

    // Cria um novo usuário
    const user = new User(nome, email, turma, senha);
    await usersRepository.addUser(user);

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
    const userById = await usersRepository.getUserById(id);
    if (!userById) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    // Verifica se o email já está sendo usado por outro usuário
    const userByEmail = await usersRepository.getUserByEmail(email);
    if (userByEmail && userByEmail.id !== id) {
      return res.status(409).send({ message: "Email já cadastrado" });
    }

    // Atualiza os dados do usuário
    const updatedUser = await usersRepository.updateUser(
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
    const user = await usersRepository.getUserById(id);
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    // Deleta o usuário
    await usersRepository.deleteUser(id);

    return res.status(200).send({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao deletar usuário", error: error.message });
  }
};
