const db = require('../config/db');

// Create a new post (protected route)
exports.createPost = (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id; // From JWT token

  const sql = "INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)";
  db.query(sql, [userId, title, content], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Post created successfully" });
  });
};

// Get all public posts (public route)
exports.getAllPosts = (req, res) => {
  const sql = `
    SELECT posts.*, users.username 
    FROM posts
    JOIN users ON posts.user_id = users.id
    ORDER BY posts.created_at DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Get a single post by ID (public route)
exports.getPostById = (req, res) => {
  const sql = `
    SELECT posts.*, users.username 
    FROM posts
    JOIN users ON posts.user_id = users.id
    WHERE posts.id = ?
  `;
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: "Post not found" });
    res.json(results[0]);
  });
};

// Update a post (protected route)
exports.updatePost = (req, res) => {
  const { title, content } = req.body;
  const postId = req.params.id;
  const userId = req.user.id;

  const checkSql = "SELECT * FROM posts WHERE id = ? AND user_id = ?";
  db.query(checkSql, [postId, userId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(403).json({ message: "Not authorized to edit this post" });

    const updateSql = "UPDATE posts SET title = ?, content = ? WHERE id = ?";
    db.query(updateSql, [title, content, postId], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Post updated successfully" });
    });
  });
};

// Delete a post (protected route)
exports.deletePost = (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  const checkSql = "SELECT * FROM posts WHERE id = ? AND user_id = ?";
  db.query(checkSql, [postId, userId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(403).json({ message: "Not authorized to delete this post" });

    const deleteSql = "DELETE FROM posts WHERE id = ?";
    db.query(deleteSql, [postId], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Post deleted successfully" });
    });
  });
};
