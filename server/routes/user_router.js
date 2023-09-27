const express = require("express");
const router = express.Router();
const pool = require("../db/db"); 

// Create a user
router.post("/", async (req, res) => {
  try {
    const { username, email, password, profile_pic } = req.body;
    const query = `
      INSERT INTO task_list_app.users (username, email, password, profile_pic)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [username, email, password, profile_pic];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating a user" });
  }
});

// Read all task_list_app.users
router.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM task_list_app.users";
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching task_list_app.users" });
  }
});

// Read a single user by ID
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const query = "SELECT * FROM task_list_app.users WHERE id = $1";
    const result = await pool.query(query, [userId]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching user" });
  }
});

// Update a user by ID
router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, password, profile_pic } = req.body;
    const query = `
        UPDATE task_list_app.users
        SET username = $1, email = $2, password = $3, profile_pic = $4
        WHERE id = $5
        RETURNING *;
      `;
    const values = [username, email, password, profile_pic, userId];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating user" });
  }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const query = "DELETE FROM task_list_app.users WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [userId]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json({ message: "User deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting user" });
  }
});

module.exports = router;
