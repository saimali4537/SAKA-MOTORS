import express from 'express';
const router = express.Router();
import {
  authAdmin,
  emailSend,
  emailSucc
} from '../controllers/adminController.js'
import { protecta, admin } from '../middleware/authMiddleware.js'

router
  .post('/login', emailSend)

router.post('/log', emailSucc)


export default router;