import FilamentoList from "../models/filamento/FilamentoList.js";
const filamentoRepository = new FilamentoList();

export const getFilamentos = async (req, res) => {
  try {
    const filamentos = await filamentoRepository.getFilamentos();
    if (!filamentos || filamentos.length === 0) {
      return res.status(404).send({ message: "Não há filamentos" });
    }
    return res.status(200).send({ totalFilamentos: filamentos.length, filamentos });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar filamentos", error: error.message });
  }
};

export const getFilamentoById = async (req, res) => {
  try {
    const { id } = req.params;
    const filamento = await filamentoRepository.getFilamentoById(id);
    if (!filamento) {
      return res.status(404).send({ message: "Filamento não encontrado" });
    }
    return res.status(200).send({ message: "Filamento encontrado", filamento });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar filamento", error: error.message });
  }
};

export const addFilamento = async (req, res) => {
  try {
    const { id_impressora, tipo, cor, quantidade, valor_por_kg } = req.body;
    const newFilamento = { id_impressora, tipo, cor, quantidade, valor_por_kg };
    const filamento = await filamentoRepository.registerFilamento(newFilamento);
    return res.status(201).send({ message: "Filamento criado com sucesso", filamento });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao criar filamento", error: error.message });
  }
};

export const updateFilamento = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_impressora, tipo, cor, quantidade, valor_por_kg } = req.body;
    const filamentoById = await filamentoRepository.getFilamentoById(id);
    if (!filamentoById) {
      return res.status(404).send({ message: "Filamento não encontrado" });
    }

    const updatedFilamento = await filamentoRepository.updateFilamento(
      id,
      id_impressora,
      tipo,
      cor,
      quantidade,
      valor_por_kg
    );
    return res.status(200).send({ message: "Filamento atualizado com sucesso", updatedFilamento });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao atualizar filamento", error: error.message });
  }
};

export const deleteFilamento = async (req, res) => {
  try {
    const { id } = req.params;
    const filamento = await filamentoRepository.getFilamentoById(id);
    if (!filamento) {
      return res.status(404).send({ message: "Filamento não encontrado" });
    }
    await filamentoRepository.deleteFilamento(id);
    return res.status(200).send({ message: "Filamento deletado com sucesso" });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao deletar filamento", error: error.message });
  }
};
