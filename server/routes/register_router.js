// routes/register_router.js

const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res) => {
  const { username, email, password, profile_pic } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Username, email, and password are required." });
  }

  try {
    const result = await db.query(
      "INSERT INTO users (username, email, password, profile_pic) VALUES ($1, $2, $3, $4)",
      [username, email, password, profile_pic]
    );
    return res.status(201).json({ message: "Registration successful." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
