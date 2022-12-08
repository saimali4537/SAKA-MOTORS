import express from 'express';
const router = express.Router();
import {
  getBids,
  getBidById,
  deleteBid,
  createBid,
  updateBid,
  getTopBids,
  getMyBids,
} from '../controllers/bidController.js'
import { protectu } from '../middleware/authMiddleware.js'

router.route('/').get(getBids)
router.route('/mybids').get(protectu, getMyBids)
router.get('/top/:id', getTopBids)
router
  .route('/:id')
  .get(getBidById)
  .delete(protectu, deleteBid)
  .put(protectu, updateBid)
  .post(protectu, createBid)

export default router;