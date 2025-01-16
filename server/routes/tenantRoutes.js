const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Register a new tenant
router.post('/', (req, res) => {
  const { name, contact_info, email, room_id, lease_start_date, lease_end_date } = req.body;

  const query = `INSERT INTO tenants (name, contact_info, email, room_id, lease_start_date, lease_end_date) 
                 VALUES (?, ?, ?, ?, ?, ?)`;

  connection.query(
    query, 
    [name, contact_info, email, room_id, lease_start_date, lease_end_date], 
    (err, results) => {
      if (err) {
        console.error('Error registering tenant:', err);
        return res.status(500).send('Error registering tenant');
      }
      res.status(201).send('Tenant registered successfully');
    }
  );
});

// Update tenant details
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, contact_info, email, lease_start_date, lease_end_date } = req.body;

  const query = `UPDATE tenants 
                 SET name = ?, contact_info = ?, email = ?, lease_start_date = ?, lease_end_date = ? 
                 WHERE id = ?`;

  connection.query(
    query, 
    [name, contact_info, email, lease_start_date, lease_end_date, id], 
    (err, results) => {
      if (err) {
        console.error('Error updating tenant:', err);
        return res.status(500).send('Error updating tenant');
      }
      res.status(200).send('Tenant details updated successfully');
    }
  );
});

// Delete a tenant
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM tenants WHERE id = ?`;

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting tenant:', err);
      return res.status(500).send('Error deleting tenant');
    }
    res.status(200).send('Tenant deleted successfully');
  });
});

// Get tenants linked to a specific room
router.get('/room/:room_id', (req, res) => {
  const { room_id } = req.params;

  const query = `SELECT * FROM tenants WHERE room_id = ?`;

  connection.query(query, [room_id], (err, results) => {
    if (err) {
      console.error('Error fetching tenants:', err);
      return res.status(500).send('Error fetching tenants');
    }
    res.status(200).json(results);
  });
});

// Get tenant history
router.get('/history', (req, res) => {
  const query = `SELECT * FROM tenants`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching tenant history:', err);
      return res.status(500).send('Error fetching tenant history');
    }
    res.status(200).json(results);
  });
});

module.exports = router;
