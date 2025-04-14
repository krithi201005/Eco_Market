const express = require("express");
const router = express.Router();
const mysql = require("mysql");

// Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Password@123",
    database: "logindb",
});

// Search Products API
router.get("/", (req, res) => {
    const searchTerm = req.query.q;
    if (!searchTerm) {
        return res.status(400).json({ error: "Search term is required" });
    }

    const query = `SELECT name FROM products WHERE name LIKE ? LIMIT 10`;
    db.query(query, [`%${searchTerm}%`], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;