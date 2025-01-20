const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Add a new expense
router.post('/', (req, res) => {
  const { branch_id, category, amount, description, expense_date } = req.body;

  const query = `
    INSERT INTO Expenses (branch_id, category, amount, description, expense_date)
    VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [branch_id, category, amount, description, expense_date],
    (err, results) => {
      if (err) {
        console.error('Error adding expense:', err);
        return res.status(500).send('Error adding expense');
      }
      res.status(201).send('Expense added successfully');
    }
  );
});

// Fetch expenses
router.get('/', (req, res) => {
  const { branch_id, category } = req.query;

  let query = 'SELECT * FROM Expenses WHERE 1 = 1';
  const params = [];

  if (branch_id) {
    query += ' AND branch_id = ?';
    params.push(branch_id);
  }

  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Error fetching expenses:', err);
      return res.status(500).send('Error fetching expenses');
    }
    res.status(200).json(results);
  });
});

// Update an expense
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { category, amount, description, expense_date } = req.body;

  const query = `
    UPDATE Expenses
    SET category = ?, amount = ?, description = ?, expense_date = ?
    WHERE id = ?
  `;

  connection.query(
    query,
    [category, amount, description, expense_date, id],
    (err, results) => {
      if (err) {
        console.error('Error updating expense:', err);
        return res.status(500).send('Error updating expense');
      }
      res.status(200).send('Expense updated successfully');
    }
  );
});

// Delete an expense
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM Expenses WHERE id = ?';

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting expense:', err);
      return res.status(500).send('Error deleting expense');
    }
    res.status(200).send('Expense deleted successfully');
  });
});

module.exports = router;
