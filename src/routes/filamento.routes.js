import express from 'express';
const router = express.Router();

import {
  getFilamentos,
  getFilamentoById,
  registerFilamento,
  updateFilamento,
  deleteFilamento,
} from '../models/filamento/FilamentoList';

router.get('/filamentos', getFilamentos);
router.get('/filamentos/:id', getFilamentoById);
router.post('/filamentos', registerFilamento,);
router.put('/filamentos/:id', updateFilamento);
router.delete('/filamentos/:id', deleteFilamento);

export default router;