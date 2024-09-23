import db from "../../database/index.js";

export default class UsersRepository{
    constructor() {
        this.db = db;
    }

    async getUsers() {
        try {
          const allUsers = await this.db.manyOrNone("SELECT * FROM users");
          // console.log(allUsers);
           return allUsers;
         } catch (error) {
           console.error("Falha ao obter usuários", error);
           throw error; 
         }
       }
    
       async getUserById(id) {
         try {
           const user = await this.db.oneOrNone(
             "SELECT * FROM users WHERE id = $1",
             id
           );
           return user;
         } catch (error) {
           console.error(`Falha ao obter usuário por ID ${id}:`, error);
           throw error; 
         }
       }
    
       async getUserByEmail(email) {
         try {
           const user = await this.db.oneOrNone(
             "SELECT * FROM users WHERE email = $1",
             email
           );
           return user;
         } catch (error) {
           console.error(`Falha ao obter usuário por email ${email}:`, error);
           throw error; 
         }
       }
    
       async createUser(user) {
         try {
           await this.db.none(
             "INSERT INTO users (id, nome, email, turma, senha) VALUES ($1, $2, $3, $4, $5)",
             [user.id, user.nome, user.email, user.turma, user.senha]
           );
           return user;
         } catch (error) {
           console.error("Falha ao criar usuário", error);
           throw error; 
         }
       }
   
       async updateUser(id, nome, email, turma, senha) {
         try {
           const user = await this.getUserById(id);
  
           if (!user) {
             return null;
           }
    
       const updatedUser = await this.db.one(
             "UPDATE users SET nome = $1, email = $2, turma = $3, senha = $4 WHERE id = $4 RETURNING *",
             [nome, email, turma, senha, id]
           );
   
           return updatedUser;
         } catch (error) {
           console.error(`Falha ao atualizar usuário ${id}:`, error);
           throw error; 
         }
       }
    
       async deleteUser(id) {
         try {
           await this.db.none("DELETE FROM users WHERE id = $1", id);
         } catch (error) {
           console.error(`Falha ao deletar usuário ${id}:`, error);
           throw error; 
         }
       }
     }

    



  
    
  