import express from 'express';
const router = express.Router();
import {
  authMechanaic,
  registerMechanaic,
  getMechanaicProfile,
  updateMechanaicProfile,
  updateMechanicProfileP,
  getMechanaics,
  deleteMechanaic,
  getMechanaicById,
  updateMechanaic,
  emailSend,
  emailSendf,
  emailSucc
} from '../controllers/mechanicController.js'
import { protectm, mechanic } from '../middleware/authMiddleware.js'

router.route('/')
  .post(registerMechanaic)
  .get(protectm, mechanic, getMechanaics)

router
  .post('/login', authMechanaic)

  router
  .post('/send', emailSend )

router
  .post('/log', emailSucc)
  router
  .post('/sendf', emailSendf )

  router
  .post('/profilep', updateMechanicProfileP)

router.route('/profile')
  .get(protectm, getMechanaicProfile)
  .put(protectm, updateMechanaicProfile)

router.route('/:id')
  .delete(protectm, mechanic, deleteMechanaic)
  .get(protectm, mechanic, getMechanaicById)
  .put(protectm, mechanic, updateMechanaic)

export default router;