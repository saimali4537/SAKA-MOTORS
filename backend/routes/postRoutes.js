import express from 'express';
const router = express.Router();
import {
  getPosts,
  getPostById,
  deletePost,
  createPost,
  updatePost,
  createPostReview,
  getTopPosts,
  getMyPosts
} from '../controllers/postController.js'
import { protectu } from '../middleware/authMiddleware.js'

router.route('/').get(getPosts)
router.route('/add').put(protectu, createPost)
router.route('/myposts').get(protectu, getMyPosts)
router.route('/:id/reviews').post(protectu, createPostReview)
router.get('/top', getTopPosts)
router
  .route('/:id')
  .get(getPostById)
  .delete(protectu, deletePost)
  .put(protectu, updatePost)

export default router;