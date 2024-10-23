import UserList from "./../models/user/UsersList.js"; 
import jwt from 'jsonwebtoken'; // Import JWT library
const userRepository = new UserList();
const JWT_SECRET = '123'; // Substitua pelo seu segredo real

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
    const { nome, email, senha } = req.body; // Expecting POST request with JSON body

    try {
        // Check if user exists
        const usuario = await userRepository.getUserByEmail(email); // Assuming you have this method

        if (!usuario) {
            return res.json({ success: false, message: 'Usuário não encontrado' });
        }

        // Check password
        const senhaCorreta = await usuario.comparePassword(senha); // Ensure comparePassword is correctly defined

        if (!senhaCorreta) {
            return res.json({ success: false, message: 'Senha incorreta' });
        }

        // Successful login
        return res.json({
            success: true,
            message: 'Login bem-sucedido',
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

        const userById = await userRepository.getUserById(id); // Nome da função corrigido
        if (!userById) {
            return res.status(404).send({ message: "Usuário não encontrado" });
        }

        // Corrigido para passar parâmetros separados
        const updatedUser = await userRepository.updateUser(id, nome, email, senha, tipo);
        return res.status(200).send({ message: "Usuário atualizado com sucesso", updatedUser });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao atualizar usuário", error: error.message });
    }
}

/* Delete User */ 
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userRepository.getUserById(id); // Nome da função corrigido
        if (!user) {
            return res.status(404).send({ message: "Usuário não encontrado" });
        }
        await userRepository.deleteUser(id);
        return res.status(200).send({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao deletar usuário", error: error.message });
    }
}
