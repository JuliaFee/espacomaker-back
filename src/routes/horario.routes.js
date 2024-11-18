import express from 'express';
const router = express.Router();

import {
  getHorarios,
  getHorarioById,
  addHorario,
  updateHorario,
  deleteHorario,
} from '../controllers/horario.controller.js';

router.get('/', getHorarios);
router.get('/:id', getHorarioById);
router.post('/', addHorario);
router.put('/:id', updateHorario);
router.delete('/:id', deleteHorario);


export default router;