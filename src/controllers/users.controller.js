import UserList from "./../models/user/UsersList.js"; 
import jwt from 'jsonwebtoken'; 
import bcrypt from 'bcrypt'; 

const userRepository = new UserList();
const JWT_SECRET = '123'; 

/* Register User */ 
export const registerUser = async (req, res) => {
    try {
        const { nome, email, senha, tipo } = req.body;

        const newUser = { nome, email, senha, tipo };

        const user = await userRepository.addUser(newUser);
        return res.status(201).send({ message: "Usuário criado com sucesso", user });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao criar usuário", error: error.message });
    }
}


/* Login User */ 
export const loginUser = async (req, res) => {
    const { email, senha } = req.body; 

    try {
        const usuario = await userRepository.getUserByEmail(email);

        if (!usuario) {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
        }

        if (senha !== usuario.senha) {
            return res.status(401).json({ success: false, message: 'Senha incorreta' });
        }

        const token = jwt.sign({ id: usuario._id }, JWT_SECRET, { expiresIn: '1h' });

        return res.json({
            success: true,
            message: 'Login bem-sucedido',
            token,
            usuario: {
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo,
            },
        });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({ success: false, message: 'Erro no servidor' });
    }
};



/* Get Users */ 
export const getUsers = async (req, res) => {
    try {
        const users = await userRepository.getUsers();
        return res.status(200).send({ message: "Usuários encontrados", users });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar usuários", error: error.message });
    }
};

/* Get User by ID */ 
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userRepository.getUserById(id);
        if (!user) {
            return res.status(404).send({ message: "Usuário não encontrado" });
        }
        return res.status(200).send({ message: "Usuário encontrado", user });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar usuário", error: error.message });
    }
}

/* Update User */ 
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha, tipo } = req.body;

        const userById = await userRepository.getUserById(id); 
        if (!userById) {
            return res.status(404).send({ message: "Usuário não encontrado" });
        }

        const hashedPassword = senha ? await bcrypt.hash(senha, 10) : userById.senha;
        
        const updatedUser = await userRepository.updateUser(id, nome, email, hashedPassword, tipo);
        return res.status(200).send({ message: "Usuário atualizado com sucesso", updatedUser });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao atualizar usuário", error: error.message });
    }
}

/* Delete User */ 
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userRepository.getUserById(id); 
        if (!user) {
            return res.status(404).send({ message: "Usuário não encontrado" });
        }
        await userRepository.deleteUser(id);
        return res.status(200).send({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao deletar usuário", error: error.message });
    }
}
