DROP TABLE IF EXISTS reservas;
DROP TABLE IF EXISTS impressoras;
DROP TABLE IF EXISTS ferramentas;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS filamentos;
DROP TABLE IF EXISTS horarios;


-- Tabela users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('user', 'adm'))
);

-- Tabela ferramentas
CREATE TABLE ferramentas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  img VARCHAR(255),
  statusF BOOLEAN NOT NULL DEFAULT TRUE 
);

-- Tabela impressoras
CREATE TABLE impressoras (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  img VARCHAR(255),
  statusI BOOLEAN NOT NULL DEFAULT TRUE,
  filamento FLOAT NOT NULL 
);

-- Tabela filamentos
CREATE TABLE filamentos (
  id SERIAL PRIMARY KEY,
  id_impressora INT NOT NULL,
  tipo VARCHAR(100) NOT NULL,
  cor VARCHAR(50) NOT NULL,
  quantidade FLOAT NOT NULL,
  valor_por_kg FLOAT NOT NULL,
  FOREIGN KEY (id_impressora) REFERENCES impressoras (id)
);

-- Tabela reservas
CREATE TABLE reservas (
  id SERIAL PRIMARY KEY,
  id_user INT NOT NULL,
  id_ferramenta INT,
  id_impressora INT,
  id_horario INT,
  data_reserva DATE NOT NULL,
  status_reserva BOOLEAN NOT NULL DEFAULT FALSE, 
  FOREIGN KEY (id_user) REFERENCES users (id),
  FOREIGN KEY (id_ferramenta) REFERENCES ferramentas (id),
  FOREIGN KEY (id_impressora) REFERENCES impressoras (id)
);

CREATE TABLE horarios (
  id SERIAL PRIMARY KEY,
  id_impressora INT NOT NULL,
  id_ferramenta INT,
  hora_inicio TIME NOT NULL,
  hora_fim TIME NOT NULL,
  FOREIGN KEY (id_impressora) REFERENCES impressoras (id),
  FOREIGN KEY (id_ferramenta) REFERENCES ferramentas (id)
);

-- Ferramentas
INSERT INTO ferramentas (nome, descricao, img, statusF) VALUES 
('Alicate 6', 'Alicate de pequeno porte, ideal para cortes e apertos em trabalhos manuais ou elétricos.', 'https://i.imgur.com/IZTi37d.jpg', true),
('Alicate 6-2', 'Alicate de pequeno porte, ideal para cortes e apertos em trabalhos manuais ou elétricos.', 'https://i.imgur.com/ylB6Tdi.jpg', true),
('Alicate 8', 'Versão maior do alicate oferecendo maior alavancagem para tarefas que requerem mais força.', 'https://i.imgur.com/V5kHVNA.jpg', true),
('Alicate 8-2', 'Versão maior do alicate oferecendo maior alavancagem para tarefas que requerem mais força.', 'https://i.imgur.com/n1vQe7r.jpg', true),
('Alicate de Bico', 'Ferramenta com pontas finas, perfeita para manusear objetos pequenos e realizar trabalhos de precisão.', 'https://i.imgur.com/C2W3ipz.jpg', true),
('Alicate de Bico-2', 'Ferramenta com pontas finas, perfeita para manusear objetos pequenos e realizar trabalhos de precisão.', 'https://i.imgur.com/TRXEBPJ.jpg', true),
('Alicate de Condução', 'Utilizado para manuseio de fios e cabos em instalações elétricas.', 'https://i.imgur.com/sWkHPs7.jpg', true),
('Alicate Desempacador de Fio Tramontina', 'Ferramenta projetada para remover a isolação de fios facilitando conexões elétricas.', 'https://i.imgur.com/nkeJVUW.jpg', true),
('Alicate para Anéis Externos Curvos', 'Ideal para a instalação e remoção de anéis externos curvos em peças mecânicas.', 'https://i.imgur.com/Y25XwOw.jpg', true),
('Alicate para Anéis Externos Retos', 'Ideal para a instalação e remoção de anéis externos retos, útil em montagens e desmontagens.', 'https://i.imgur.com/6iJh9Zs.jpg', true),
('Alicate para Anéis Externos Retos-2', 'Ideal para a instalação e remoção de anéis externos retos, útil em montagens e desmontagens.', 'https://i.imgur.com/MqF1Yzq.jpg', true),
('Alicate para Aplicação de Lacre', 'Usado para fixar lacres em produtos garantindo segurança em embalagens.', 'https://i.imgur.com/6Yfz9Rm.jpg', true),
('Base para Ferro de Solda', 'Superfície estável para suportar o ferro da solda, evitando acidentes e danos.', 'https://i.imgur.com/9gs8xHq.jpg', true),
('Caneta de Polaridade', 'Instrumento que verifica a polaridade de circuitos elétricos, essencial para trabalhos elétricos seguros.', 'https://i.imgur.com/6j8tXaj.jpg', true),
('Chave de Fenda Ponta Cruzada', 'Ferramenta comum para apertar e afrouxar parafusos com cabeça e cruz.', 'https://i.imgur.com/uWjuE2H.jpg', true),
('Chave de Fenda Ponta Cruzada-2', 'Ferramenta comum para apertar e afrouxar parafusos com cabeça e cruz.', 'https://i.imgur.com/F8fT3Ic.jpg', true),
('Oute CNC', 'Ferramenta CNC (Controle Numérico Computadorizado) utilizada para cortes e gravações em materiais diversos.', 'https://i.imgur.com/SvJ4eU7.jpg', true),
('Cola de Madeira', 'Adesivo especializado para unir peças de madeira, garantindo resistência e durabilidade.', 'https://i.imgur.com/US9EBgE.jpg', true),
('Cola Quente-1', 'Cola em bastão que derrete em pistolas de cola quente, ideal para fixações rápidas e temporárias.', 'https://i.imgur.com/wXTYXGo.jpg', true),
('Cola Quente-2', 'Cola em bastão que derrete em pistolas de cola quente, ideal para fixações rápidas e temporárias.', 'https://i.imgur.com/ph5eASu.jpg', true),
('Cola Quente-3', 'Cola em bastão que derrete em pistolas de cola quente, ideal para fixações rápidas e temporárias.', 'https://i.imgur.com/ZI1tooI.jpg', true),
('Espátula', 'Ferramenta de mão usada para espalhar ou remover materiais, como massas e tintas.', 'https://i.imgur.com/tg85XRG.jpg', true),
('Espátula-2', 'Ferramenta de mão usada para espalhar ou remover materiais, como massas e tintas.', 'https://i.imgur.com/KfI70RB.jpg', true),
('Espátula-3', 'Ferramenta de mão usada para espalhar ou remover materiais, como massas e tintas.', 'https://i.imgur.com/N0fgYzo.jpg', true),
('Fita Métrica 5m Starrett', 'Instrumento de medição portátil útil para edições precisas em diversas aplicações.', 'https://i.imgur.com/CZlXvQZ.jpg', true),
('Fita Métrica 5m Starrett-2', 'Instrumento de medição portátil útil para edições precisas em diversas aplicações.', 'https://i.imgur.com/01Cv6TQ.jpg', true),
('Fita PVC cor Chumbo', 'Fita adesiva de PVC, resistente à umidade e ideal para isolamento elétrico.', 'https://i.imgur.com/R3pgmSt.jpg', true),
('Fuadeira/Parafusadeira', 'Ferramenta elétrica que combina funções de perfuração e parafusamento, versátil para diversos projetos.', 'https://i.imgur.com/BdV3CRQ.jpg', true),
('Fuadeira/Parafusadeira-2', 'Ferramenta elétrica que combina funções de perfuração e parafusamento, versátil para diversos projetos.', 'https://i.imgur.com/npP4HFt.jpg', true),
('Gedore 1/4X4 6X100', 'Conjunto de chaves soquete, de alta qualidade usadas em montagem e manutenção de máquinas.', 'https://i.imgur.com/5k1r1i5.jpg', true),
('Gedore 1/4X4 6X100-2', 'Conjunto de chaves soquete, de alta qualidade usadas em montagem e manutenção de máquinas.', 'https://i.imgur.com/25H2hMp.jpg', true),
('Gedore 1/8X4 3X100', 'Outro conjunto de chaves soquete com medidas específicas para acessibilidade em espaços reduzidos.', 'https://i.imgur.com/huZ5xwh.jpg', true),
('Gedore 1/8X4 3X100-2', 'Outro conjunto de chaves soquete com medidas específicas para acessibilidade em espaços reduzidos.', 'https://i.imgur.com/ee9UeUL.jpg', true),
('Gedore 1/8X6 3X150', 'Chaves soquetes de diferentes tamanhos, apropriadas para tarefas em áreas mais apertadas.', 'https://i.imgur.com/RjM0pEw.jpg', true),
('Gedore 1/8X6 3X150-2', 'Chaves soquetes de diferentes tamanhos, apropriadas para tarefas em áreas mais apertadas.', 'https://i.imgur.com/C0HvGGg.jpg', true);

-- Impressoras
INSERT INTO impressoras (nome, descricao, img, statusI, filamento) VALUES 
('Impressora 1', 'Impressora 3D de alto desempenho para projetos complexos.', 'https://i.imgur.com/abcdefg.jpg', true, 1.0),
('Impressora 2', 'Impressora 3D de baixo custo, ideal para iniciantes.', 'https://i.imgur.com/hijklmn.jpg', true, 1.5),
('Impressora 3', 'Impressora 3D profissional, adequada para uso industrial.', 'https://i.imgur.com/opqrst.jpg', true, 2.0);

-- Filamentos
INSERT INTO filamentos (id_impressora, tipo, cor, quantidade, valor_por_kg) VALUES (1, 'PLA', 'Branco', 10.0, 40.0);
INSERT INTO filamentos (id_impressora, tipo, cor, quantidade, valor_por_kg) VALUES (1, 'PLA', 'Preto', 15.0, 35.0);
INSERT INTO filamentos (id_impressora, tipo, cor, quantidade, valor_por_kg) VALUES (2, 'ABS', 'Transparente', 8.0, 45.0);
INSERT INTO filamentos (id_impressora, tipo, cor, quantidade, valor_por_kg) VALUES (2, 'PETG', 'Azul', 12.0, 50.0);
INSERT INTO filamentos (id_impressora, tipo, cor, quantidade, valor_por_kg) VALUES (3, 'PLA', 'Verde', 20.0, 30.0);
INSERT INTO filamentos (id_impressora, tipo, cor, quantidade, valor_por_kg) VALUES (3, 'ABS', 'Vermelho', 5.0, 55.0);
