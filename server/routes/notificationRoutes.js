const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Add a new notification
router.post('/', (req, res) => {
  const { tenant_id, message } = req.body;

  const query = `
    INSERT INTO Notifications (tenant_id, message, status)
    VALUES (?, ?, 'pending')
  `;

  connection.query(query, [tenant_id, message], (err, results) => {
    if (err) {
      console.error('Error adding notification:', err);
      return res.status(500).send('Error adding notification');
    }
    res.status(201).send('Notification added successfully');
  });
});

// Fetch notifications
router.get('/', (req, res) => {
  const { tenant_id, status } = req.query;

  let query = 'SELECT * FROM Notifications WHERE 1 = 1';
  const params = [];

  if (tenant_id) {
    query += ' AND tenant_id = ?';
    params.push(tenant_id);
  }

  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Error fetching notifications:', err);
      return res.status(500).send('Error fetching notifications');
    }
    res.status(200).json(results);
  });
});

// Update notification status
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const query = `
    UPDATE Notifications
    SET status = ?
    WHERE id = ?
  `;

  connection.query(query, [status, id], (err, results) => {
    if (err) {
      console.error('Error updating notification:', err);
      return res.status(500).send('Error updating notification');
    }
    res.status(200).send('Notification status updated successfully');
  });
});

// Delete a notification
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM Notifications WHERE id = ?';

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting notification:', err);
      return res.status(500).send('Error deleting notification');
    }
    res.status(200).send('Notification deleted successfully');
  });
});

module.exports = router;
