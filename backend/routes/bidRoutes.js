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
  getMBids
} from '../controllers/bidController.js'
import { protectu } from '../middleware/authMiddleware.js'

router.route('/').get(getBids)
router.route('/mybids').get(protectu, getMyBids)
router.route('/mbids').get(protectu, getMBids)
router.get('/top/:id', getTopBids)
router.route('/add/:id').put(protectu, createBid)
router
  .route('/:id')
  .get(getBidById)
  .delete(protectu, deleteBid)
  .put(protectu, updateBid)
  

export default router;