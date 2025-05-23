const express = require('express');
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/postController');

// Routes
router.post('/', createPost);             // Create post
router.get('/', getAllPosts);             // Get all posts
router.get('/:id', getPostById);          // Get single post
router.put('/:id', updatePost);           // Update post
router.delete('/:id', deletePost);        // Delete post

module.exports = router;
