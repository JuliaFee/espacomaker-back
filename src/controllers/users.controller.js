import UserList from "../models/user/UserList.js"; 
import jwt from 'jsonwebtoken'; // Import JWT library
const userRepository = new UserList();
const JWT_SECRET = '123'; // Replace with your actual secret

/*post*/ 
export const registerUser  = async (req, res) => {
    try {
        const { nome, email, senha, tipo } = req.body;
        const newUser  = { nome, email, senha, tipo };
        const user = await userRepository.registerUser (newUser );
        return res.status(201).send({ message: "Usuário criado com sucesso", user });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao criar usuário", error: error.message });
    }
}

/*login*/ 
export const loginUser  = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const user = await userRepository.getUserByEmail(email); // Corrected function name

        if (!user || user.senha !== senha) { // Direct comparison without hashing
            return res.status(401).send({ message: "Credenciais inválidas" });
        }

        // Generate token
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour

        return res.status(200).send({ message: "Login bem-sucedido", user, token }); // Include token in response
    } catch (error) {
        return res.status(500).send({ message: "Erro ao fazer login", error: error.message });
    }
}

/*get*/ 
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userRepository.getUserById(id); // Corrected function name
        if (!user) {
            return res.status(404).send({ message: "Usuário não encontrado" });
        }
        return res.status(200).send({ message: "Usuário encontrado", user });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar usuário", error: error.message });
    }
}
/*put*/ 
export const updateUser  = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha, tipo } = req.body;

        const userById = await userRepository.getUserById(id); // Corrected function name
        if (!userById) {
            return res.status(404).send({ message: "Usuário não encontrado" });
        }

        const updatedUser  = await userRepository.updateUser (id, { nome, email, senha, tipo });
        return res.status(200).send({ message: "Usuário atualizado com sucesso", updatedUser  });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao atualizar usuário", error: error.message });
    }
}

/*delete*/ 
export const deleteUser  = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userRepository.getUserById(id); // Corrected function name
        if (!user) {
            return res.status(404).send({ message: "Usuário não encontrado" });
        }
        await userRepository.deleteUser (id);
        return res.status(200).send({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao deletar usuário", error: error.message });
    }
}