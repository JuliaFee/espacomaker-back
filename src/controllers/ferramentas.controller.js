import FerramentaList from "../models/ferramentas/FerramentasList.js"; 
const ferramentaRepository = new FerramentaList();

/*get*/ 
export const getFerramentas = async (req, res) => {
    try {
        const ferramentas = await ferramentaRepository.getFerramentas();
        if (!ferramentas || ferramentas.length === 0) {
            return res.status(404).send({ message: "Não há ferramentas" });
        }
        return res.status(200).send({ totalFerramentas: ferramentas.length, ferramentas });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar ferramentas", error: error.message });
    }
}

/*get id*/ 
export const getFerramentaById = async (req, res) => {
    try {
        const { id } = req.params;
        const ferramenta = await ferramentaRepository.getFerramentaById(id);
        if (!ferramenta) {
            return res.status(404).send({ message: "Ferramenta não encontrada" });
        }
        return res.status(200).send({ message: "Ferramenta encontrada", ferramenta });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar ferramenta", error: error.message });
    }
}

/*post*/ 
export const addFerramenta = async (req, res) => {
    try {
        const { nome, descricao, img, statusF = true } = req.body; 
        const newFerramenta = { nome, descricao, img, statusF };
        const ferramenta = await ferramentaRepository.registerFerramenta(newFerramenta);
        return res.status(201).send({ message: "Ferramenta criada com sucesso", ferramenta });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao criar ferramenta", error: error.message });
    }
}

/*put*/ 
export const updateFerramenta = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, descricao, img, statusF = true } = req.body; 

        const ferramentaById = await ferramentaRepository.getFerramentaById(id);
        if (!ferramentaById) {
            return res.status(404).send({ message: "Ferramenta não encontrada" });
        }

        const updatedFerramenta = await ferramentaRepository.updateFerramenta(id, nome, descricao, img, statusF);
        return res.status(200).send({ message: "Ferramenta atualizada com sucesso", updatedFerramenta });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao atualizar ferramenta", error: error.message });
    }
}


/*delete*/ 
export const deleteFerramenta = async (req, res) => {
    try {
        const { id } = req.params;
        const ferramenta = await ferramentaRepository.getFerramentaById(id);
        if (!ferramenta) {
            return res.status(404).send({ message: "Ferramenta não encontrada" });
        }
        await ferramentaRepository.deleteFerramenta(id);
        return res.status(200).send({ message: "Ferramenta deletada com sucesso" });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao deletar ferramenta", error: error.message });
    }
}