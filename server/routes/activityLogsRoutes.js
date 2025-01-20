const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Log a new activity
router.post('/', (req, res) => {
  const { user_id, action, details } = req.body;

  const query = `
    INSERT INTO Activity_Logs (user_id, action, details)
    VALUES (?, ?, ?)
  `;

  connection.query(query, [user_id, action, JSON.stringify(details)], (err, results) => {
    if (err) {
      console.error('Error logging activity:', err);
      return res.status(500).send('Error logging activity');
    }
    res.status(201).send('Activity logged successfully');
  });
});

// Fetch all activity logs or filter by user ID
router.get('/', (req, res) => {
  const { user_id } = req.query;

  let query = 'SELECT * FROM Activity_Logs';
  const params = [];

  if (user_id) {
    query += ' WHERE user_id = ?';
    params.push(user_id);
  }

  query += ' ORDER BY timestamp DESC';

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Error fetching activity logs:', err);
      return res.status(500).send('Error fetching activity logs');
    }
    res.status(200).json(results);
  });
});

// Fetch a specific activity log by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM Activity_Logs WHERE id = ?';

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching activity log:', err);
      return res.status(500).send('Error fetching activity log');
    }
    if (results.length === 0) {
      return res.status(404).send('Activity log not found');
    }
    res.status(200).json(results[0]);
  });
});

module.exports = router;
