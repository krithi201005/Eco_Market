// server.js (Backend)
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.static(__dirname));
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Password@123",
    database: "logindb"
});

db.connect(err => {
    if (err) {
        console.error("MySQL Connection Failed:", err);
    } else {
        console.log("✅ MySQL Connected!");
    }
});

// Handle login
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM users WHERE email = ?";

    db.query(query, [email], (err, results) => {
        if (err) return res.json({ success: false, message: "Database error." });
        if (results.length === 0) return res.json({ success: false, message: "User does not exist. Please sign up!" });
        if (results[0].password !== password) return res.json({ success: false, message: "Incorrect password!" });
        
        return res.json({ success: true, message: "Login successful! Redirecting..." });
    });
});

// Handle signup
app.post("/signup", (req, res) => {
    const { name, email, password } = req.body;
    const checkQuery = "SELECT * FROM users WHERE email = ?";
    const insertQuery = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(checkQuery, [email], (err, results) => {
        if (err) return res.json({ success: false, message: "Database error." });
        if (results.length > 0) return res.json({ success: false, message: "User already exists! Please log in." });
        
        db.query(insertQuery, [name, email, password], err => {
            if (err) return res.json({ success: false, message: "Signup failed." });
            return res.json({ success: true, message: "Signup successful! Please log in." });
        });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});