import express from 'express';
import {
  getBlogPosts,
  getBlogPostById,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  addComment,
  getPopularBlogPosts,
} from '../controllers/blogController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getBlogPosts);
router.get('/popular', getPopularBlogPosts);
router.get('/slug/:slug', getBlogPostBySlug);
router.get('/:id', getBlogPostById);

// Protected routes
router.post('/:id/comments', protect, addComment);

// Admin routes
router.route('/')
  .post(protect, admin, createBlogPost);

router.route('/:id')
  .put(protect, admin, updateBlogPost)
  .delete(protect, admin, deleteBlogPost);

export default router;
