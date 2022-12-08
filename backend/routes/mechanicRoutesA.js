import express from 'express';
const router = express.Router();
import {
  authMechanaic,
  registerMechanaic,
  updateMechanaicProfile,
  getMechanaics,
  deleteMechanaic,
  getMechanaicById,
  updateMechanaic,
} from '../controllers/mechanicController.js'
import { protecta, admin } from '../middleware/authMiddleware.js'

router.route('/')
  .post(registerMechanaic)
  .get(getMechanaics)

router.route('/:id')
.get(getMechanaicById)
  .delete(protecta, admin, deleteMechanaic)
  .put(protecta, admin, updateMechanaic)

export default router;