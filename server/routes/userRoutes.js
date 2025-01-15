const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../config/db');

// Register User
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, email, hashedPassword, role], (err) => {
      if (err) {
        console.error('Error registering user:', err);
        return res.status(500).send('Error registering user');
      }
      res.status(201).send('User registered successfully');
    });
  } catch (err) {
    console.error('Error hashing password:', err);
    res.status(500).send('Server error');
  }
});

// Login User
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  connection.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error logging in user:', err);
      return res.status(500).send('Server error');
    }

    if (results.length === 0) {
      return res.status(404).send('User not found');
    }

    const user = results[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).send('Invalid email or password');
    }

    res.status(200).send({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  });
});

// Update User
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  const query = 'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?';
  connection.query(query, [name, email, role, id], (err) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).send('Error updating user');
    }
    res.status(200).send('User updated successfully');
  });
});

// Delete User
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM users WHERE id = ?';
  connection.query(query, [id], (err) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).send('Error deleting user');
    }
    res.status(200).send('User deleted successfully');
  });
});

module.exports = router;
