CREATE TABLE adm (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  senha VARCHAR(50) NOT NULL
);

CREATE TABLE ferramentas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  img VARCHAR(255) NOT NULL,
  status BOOLEAN NOT NULL
)

CREATE TABLE impressora (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  img VARCHAR(255) NOT NULL,
  status BOOLEAN NOT NULL, 
  valor FLOAT NOT NULL
)

CREATE TABLE reserva (
  id SERIAL PRIMARY KEY,
  id_user VARCHAR(36) NOT NULL,
  id_item VARCHAR(36) NOT NULL,
  tipo_item VARCHAR(36) NOT NULL,
  data_reserva DATE NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fim TIME NOT NULL,
  status_reserva BOOLEAN NOT NULL
)

CREATE TABLE user (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  turma VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL
);

INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Alicate 6', 'Alicate de pequeno porte, ideal para cortes e apertos em trabalhos manuais ou elétricos.', 'https://i.imgur.com/IZTi37d.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Alicate 6-2', 'Alicate de pequeno porte, ideal para cortes e apertos em trabalhos manuais ou elétricos.', 'https://i.imgur.com/ylB6Tdi.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Alicate 8', 'Versão maior do licate oferencendo maior avalancagem para tarefas que requerem mais força.', 'https://i.imgur.com/V5kHVNA.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Alicate 8-2', 'Versão maior do licate oferencendo maior avalancagem para tarefas que requerem mais força.', 'https://i.imgur.com/n1vQe7r.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Alicate de Bico', 'Ferramenta com pontas finas, perfeita para manusear objetos pequenos e realizar trabalhos de precisão.', 'https://i.imgur.com/C2W3ipz.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Alicate de Bico-2', 'Ferramenta com pontas finas, perfeita para manusear objetos pequenos e realizar trabalhos de precisão.', 'https://i.imgur.com/TRXEBPJ.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Alicate de Condução', 'Utilizado para manuseio de fios e cabos em instlações elétricas.', 'https://i.imgur.com/sWkHPs7.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Alicate Desempacador de Fio Tramontina', 'Ferramenta projetada para remover a isolação de fios facilitando conexões elétricas.', 'https://i.imgur.com/nkeJVUW.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Alicate para Anéis Externos Curvos', 'Ideal para a instalação e remoção de anéis externos curvos em peças mecânicas.', 'https://i.imgur.com/Y25XwOw.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Alicate para Anéis Externos Retos', 'Ideal para a instalação e remoção de anéis externos retos, útil em montagens e desmontagens. ', 'https://i.imgur.com/6iJh9Zs.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Alicate para Anéis Externos Retos-2', 'Ideal para a instalação e remoção de anéis externos retos, útil em montagens e desmontagens. ', 'https://i.imgur.com/MqF1Yzq.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Alicate para Aplicação de Lacre', 'Usado para fixar lacres em produtos garantindo segurança em embalagens.', 'https://i.imgur.com/6Yfz9Rm.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Base para Ferro de Solda', 'Superfíce estável para suportar o ferro da solda, evitando acidentes e danos.', 'https://i.imgur.com/9gs8xHq.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Caneta de Polaridade', 'Instrumento que verifica a polaridade de circuitos elétricos, essencial para trabalhos elétricos seguros. ', 'https://i.imgur.com/6j8tXaj.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Chave de Fenda Ponta Cruzada', 'Ferramenta comum para aperar e afrouxar parafusos com cabeça e cruz.', 'https://i.imgur.com/uWjuE2H.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Chave de Fenda Ponta Cruzada-2', 'Ferramenta comum para aperar e afrouxar parafusos com cabeça e cruz.', 'https://i.imgur.com/F8fT3Ic.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Oute CNC', 'Ferramenta CNC (Controle Numérico Computadorizado) utilizada para cortes e gravações em materiais diversos.', 'https://i.imgur.com/SvJ4eU7.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Cola de Madeira', 'Adesivo especializado para unir peças de madeira, garantindo resistência e durabilidade.', 'https://i.imgur.com/US9EBgE.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Cola Quente-1', 'Cola em bastão que derrete em pistolas de cola quente, ideal para fixações rápidas e temporárias.', 'https://i.imgur.com/wXTYXGo.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Cola Quente-2', 'Cola em bastão que derrete em pistolas de cola quente, ideal para fixações rápidas e temporárias.', 'https://i.imgur.com/ph5eASu.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Cola Quente-3', 'Cola em bastão que derrete em pistolas de cola quente, ideal para fixações rápidas e temporárias.', 'https://i.imgur.com/ZI1tooI.jpg', true);
