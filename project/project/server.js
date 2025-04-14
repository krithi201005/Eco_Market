const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.static(__dirname));
app.use(cors());
app.use(bodyParser.json());

// 🔹 Create MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Password@123",  // Change if needed
    database: "logindb"
});

// 🔹 Connect to MySQL with Error Handling
db.connect(err => {
    if (err) {
        console.error("❌ MySQL Connection Failed:", err.code, err.sqlMessage);
        process.exit(1); // Stop server if DB connection fails
    } else {
        console.log("✅ MySQL Connected!");
    }
});

// 🔹 Login API
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM user WHERE email = ?";

    db.query(query, [email], (err, results) => {
        if (err) {
            console.error("❌ SQL Query Error:", err.code, err.sqlMessage);
            return res.json({ success: false, message: "Database error." });
        }
        if (results.length === 0) {
            return res.json({ success: false, message: "User does not exist. Please sign up!" });
        }
        if (results[0].password !== password) {
            return res.json({ success: false, message: "Incorrect password!" });
        }
        return res.json({ success: true, message: "Login successful! Redirecting..." });
    });
});

// 🔹 Signup API
app.post("/signup", (req, res) => {
    const { name, email, password } = req.body;
    const checkQuery = "SELECT * FROM user WHERE email = ?";
    const insertQuery = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";

    db.query(checkQuery, [email], (err, results) => {
        if (err) {
            console.error("❌ SQL Query Error:", err.code, err.sqlMessage);
            return res.json({ success: false, message: "Database error." });
        }
        if (results.length > 0) {
            return res.json({ success: false, message: "User already exists! Please log in." });
        }

        db.query(insertQuery, [name, email, password], err => {
            if (err) {
                console.error("❌ SQL Insert Error:", err.code, err.sqlMessage);
                return res.json({ success: false, message: "Signup failed." });
            }
            return res.json({ success: true, message: "Signup successful! Please log in." });
        });
    });
});

// 🔹 Start the Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
