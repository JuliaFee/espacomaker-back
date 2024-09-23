/*tabela adm*/
CREATE TABLE adm (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  senha VARCHAR(50) NOT NULL
);

/*tabela ferramentas*/
CREATE TABLE ferramentas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  img VARCHAR(255),
  status BOOLEAN NOT NULL 
);

/*tabela impressora*/
CREATE TABLE impressora (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  img VARCHAR(255),
  status BOOLEAN NOT NULL,
  valor FLOAT NOT NULL 
);

/*tabela usuario*/
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  turma VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL
)

/*tabela reserva*/
CREATE TABLE reserva (
  id SERIAL PRIMARY KEY,
  id_user INT NOT NULL,
  id_ferramenta INT, 
  id_impressora INT, 
  data_reserva DATE NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fim TIME NOT NULL,
  status_reserva BOOLEAN NOT NULL,
  FOREIGN KEY (id_user) REFERENCES users (id),
  FOREIGN KEY (id_ferramenta) REFERENCES ferramentas (id),
  FOREIGN KEY (id_impressora) REFERENCES impressora (id)
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
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Espátula', 'Ferramenta de mão usada para espalhar ou remover materiais, como massas e tintas.', 'https://i.imgur.com/tg85XRG.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Espátula-2', 'Ferramenta de mão usada para espalhar ou remover materiais, como massas e tintas.', 'https://i.imgur.com/KfI70RB.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Espátula-3', 'Ferramenta de mão usada para espalhar ou remover materiais, como massas e tintas.', 'https://i.imgur.com/N0fgYzo.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Fita Métrica 5m Starrett', 'Instrumento de medição portátil util para edições precisas em diversas aplicações.', 'https://i.imgur.com/CZlXvQZ.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Fita Métrica 5m Starrett-2', 'Instrumento de medição portátil util para edições precisas em diversas aplicações.', 'https://i.imgur.com/01Cv6TQ.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Fita PVC cor Chumbo', 'Fita desiva de PVC, resistente a umidade e ideal para isolamento elétrico.', 'https://i.imgur.com/R3pgmSt.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Fuadeira/Parafusadeira', 'Ferraenta elétrica que combina funções de perfuração e parafusamento, versátil para diversos projetos.', 'https://i.imgur.com/BdV3CRQ.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Fuadeira/Parafusadeira-2', 'Ferraenta elétrica que combina funções de perfuração e parafusamento, versátil para diversos projetos.', 'https://i.imgur.com/npP4HFt.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Gedore 1/4X4 6X100', 'Conjunto de chaves soquete, de alta qualidade usadas em montagem e manutenção de máquinas.', 'https://i.imgur.com/5k1r1i5.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Gedore 1/4X4 6X100-2', 'Conjunto de chaves soquete, de alta qualidade usadas em montagem e manutenção de máquinas.', 'https://i.imgur.com/25H2hMp.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Gedore 1/8X4 3X100', 'Outro conjunto de chaves soquete com medidas específicas para acessibilidade em espações reduzidos.', 'https://i.imgur.com/huZ5xwh.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Gedore 1/8X4 3X100-2', 'Outro conjunto de chaves soquete com medidas específicas para acessibilidade em espações reduzidos.', 'https://i.imgur.com/ee9UeUL.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Gedore 1/8X6 3X150', 'Chaves soquetes de diferentes tamanhos, apropriadas para tarefas em áreas mais apertadas.', 'https://i.imgur.com/e32CLgX.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Gedore 1/8X6 3X150-2', 'Chaves soquetes de diferentes tamanhos, apropriadas para tarefas em áreas mais apertadas.', 'https://i.imgur.com/5Zy4lOg.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Gedore 1/8X6 3X150-3', 'Chaves soquetes de diferentes tamanhos, apropriadas para tarefas em áreas mais apertadas.', 'https://i.imgur.com/SQlyeu7.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Gedore 1/8X6 3X150-4', 'Chaves soquetes de diferentes tamanhos, apropriadas para tarefas em áreas mais apertadas.', 'https://i.imgur.com/wLaNsn4.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Gedore 3/14X4 4X100', 'Conjunto que fornece versatilidade em manutenção e reparos mecânicos.', 'https://i.imgur.com/2vF49vf.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Gedore 3/16X4 4X100', 'Ferramenta projetada para proporcionar um encaixe seguro e eficaz em porcas e parafusos.', 'https://i.imgur.com/5WhvJsX.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Gedore 3/16X6 4,5X150', 'Chave soquete ideal para trabalhos que requerem força e precisão.', 'https://i.imgur.com/xvgHMJ6.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Gedore 3/16X6 4,5X150-2', 'Chave soquete ideal para trabalhos que requerem força e precisão.', 'https://i.imgur.com/r1x4e4E.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Gedore 137 10', 'Ferramenta específica para aplicação profissionais, durabilidade e resistência.', 'https://i.imgur.com/1dlol1p.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Gedore NO1B 6', 'Chave de boca com design ergonômico, facilitando o uso em ambientes de trabalho exigentes.', 'https://i.imgur.com/c4rkwCf.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Gedore NO1B 11', 'Versão maior da chave anterior, adequada para diferentes tamanhos de porcas.', 'https://i.imgur.com/jx2530r.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Gedore NO1B 12', 'Ferramenta versátil para uso em mecânica e manutenção.', 'https://i.imgur.com/4le4kh8.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Gedore NO1B 13', 'Chave de boca que oferece facilidade de uso em áreas de difícil acesso.', 'https://i.imgur.com/z3Z0fEb.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Gedore NO1B 14', 'Ferramenta robusta, ideal para trabalhos que exigem resistência e força.', 'https://i.imgur.com/4AsMJFp.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Gedore NO1B 17', 'Chave que combina leveza e eficiência, adequada para manutenção gerais.', 'https://i.imgur.com/m1ewQbe.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Gedore NO1B 19', 'Ferramenta projetada para proporcionar o encaixe firme e seguro em porcas.', 'https://i.imgur.com/iktm4bs.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Gedore NO1B 22', 'Ideal para aplicação em mecânica, oferencendo durabilidade em uso contínuo.', 'https://i.imgur.com/452Cl4T.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Grampo Sargento Tipo 1', 'Utilizado parafixar peças juntas durante a colagem ou montagem, garantindo precisão.', 'https://i.imgur.com/pXIzEbz.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Grampo Sargento Tipo 2', 'Similar ao anterior com design para maior precisão e estabilidade.', 'https://i.imgur.com/gSShN7P.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Grampo Sargento Tipo 3', 'Similar ao anterior com design para maior precisão e estabilidade.', 'https://i.imgur.com/gSShN7P.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Gravador Cortador Laser', 'Máquina que utiliza laser para cortar e gravar materiais com alta precisão.', 'https://i.imgur.com/zPsBlXe.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('3D Print Quick Ender-3 V2', 'Impressora 3D de fácil uso, ideal para modelagem e prototipagem rápida.', 'https://i.imgur.com/QWRDQrD.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Shenzhen Creality 3D', 'Conhecida por suas impressoras 3D de qualidade e acessíveis.', 'https://i.imgur.com/3F0yg1q.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('3D Printer Use Manual', 'Impressora 3D com uma ótima qualidade de modelagem e prototipagem.', 'https://i.imgur.com/5LYLhTW.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Jogo de Chave Hexagonal', 'Conjunto de chaves com pontas hexagonais, utilizadas para apertar ou afrouxar parafusos com cabeças hexagonais.', 'https://i.imgur.com/bDRDUT6.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Jogo de Chave Hexagonal Milimétricas', 'Conjunto de chaves hexagoais em meididas milimétricas, ideal para aplicação técnicas.', 'https://i.imgur.com/nXMKtTd.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Martelo de Nilon Gedore', 'Martelo com cabeça de nilon, ideal para trabalhos que requerem impactos suaves.', 'https://i.imgur.com/utAF7x3.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Martelo Modelo 33', 'Martelo de uso geral, adquado para diversas tarefas de carpintaria e montagem.', 'https://i.imgur.com/KFWjo68.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Multímetro Digital FLUKE', 'Instrumento de Medição elétrica de alta precisão, utilizado em diagnósticos e reparos.', 'https://i.imgur.com/2oKaU4x.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Nível de Alumínio', 'Ferramenta utilizada para verificar a horizontalidade e verticalidade de superfíces.', 'https://i.imgur.com/X5BhFQr.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Óculos de Segurança', 'Equipamento de proteção individual (EPI) que protege os olhos contra impactos e partículas.', 'https://i.imgur.com/ZTmabQn.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Óculos de Segurança-2', 'Equipamento de proteção individual (EPI) que protege os olhos contra impactos e partículas.', 'https://i.imgur.com/XAGJV3b.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Óculos de Segurança-3', 'Equipamento de proteção individual (EPI) que protege os olhos contra impactos e partículas.', 'https://i.imgur.com/12IBcu3.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Paquímetro Digital', 'Ferramenta de medição precisa, utilizada para verificar dimensões internas e externas de objetos.', 'https://i.imgur.com/rVtAjwZ.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Pica Fio', 'Ferramenta usada para picar e preparar fios para conexões elétricas.', 'https://i.imgur.com/WXD1UJv.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Serra', 'Ferramenta cortante utilizada em diversos materiais, com madeira e metal.', 'https://i.imgur.com/DNdlDmL.jpg', true);
INSERT INTO ferramentas (nome, descricao, img, status) VALUES ('Stanley Esquadro Combinado', 'Ferramenta de medição e marcação que combina esquadro e uma régua, essencial para carpintaria.', 'https://i.imgur.com/KK0nj0u.jpg', true);
