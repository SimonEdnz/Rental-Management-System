const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Generate a bill for a tenant
router.post('/generate-bill', (req, res) => {
    const { tenant_id, amount, billing_cycle } = req.body;

    const query = `INSERT INTO payments (tenant_id, amount, payment_date, billing_cycle) 
                   VALUES (?, ?, NOW(), ?)`;
    connection.query(query, [tenant_id, amount, billing_cycle], (err, results) => {
        if (err) {
            console.error('Error generating bill:', err);
            return res.status(500).send('Error generating bill');
        }
        res.status(201).send('Bill generated successfully');
    });
});

// Track payments
router.post('/make-payment', (req, res) => {
    const { tenant_id, amount } = req.body;

    const query = `INSERT INTO payments (tenant_id, amount, payment_date, billing_cycle) 
                   VALUES (?, ?, NOW(), NULL)`;
    connection.query(query, [tenant_id, amount], (err, results) => {
        if (err) {
            console.error('Error recording payment:', err);
            return res.status(500).send('Error recording payment');
        }
        res.status(201).send('Payment recorded successfully');
    });
});

// Get payment history for a tenant
router.get('/tenant/:id', (req, res) => {
    const { id } = req.params;

    const query = `SELECT * FROM payments WHERE tenant_id = ? ORDER BY payment_date DESC`;
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching payment history:', err);
            return res.status(500).send('Error fetching payment history');
        }
        res.status(200).json(results);
    });
});

module.exports = router;
