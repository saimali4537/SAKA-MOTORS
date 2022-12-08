import express from 'express';
const router = express.Router();
import {
  title, paymentP
} from '../controllers/paymentController.js'


router.get('/', title)

router.post('/payment', paymentP)


export default router;
