import Impressora from "../models/impressora/Impressora.js";
import ImpressoraList from "../models/impressora/ImpressoraList.js";

const impressoraRepository = new ImpressoraList();

/*get*/ 
export const getImpressora = async (req, res) => {
    try {
        const impressoras = await impressoraRepository.getImpressoras();
        if (!impressoras || impressoras.length === 0) {
            return res.status(404).send({ message: "Não há impressoras" });
        }
        return res.status(200).send({ totalImpressoras: impressoras.length, impressoras });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar impressoras", error: error.message });
    }
}

/*get id*/ 
export const getImpressoraById = async (req, res) => {
    try {
        const { id } = req.params;
        const impressora = await impressoraRepository.getImpressoraById(id);
        if (!impressora) {
            return res.status(404).send({ message: "Impressora não encontrada" });
        }
        return res.status(200).send({ message: "Impressora encontrada", impressora });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar impressora", error: error.message });
    }
}

/*post*/ 
export const addImpressora = async (req, res) => {
    try {
        console.log("Dados recebidos:", req.body);
        const { nome, descricao, img, statusI, filamento } = req.body;

        // Adicionar uma verificação para garantir que 'statusI' é um booleano
        if (statusI === undefined) {
            return res.status(400).send({ message: "statusI é um campo obrigatório." });
        }

        const newImpressora = new Impressora(nome, descricao, img, statusI, filamento);
        const impressora = await impressoraRepository.addImpressora(newImpressora);
        return res.status(201).send({ message: "Impressora criada com sucesso", impressora });
    } catch (error) {
        console.error("Erro ao criar impressora:", error);
        return res.status(500).send({ message: "Erro ao criar impressora", error: error.message });
    }
};



  

/*put*/ 
export const updateImpressora = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, descricao, img, statusI, filamento } = req.body;

        const impressoraById = await impressoraRepository.getImpressoraById(id);
        if (!impressoraById) {
            return res.status(404).send({ message: "Impressora não encontrada" });
        }

        // Verificar se statusI é booleano
        if (typeof statusI !== 'boolean') {
            return res.status(400).send({ message: "statusI é obrigatório e deve ser true ou false." });
        }

        // Verificar se filamento é válido, caso esteja indefinido ou nulo, atribuir um valor padrão (exemplo: 0)
        if (filamento === undefined || filamento === null) {
            return res.status(400).send({ message: "filamento é obrigatório e não pode ser nulo." });
        }

        const updatedImpressora = await impressoraRepository.updateImpressora(
            id,
            nome,
            descricao,
            img,
            statusI,
            filamento // Aqui garantimos que filamento tenha um valor válido
        );

        return res.status(200).send({ message: "Impressora atualizada com sucesso", updatedImpressora });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao atualizar impressora", error: error.message });
    }
};


/*delete*/ 
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
        return res.status(500).send({ message: "Erro ao deletar impressora", error: error.message });
    }
}