import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  updateUserProfileP,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  emailSend,
  emailSendf,
  emailSucc
} from '../controllers/userController.js'
import { protecta, admin, protectu } from '../middleware/authMiddleware.js'

router.route('/')
  .post(registerUser)
  .get(protecta,  getUsers)

router
  .post('/send', emailSend )
router
  .post('/sendf', emailSendf )

router
  .post('/login', authUser)
router
  .post('/log', emailSucc)

router
  .post('/profilep', updateUserProfileP)

router.route('/profile')
  .get(protectu, getUserProfile)
  .put(protectu, updateUserProfile)

router.route('/:id')
  .delete(protecta, deleteUser)
  .get(protecta, getUserById)
  .put( updateUser)

export default router;