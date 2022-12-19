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
  getSBooks,
  getMBooks
} from '../controllers/bookController.js'
import { protectm, mechanic, protectu } from '../middleware/authMiddleware.js'

router.route('/').get(getBooks)
router.route('/add/:id').put(protectu, createBook)
router.route('/mybooks').get(protectm, getMyBooks)
router.route('/mbooks').get( protectu, getMBooks)
router.route('/sbooks/:id').get( getSBooks)
router.get('/top', getTopBooks)
router
  .route('/user/:id')
  .delete(protectu, deleteBook)
router
  .route('/:id')
  .get(getBookById)
  .delete(protectm, mechanic, deleteBook)
  .put(protectu, updateBook)

export default router;