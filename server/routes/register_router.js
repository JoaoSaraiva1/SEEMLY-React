const express = require("express");
const router = express.Router();
const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

router.post("/", [
  check('username').notEmpty().withMessage('Username is required.'),
  check('email').notEmpty().withMessage('Email is required.').isEmail().withMessage('Invalid email.'),
  check('password').notEmpty().withMessage('Password is required.').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password, profile_pic } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      "INSERT INTO task_list_app.users (username, email, password) VALUES ($1, $2, $3)",
      [username, email, hashedPassword]
    );
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    return res.status(201).json({ message: "Registration successful.", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
