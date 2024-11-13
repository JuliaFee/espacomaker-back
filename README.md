# ESPAÇO MAKER - BACKEND

![ESPAÇO MAKER](https://www.google.com/url?sa=i&url=https%3A%2F%2Fplataforma.gpinovacao.senai.br%2Fplataforma%2Fdesafio%2F1165&psig=AOvVaw1c4WP6tmJdAO_VAkaQUraL&ust=1727954035512000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOiwrsbI74gDFQAAAAAdAAAAABAE)

## Descrição 💥
O **EspacoMaker-Back** é um sistema back-end desenvolvido em Node.js que oferece suporte ao gerenciamento de um espaço maker. Ele fornece funcionalidades para controle de ferramentas, impressoras, reservas, gerenciamento de usuários e um sistema de administração. O sistema visa facilitar o uso e a organização de recursos dentro de um ambiente colaborativo, permitindo a reserva de equipamentos e a supervisão das atividades por administradores.

## Funcionalidades Principais ♻
- **Gerenciamento de Ferramentas**: Controle de ferramentas disponíveis no espaço maker, incluindo adição, remoção e atualização de dados.
- **Gerenciamento de Impressoras**: Suporte para adicionar, remover e gerenciar impressoras disponíveis para uso.
- **Sistema de Reservas**: Permite que os usuários reservem equipamentos, visualizem e cancelem reservas.
- **Gerenciamento de Usuários**: Registro e controle de usuários, permitindo a atualização de dados e a exclusão de contas.
- **Administração**: Controle exclusivo para administradores, possibilitando a gestão dos recursos e usuários do sistema.

## O que você encontrará nesse repositório? 👁‍🗨

A estrutura do projeto é organizada da seguinte forma:

### **Controllers**
Os controladores são responsáveis pela lógica de negócios do sistema, manipulando as requisições e interações com o banco de dados:
- `adm.controller.js`: Controlador das funções administrativas.
- `ferramentas.controller.js`: Manipula o gerenciamento das ferramentas.
- `impressora.controller.js`: Controla as operações relacionadas às impressoras.
- `reservas.controller.js`: Lida com as reservas de equipamentos.
- `users.controller.js`: Responsável pelo controle de usuários.

### **Models**
Os modelos representam as entidades do banco de dados. Aqui estão os principais modelos:
- `Adm.js`: Modelo para administrar dados dos administradores.
- `Ferramentas.js`: Modelo que define as ferramentas disponíveis.
- `Impressora.js`: Modelo das impressoras cadastradas no sistema.
- `Reservas.js`: Modelo das reservas feitas pelos usuários.
- `Users.js`: Modelo para usuários comuns cadastrados no sistema.

### **Routes**
As rotas definem os endpoints do sistema, permitindo interações com os controladores:
- `adm.routes.js`: Rotas para as funções administrativas.
- `ferramentas.routes.js`: Rotas para operações com ferramentas.
- `impressora.routes.js`: Rotas para operações de impressoras.
- `reservas.routes.js`: Rotas para reservas de equipamentos.
- `users.routes.js`: Rotas para controle de usuários.

### **Database**
A pasta de banco de dados contém os scripts e configurações para interação com o PostgreSQL:
- `index.js`: Arquivo de configuração do banco de dados.
- `script.sql`: Script para criação das tabelas e inicialização do banco de dados.

## Pré-requisitos
Antes de executar o projeto, você precisará ter instalado:
- **Node.js** versão 14 ou superior
- **PostgreSQL** versão 12 ou superior

## Como instalação e executar? 🚶‍♂️🚶‍♀️
Siga os passos abaixo para configurar e rodar o projeto localmente:

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/JuliaFee/espacomaker-back.git
   cd espacomaker-back
   ```

2. **Instale as dependências**:
   Execute o comando a seguir para instalar todas as dependências do projeto:
   ```bash
   npm install
   ```

3. **Configuração do banco de dados**:
   Crie um banco de dados PostgreSQL e importe o script `script.sql` disponível na pasta `database`.

4. **Inicie o servidor**:
   Após configurar o banco de dados, inicie o servidor com o comando:
   ```bash
   npm start
   ```

5. O servidor estará rodando localmente na porta padrão (ex: `http://localhost:3000`).

## API Endpoints 🔸
Aqui estão alguns dos principais endpoints disponíveis no projeto:

- **/adm**: Rotas relacionadas às funcionalidades administrativas.
- **/ferramentas**: Rotas para gestão de ferramentas.
- **/impressora**: Rotas para o controle das impressoras.
- **/reservas**: Rotas para gerenciamento das reservas.
- **/users**: Rotas para controle de usuários.

## Tecnologias Utilizadas
- **Node.js**: Plataforma de desenvolvimento back-end.
- **Express**: Framework para Node.js utilizado para criação das APIs RESTful.
- **PostgreSQL**: Banco de dados relacional para armazenamento de informações.

## Contribuições
Contribuições são bem-vindas! Para contribuir:
1. Faça um fork do projeto.
2. Crie uma branch para a sua feature 
3. Commit suas mudanças 
4. Dê um push para a branch 
5. Abra um Pull Request.

## Autor
Desenvolvido por
  - Letícia Cardoso Bizaglio
  - Júlia Ferreira da Silva

  ## Integrantes
<h4> Nos contate! </h4>

    - Amanda dos Santos Silva - amandasilva@aluno.senai.br
    - Isadora Ribeiro Mendes - isadoramendes@aluno.senai.br
    - Júlia Ferreira da Silva - julia.silva133@aluno.senai.br
    - Letícia Cardoso Bizaglio - leticia.bizaglio@aluno.senai.br
    - Maria Eduarda Valonga - maria.valonga@aluno.senai.br
