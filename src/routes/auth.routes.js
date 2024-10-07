import express from 'express';
import auth from './auth.js';

const app = express();

app.use(express.json());

app.post('/login', auth.login);
