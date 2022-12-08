import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  countUsers
} from '../controllers/userController.js'
import { protecta, admin, protectu } from '../middleware/authMiddleware.js'

router.route('/')
  .post(registerUser)
  .get(protecta,  getUsers)

router
  .post('/login', authUser)


router.route('/profile')
  .get(protectu, getUserProfile)
  .put(protectu, updateUserProfile)

router.route('/:id')
  .delete(protecta, deleteUser)
  .get(protecta, getUserById)
  .put(protecta,  updateUser)

export default router;