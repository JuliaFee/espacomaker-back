import express from 'express';
const router = express.Router();

import {
  getHorarios,
  getHorarioById,
  addHorario,
  updateHorario,
  deleteHorario,
} from '../controllers/horario.controller.js';

router.get('/horarios', getHorarios);
router.get('/horarios/:id', getHorarioById);
router.post('/', addHorario);
router.put('/horarios/:id', updateHorario);
router.delete('/horarios/:id', deleteHorario);


export default router;