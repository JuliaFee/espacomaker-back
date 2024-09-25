import AdmList from "../models/adm/AdmList.js";
const admRepository = new AdmList();

export const getAdm = async (req, res) => {
    try {
        const adms = await admRepository.getAdms();
        if (!adms || adms.length === 0) {
            return res.status(404).send({ message: "Não há adms" });
        }
        return res.status(200).send({ totalAdms: adms.length, adms });
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Erro ao buscar adms", error: error.message });
    }
}

export const getAdmById = async (req, res) => {
    try {
        const { id } = req.params;
        const adm = await admRepository.getAdmById(id);
        if (!adm) {
            return res.status(404).send({ message: "Adm não encontrado" });
        }
        return res.status(200).send({ message: "Adm encontrado", adm });
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Erro ao buscar adm", error: error.message });
    }
}

export const addAdm = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const newAdm = { nome, email, senha };
        const adm = await admRepository.registerAdm(newAdm);
        return res
            .status(201)
            .send({ message: "Adm criado com sucesso", adm });
    
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Erro ao criar adm", error: error.message });
    }
}


export const updateAdm = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha } = req.body;
        const admById = await admRepository.getAdmById(id);
        if (!admById) {
            return res.status(404).send({ message: "Adm não encontrado" });
        }

        const updateAdm = await admRepository.updateAdm(
            id,
            nome, 
            email, 
            senha);
        return res
            .status(200)
            .send({ message: "Adm atualizado com sucesso", updateAdm });
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Erro ao atualizar adm", error: error.message });
    }
}

export const deleteAdm = async (req, res) => {
    try {
        const { id } = req.params;
        const adm = await admRepository.getAdmById(id);
        if (!adm) {
            return res.status(404).send({ message: "Adm não encontrado" });
        }
        await admRepository.deleteAdm(id);
        return res.status(200).send({ message: "Adm deletado com sucesso" });
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Erro ao deletar adm", error: error.message });
    }
}