import express from 'express';
const router = express.Router();

import {
  getHorarios,
  getHorarioById,
  addHorario,
  updateHorario,
  deleteHorario,
} from '../models/horarios/horarioList';

router.get('/horarios', getHorarios);
router.get('/horarios/:id', getHorarioById);
router.post('/horarios', addHorario);
router.put('/horarios/:id', updateHorario);
router.delete('/horarios/:id', deleteHorario);

export default router;