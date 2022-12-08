import express from 'express';
const router = express.Router();
import {
  authMechanaic,
  registerMechanaic,
  getMechanaicProfile,
  updateMechanaicProfile,
  getMechanaics,
  deleteMechanaic,
  getMechanaicById,
  updateMechanaic,
} from '../controllers/mechanicController.js'
import { protectm, mechanic } from '../middleware/authMiddleware.js'

router.route('/')
  .post(registerMechanaic)
  .get(protectm, mechanic, getMechanaics)

router
  .post('/login', authMechanaic)

router.route('/profile')
  .get(protectm, getMechanaicProfile)
  .put(protectm, updateMechanaicProfile)

router.route('/:id')
  .delete(protectm, mechanic, deleteMechanaic)
  .get(protectm, mechanic, getMechanaicById)
  .put(protectm, mechanic, updateMechanaic)

export default router;