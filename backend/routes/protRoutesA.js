import express from 'express';
const router = express.Router();
import {
  getProts,
  getProtById,
  deleteProt,
  createProt,
  updateProt,
  createProtReview,
  getTopProts,
  getMyProts
} from '../controllers/protController.js'
import { protecta, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getProts).post(protecta, admin, createProt)
router.route('/myprots').get(protecta, getMyProts)
router.route('/:id/reviews').post(protecta, createProtReview)
router.get('/top', getTopProts)
router
  .route('/:id')
  .get(getProtById)
  .delete(protecta, admin, deleteProt)
  .put(protecta, admin, updateProt)
  

export default router;