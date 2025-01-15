const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Create a new branch
router.post('/', (req, res) => {
  const { name, location, contact_info } = req.body;

  const query = 'INSERT INTO branches (name, location, contact_info) VALUES (?, ?, ?)';
  connection.query(query, [name, location, contact_info], (err) => {
    if (err) {
      console.error('Error creating branch:', err);
      return res.status(500).send('Error creating branch');
    }
    res.status(201).send('Branch created successfully');
  });
});

// Get all branches
router.get('/', (req, res) => {
  const query = 'SELECT * FROM branches';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching branches:', err);
      return res.status(500).send('Error fetching branches');
    }
    res.status(200).json(results);
  });
});

// Get a single branch by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM branches WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching branch:', err);
      return res.status(500).send('Error fetching branch');
    }
    if (results.length === 0) {
      return res.status(404).send('Branch not found');
    }
    res.status(200).json(results[0]);
  });
});

// Update branch details
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, location, contact_info } = req.body;

  const query = 'UPDATE branches SET name = ?, location = ?, contact_info = ? WHERE id = ?';
  connection.query(query, [name, location, contact_info, id], (err) => {
    if (err) {
      console.error('Error updating branch:', err);
      return res.status(500).send('Error updating branch');
    }
    res.status(200).send('Branch updated successfully');
  });
});

// Delete a branch
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM branches WHERE id = ?';
  connection.query(query, [id], (err) => {
    if (err) {
      console.error('Error deleting branch:', err);
      return res.status(500).send('Error deleting branch');
    }
    res.status(200).send('Branch deleted successfully');
  });
});

module.exports = router;
