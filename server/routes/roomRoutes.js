const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Add a new room
router.post('/', (req, res) => {
  const { branch_id, room_number, capacity, is_partitioned, parent_room_id } = req.body;

  const query = `INSERT INTO rooms (branch_id, room_number, capacity, is_partitioned, parent_room_id) 
                 VALUES (?, ?, ?, ?, ?)`;
  
  connection.query(query, [branch_id, room_number, capacity, is_partitioned, parent_room_id], (err, results) => {
    if (err) {
      console.error('Error adding room:', err);
      return res.status(500).send('Error adding room');
    }
    res.status(201).send('Room added successfully');
  });
});

// Edit a room
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { room_number, capacity, is_partitioned, parent_room_id } = req.body;

  const query = `UPDATE rooms 
                 SET room_number = ?, capacity = ?, is_partitioned = ?, parent_room_id = ? 
                 WHERE id = ?`;

  connection.query(query, [room_number, capacity, is_partitioned, parent_room_id, id], (err, results) => {
    if (err) {
      console.error('Error editing room:', err);
      return res.status(500).send('Error editing room');
    }
    res.status(200).send('Room updated successfully');
  });
});

// Delete a room
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM rooms WHERE id = ?`;

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting room:', err);
      return res.status(500).send('Error deleting room');
    }
    res.status(200).send('Room deleted successfully');
  });
});

// Add sub-room under a parent room
router.post('/sub-room', (req, res) => {
    const { branch_id, room_number, capacity, parent_room_id } = req.body;
  
    const query = `INSERT INTO rooms (branch_id, room_number, capacity, is_partitioned, parent_room_id) 
                   VALUES (?, ?, ?, true, ?)`;
  
    connection.query(query, [branch_id, room_number, capacity, parent_room_id], (err, results) => {
      if (err) {
        console.error('Error adding sub-room:', err);
        return res.status(500).send('Error adding sub-room');
      }
      res.status(201).send('Sub-room added successfully');
    });
  });
  
module.exports = router;
