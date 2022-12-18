import express from 'express';
const router = express.Router();
import {
  addEmail,
  getEmails
} from '../controllers/emailController.js'
import {  protecta } from '../middleware/authMiddleware.js'

router.route('/')
  .post(addEmail)

router.route('/gete')
.get(  getEmails)

export default router;