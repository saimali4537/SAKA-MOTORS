import express from 'express';
const router = express.Router();
import {
  getBooks,
  getBookById,
  deleteBook,
  createBook,
  updateBook,
  getTopBooks,
  getMyBooks,
  getSBooks
} from '../controllers/bookController.js'
import { protectm, mechanic, protectu } from '../middleware/authMiddleware.js'

router.route('/').get(getBooks)
router.route('/mybooks').get(protectm, getMyBooks)
router.route('/sbooks/:id').get( getSBooks)
router.get('/top', getTopBooks)
router
  .route('/:id')
  .get(getBookById)
  .delete(protectm, mechanic, deleteBook)
  .put(protectu, updateBook)
  .post(protectu, createBook)

export default router;