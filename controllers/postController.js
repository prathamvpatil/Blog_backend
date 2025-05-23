const db = require('../config/db');

// Create a new post
exports.createPost = (req, res) => {
  const { user_id, title, content } = req.body;
  const sql = "INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)";
  db.query(sql, [user_id, title, content], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Post created successfully" });
  });
};

// Get all posts
exports.getAllPosts = (req, res) => {
  const sql = `
    SELECT posts.*, users.username FROM posts
    JOIN users ON posts.user_id = users.id
    ORDER BY posts.created_at DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Get a single post by ID
exports.getPostById = (req, res) => {
  const sql = "SELECT * FROM posts WHERE id = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: "Post not found" });
    res.json(results[0]);
  });
};

// Update a post
exports.updatePost = (req, res) => {
  const { title, content } = req.body;
  const sql = "UPDATE posts SET title = ?, content = ? WHERE id = ?";
  db.query(sql, [title, content, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Post updated successfully" });
  });
};

// Delete a post
exports.deletePost = (req, res) => {
  const sql = "DELETE FROM posts WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Post deleted successfully" });
  });
};
