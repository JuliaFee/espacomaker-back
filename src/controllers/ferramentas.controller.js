import FerramentaList from "../models/ferramentas/FerramentasList.js"; 
const ferramentaRepository = new FerramentaList();

/* GET: Buscar todas as ferramentas */
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

/* GET: Buscar ferramenta por ID */
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

/* POST: Adicionar nova ferramenta */
export const addFerramenta = async (req, res) => {
    try {
        const { nome, descricao, img, statusF } = req.body;

        // Validar e garantir que statusF seja booleano
        const validStatusF = statusF === "true" || statusF === true;

        const newFerramenta = { 
            nome, 
            descricao, 
            img, 
            statusF: validStatusF  // Garantir que statusF seja booleano
        };

        const ferramenta = await ferramentaRepository.registerFerramenta(newFerramenta);
        return res.status(201).send({ message: "Ferramenta criada com sucesso", ferramenta });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao criar ferramenta", error: error.message });
    }
}

/* PUT: Atualizar ferramenta existente */
export const updateFerramenta = async (req, res) => {
    try {
        console.log("Recebido no update:", req.params, req.body); // Log para depuração

        const { id } = req.params;
        const { nome, descricao, img, statusF } = req.body;

        const ferramentaById = await ferramentaRepository.getFerramentaById(id);
        console.log("Ferramenta encontrada:", ferramentaById); // Log para depuração

        if (!ferramentaById) {
            return res.status(404).send({ message: "Ferramenta não encontrada" });
        }

        // Verificar se statusF foi enviado. Se não, manter o valor atual.
        const validStatusF = (statusF === undefined || statusF === null) ? ferramentaById.statusF : (statusF === "true" || statusF === true);

        const updatedFerramenta = await ferramentaRepository.updateFerramenta(
            id,
            nome || ferramentaById.nome,
            descricao || ferramentaById.descricao,
            img || ferramentaById.img,
            validStatusF // Garantir que statusF nunca seja null
        );

        return res.status(200).send({ message: "Ferramenta atualizada com sucesso", updatedFerramenta });
    } catch (error) {
        console.error("Erro ao atualizar ferramenta:", error.message); // Log para depuração
        return res.status(500).send({ message: "Erro ao atualizar ferramenta", error: error.message });
    }
}

/* DELETE: Deletar ferramenta */
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
