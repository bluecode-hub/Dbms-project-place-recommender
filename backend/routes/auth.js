const express = require("express");
const router = express.Router();
const connectDB = require("../db");

// SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  try {
    const conn = await connectDB();

    if (!conn) {
      return res.status(500).json({ message: "Database connection failed" });
    }

    await conn.execute(
      `INSERT INTO users (name, email, password)
       VALUES (:name, :email, :password)`,
      [name, email, password],
      { autoCommit: true }
    );

    await conn.close();

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in signup" });
  }
});
// LOGIN (simple)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const conn = await connectDB();

    if (!conn) {
      return res.status(500).json({ message: "Database connection failed" });
    }

    const result = await conn.execute(
      `SELECT * FROM users WHERE email = :email AND password = :password`,
      [email, password]
    );

    await conn.close();

    if (result.rows.length > 0) {
      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error in login" });
  }
});
module.exports = router;