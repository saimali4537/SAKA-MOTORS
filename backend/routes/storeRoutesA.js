import express from 'express';
const router = express.Router();
import {
  getStores,
  getStoreById,
  deleteStore,
  createStore,
  createStore1,
  updateStore,
  createStoreReview,
  getTopStores,
  getMyStores
} from '../controllers/storeController.js'
import { protecta, admin, protect, manager } from '../middleware/authMiddleware.js'


router.route('/').get(getStores).post(protect, manager, createStore1).post(protecta, admin, createStore)
router.route('/mystores').get(protect, getMyStores)
router.route('/:id/reviews').post(protecta, createStoreReview)
router.get('/top', getTopStores)
router
  .route('/:id')
  .get(getStoreById)
  .delete(protecta, admin, deleteStore)
  .put(protecta, admin, updateStore)

export default router;