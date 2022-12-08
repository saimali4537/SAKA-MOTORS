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
import { protecta, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getPosts)
router.route('/myposts').get(protecta, getMyPosts)
router.route('/:id/reviews').post(protecta, createPostReview)
router.get('/top', getTopPosts)
router
  .route('/:id')
  .get(getPostById)
  .delete(protecta, admin, deletePost)
  .put(protecta, admin, updatePost)

export default router;