import express from 'express';
import {
  getFilamentos,
  getFilamentoById,
  addFilamento,  
  updateFilamento,
  deleteFilamento,
} from '../controllers/filamento.controller.js';

const router = express.Router();

router.get('/', getFilamentos);
router.get('/:id', getFilamentoById);
router.post('/', addFilamento);
router.put('/:id', updateFilamento);
router.delete('/:id', deleteFilamento);

export default router;
