import jwt from 'jsonwebtoken';
import UserList from '../models/user/UsersList.js';

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    // Add other relevant information here
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '1h', // Token expires in 1 hour
  });

  return token;
};

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verifica se o usuário existe
    const user = await UserList.getUserByEmail(email);
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    // Verifica se a senha está correta
    if (user.senha !== senha) {
      return res.status(401).send({ message: "Senha incorreta" });
    }

    // Se tudo estiver ok, retorna um token de acesso
    const token = generateToken(user);
    return res.status(200).send({ message: "Login realizado com sucesso", token });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao fazer login", error: error.message });
  }
};