import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getMyProducts,
  getSProducts
} from '../controllers/productController.js'
import { protecta, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protecta, admin, createProduct)
router.route('/sproducts/:id').get( getSProducts)
router.route('/:id/reviews').post(protecta, createProductReview)
router.get('/top', getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(protecta, admin, deleteProduct)
  .put(protecta, admin, updateProduct)

export default router;