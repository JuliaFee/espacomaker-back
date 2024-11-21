export default class Ferramentas {
    constructor(nome, descricao, img, statusF) {
      this.nome = nome;
      this.descricao = descricao;
      this.img = img;
      this.statusF = Boolean(statusF); // Garantir que statusF seja booleano
    }
  }
  