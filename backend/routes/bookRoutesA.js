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
import { protecta, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getBooks)
router
  .route('/:id')
  .get(getBookById)
  .delete(protecta, admin, deleteBook)
  .put(protecta, updateBook)
  .post(protecta, createBook)

export default router;