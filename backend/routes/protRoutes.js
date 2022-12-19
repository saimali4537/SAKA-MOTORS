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
import { protectm, mechanic, protectu } from '../middleware/authMiddleware.js'

router.route('/').get(getProts)
router.route('/add').put(protectm, mechanic, createProt)
router.route('/myprots').get(protectm, getMyProts)
router.route('/:id/reviews').post(protectu, createProtReview)
router.get('/top', getTopProts)
router
  .route('/:id')
  .get(getProtById)
  .delete(protectm, mechanic, deleteProt)
  .put(protectm, mechanic, updateProt)
  

export default router;