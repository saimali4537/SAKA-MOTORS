import express from 'express';
const router = express.Router();
import {
  getStores,
  getStoreById,
  deleteStore,
  createStore,
  updateStore,
  createStoreReview,
  getTopStores,
  getMyStores
} from '../controllers/storeController.js'
import { protecta, admin, protect, manager, protectu } from '../middleware/authMiddleware.js'


router.route('/').get(getStores)
router.route('/add').put(protect, manager, createStore)
router.route('/mystores').get(protect, getMyStores)
router.route('/:id/reviews').post(protectu, createStoreReview)
router.get('/top', getTopStores)
router
  .route('/:id')
  .get(getStoreById)
  .delete(protecta, admin, deleteStore)
  .put(protect, manager, updateStore)

export default router;