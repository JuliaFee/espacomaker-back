import {Router} from 'express';
import { login, generateToken } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post('/login', generateToken);

export default authRouter;
 
 
 

 
 
 
 