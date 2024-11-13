import jwt from 'jsonwebtoken';
import UserList from '../models/user/UsersList.js';

export const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    tipo: user.tipo, 
  };

  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });
};

export const login = async (req, res) => {
  const listaUser  = new UserList();
  console.log('Login function called'); 
  try {
    const { email, senha } = req.body;

    const user = await listaUser .getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Here you would normally compare the hashed password using bcrypt
    if (user.senha !== senha) {  // Replace with bcrypt comparison in production
      return res.status(401).json({ message: "Senha incorreta" });
    }

    const token = generateToken(user);
    return res.status(200).json({ message: "Login realizado com sucesso", token, tipo: user.tipo });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: "Erro ao fazer login", error: error.message });
  }
};