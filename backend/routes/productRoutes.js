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
import { protectu, protect, manager } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts)
router.route('/add').put(protect, manager, createProduct)
router.route('/myproducts').get(protect, getMyProducts)
router.route('/sproducts/:id').get( getSProducts)
router.route('/:id/reviews').post(protectu, createProductReview)
router.get('/top', getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, manager, deleteProduct)
  .put(protect, manager, updateProduct)

export default router;