import jwt from 'jsonwebtoken';
import UserList from '../models/user/UsersList.js';

export const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    tipo: user.tipo, 
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });

  return token;
};

export const login = async (req, res) => {
  const listaUser = new UserList();
  console.log('Login function called'); 
  try {
    const { email, senha } = req.body;

    const user = await listaUser.getUserByEmail(email);
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    if (user.senha !== senha) {
      return res.status(401).send({ message: "Senha incorreta" });
    }

    const token = generateToken(user);
    return res.status(200).send({ message: "Login realizado com sucesso", token, tipo: user.tipo });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao fazer login", error: error.message });
  }
};
