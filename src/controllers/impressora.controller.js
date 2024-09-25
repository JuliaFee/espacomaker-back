import Impressora from "../models/impressora/Impressora.js";
import ImpressoraList from "../models/impressora/ImpressoraList.js";

const impressoraRepository = new ImpressoraList();

export const getImpressora = async (req, res) => {
    try {
        const impressoras = await impressoraRepository.getImpressoras();
        if (!impressoras || impressoras.length === 0) {
            return res.status(404).send({ message: "Não há impressoras" });
        }
        return res.status(200).send({ totalImpressoras: impressoras.length, impressoras });
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Erro ao buscar impressoras", error: error.message });
    }
}

export const getImpressoraById = async (req, res) => {
    try {
        const { id } = req.params;
        const impressora = await impressoraRepository.getImpressoraById(id);
        if (!impressora) {
            return res.status(404).send({ message: "Impressora não encontrada" });
        }
        return res.status(200).send({ message: "Impressora encontrada", impressora });
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Erro ao buscar impressora", error: error.message });
    }
}

export const addImpressora = async (req, res) => {
    try {
        const { nome, descricao, img, statusI, valor } = req.body;
        const newImpressora = new Impressora( nome, descricao, img, statusI, valor);
        const impressora = await impressoraRepository.addImpressora(newImpressora);
        return res
            .status(201)
            .send({ message: "Impressora criada com sucesso", impressora });
    
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Erro ao criar impressora", error: error.message });
    }
}


export const updateImpressora = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, descricao, img, statusI, valor } = req.body;
        const impressoraById = await impressoraRepository.getImpressoraById(id);
        if (!impressoraById) {
            return res.status(404).send({ message: "Impressora não encontrada" });
        }

        const updateImpressora = await impressoraRepository.updateImpressora(
            id,
            nome, 
            descricao, 
            img, 
            statusI, 
            valor);
        return res
            .status(200)
            .send({ message: "Impressora atualizada com sucesso", updateImpressora });
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Erro ao atualizar impressora", error: error.message });
    }
}

export const deleteImpressora = async (req, res) => {
    try {
        const { id } = req.params;
        const impressora = await impressoraRepository.getImpressoraById(id);
        if (!impressora) {
            return res.status(404).send({ message: "Impressora não encontrada" });
        }
        await impressoraRepository.deleteImpressora(id);
        return res.status(200).send({ message: "Impressora deletada com sucesso" });
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Erro ao deletar impressora", error: error.message });
    }
}