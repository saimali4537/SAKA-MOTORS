import express from 'express';
const router = express.Router();
import {
  authManager,
  registerManager,
  getManagerProfile,
  updateManagerProfile,
  updateManagerProfileP,
  getManagers,
  deleteManager,
  getManagerById,
  updateManager,
  emailSend,
  emailSendf,
  emailSucc
} from '../controllers/managerController.js'
import { protect, protecta, admin } from '../middleware/authMiddleware.js'

router.route('/')
  .post(registerManager)
  .get(protecta, getManagers)

router
  .post('/login', authManager)

router
  .post('/send', emailSend )

router
  .post('/log', emailSucc)

  router
  .post('/sendf', emailSendf )

  router
  .post('/profilep', updateManagerProfileP)

router.route('/profile')
  .get(protect, getManagerProfile)
  .put(protect, updateManagerProfile)

router.route('/:id')
  .delete(protecta, deleteManager)
  .get(protecta,  getManagerById)
  .put(protecta,  updateManager)

export default router;