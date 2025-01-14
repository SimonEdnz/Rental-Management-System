const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Sample route for user registration
router.post('/register', (req, res) => {
  const { name, email, password, role } = req.body;

  const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
  connection.query(query, [name, email, password, role], (err, results) => {
    if (err) {
      console.error('Error registering user: ', err);
      return res.status(500).send('Error registering user');
    }
    res.status(201).send('User registered successfully');
  });
});

// You can later add other routes like login, update, etc.

module.exports = router;
