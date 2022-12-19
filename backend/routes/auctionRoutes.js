import express from 'express';
const router = express.Router();
import {
  getAuctions,
  getAuctionById,
  deleteAuction,
  createAuction,
  updateAuction,
  createAuctionReview,
  getTopAuctions,
  getMyAuctions
} from '../controllers/auctionController.js'
import { protectu } from '../middleware/authMiddleware.js'

router.route('/').get(getAuctions)
router.route('/add').put(protectu, createAuction)
router.route('/myauctions').get(protectu, getMyAuctions)
router.route('/:id/reviews').post(protectu, createAuctionReview)
router.get('/top', getTopAuctions)
router
  .route('/:id')
  .get(getAuctionById)
  .delete(protectu, deleteAuction)
  .put(updateAuction)

export default router;