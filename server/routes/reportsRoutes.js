const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Generate a new report
router.post('/', (req, res) => {
  const { report_type, generated_by, data } = req.body;

  const query = `
    INSERT INTO Reports (report_type, generated_by, data)
    VALUES (?, ?, ?)
  `;

  connection.query(query, [report_type, generated_by, JSON.stringify(data)], (err, results) => {
    if (err) {
      console.error('Error generating report:', err);
      return res.status(500).send('Error generating report');
    }
    res.status(201).send('Report generated successfully');
  });
});

// Fetch all reports or filter by type
router.get('/', (req, res) => {
  const { report_type } = req.query;

  let query = 'SELECT * FROM Reports';
  const params = [];

  if (report_type) {
    query += ' WHERE report_type = ?';
    params.push(report_type);
  }

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Error fetching reports:', err);
      return res.status(500).send('Error fetching reports');
    }
    res.status(200).json(results);
  });
});

// Fetch a specific report by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM Reports WHERE id = ?';

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching report:', err);
      return res.status(500).send('Error fetching report');
    }
    if (results.length === 0) {
      return res.status(404).send('Report not found');
    }
    res.status(200).json(results[0]);
  });
});

// Delete a report
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM Reports WHERE id = ?';

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting report:', err);
      return res.status(500).send('Error deleting report');
    }
    res.status(200).send('Report deleted successfully');
  });
});

module.exports = router;
