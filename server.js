const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Change if using a different MySQL user
    password: "Password@123", // Set your MySQL password
    database: "logindb",
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL Database");
});

// Import search routes
const searchRoutes = require("./search");
app.use("/search", searchRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});