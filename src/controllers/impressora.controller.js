
import Impressora from "../models/impressora/Impressora.js";
import ImpressoraList from "../models/impressora/ImpressoraList.js";

const impressoraRepository = new ImpressoraList();

/* get */
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
};

/* get id */
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
};

/* post */
// Controller
export const addImpressora = async (req, res) => {
    try {
        const { nome, descricao, img, statusI, filamento } = req.body;

        // Validar campos obrigatórios para impressora
        if (!nome || !descricao || !img || statusI === undefined) {
            return res.status(400).send({ message: "Todos os campos são obrigatórios para a impressora." });
        }

        // Verifique se os dados de filamento estão presentes
        if (!filamento || !filamento.tipo || !filamento.cor || !filamento.quantidade || !filamento.valor_por_kg) {
            return res.status(400).send({ message: "Todos os campos de filamento são obrigatórios." });
        }

        // Criar impressora
        const newImpressora = new Impressora(nome, descricao, img, statusI);

        // Inserir a impressora no banco de dados
        const impressora = await impressoraRepository.addImpressora(newImpressora);

        // Criar o filamento relacionado à impressora
        await impressoraRepository.addFilamento({
            id_impressora: impressora.id,
            tipo: filamento.tipo,
            cor: filamento.cor,
            quantidade: filamento.quantidade,
            valor_por_kg: filamento.valor_por_kg
        });

        return res.status(201).send({ message: "Impressora e filamento criados com sucesso", impressora });
    } catch (error) {
        console.error("Erro ao criar impressora:", error);
        return res.status(500).send({ message: "Erro ao criar impressora", error: error.message });
    }
};

/* put */
export const updateImpressora = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, descricao, img, statusI, filamento } = req.body;

        // Verificar se a impressora existe no banco
        const impressoraById = await impressoraRepository.getImpressoraById(id);
        if (!impressoraById) {
            return res.status(404).send({ message: "Impressora não encontrada" });
        }

        // Validar se o campo 'statusI' foi fornecido, pois ele não pode ser nulo
        if (statusI === undefined) {
            return res.status(400).send({ message: "O campo 'statusI' é obrigatório e não pode ser nulo." });
        }

        // Atualizar impressora no banco
        const updatedImpressora = await impressoraRepository.updateImpressora(id, nome, descricao, img, statusI, filamento);
        
        return res.status(200).send({ message: "Impressora atualizada com sucesso", updatedImpressora });
    } catch (error) {
        console.error("Erro ao atualizar impressora:", error);
        return res.status(500).send({ message: "Erro ao atualizar impressora", error: error.message });
    }
};

/* delete */


export const deleteImpressora = async (req, res) => {
    try {
        const { id } = req.params;

        await impressoraRepository.deleteFilamentosByImpressora(id);

        const impressora = await impressoraRepository.getImpressoraById(id);
        if (!impressora) {
            return res.status(404).send({ message: "Impressora não encontrada" });
        }
        await impressoraRepository.deleteImpressora(id);

        return res.status(200).send({ message: "Impressora deletada com sucesso" });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao deletar impressora", error: error.message });
    }
};


