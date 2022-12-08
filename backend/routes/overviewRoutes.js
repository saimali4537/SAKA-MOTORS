import express from 'express';
const router = express.Router();
import {
  getOverviews,
  createOverview,
  updateOverview,
} from '../controllers/overviewController.js'
import { protecta, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getOverviews)
router
  .route('/:id')
  .put(protecta, admin, updateOverview)
  .post(protecta, admin, createOverview)

export default router;