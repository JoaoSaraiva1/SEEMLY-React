const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const pool = require("../db/db");

router.post(
  "/",
  [check("username").notEmpty(), check("password").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const user = await pool.query(
        "SELECT * FROM task_list_app.users WHERE username = $1",
        [username]
      );

      if (user.rows.length === 0) {
        return res
          .status(401)
          .json({ errors: [{ msg: "Invalid username" }] });
      }

      const isMatch = await bcrypt.compare(password, user.rows[0].password);

      if (!isMatch) {
        return res
          .status(401)
          .json({ errors: [{ msg: "Invalid password" }] });
      }

      const payload = {
        user: {
          id: user.rows[0].id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token, { httpOnly: true });
          res.json({ msg: "Login successful" });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
