const express = require("express");
const router = express.Router();
const pool = require("../db/db"); 

// Create a task
router.post("/", async (req, res) => {
  try {
    const { name, description, date, completion_state, favorite, deleted } =
      req.body;
    const query = `
      INSERT INTO task_list_app.tasks (name, description, date, completion_state, favorite, deleted)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [
      name,
      description,
      date,
      completion_state,
      favorite,
      deleted,
    ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating a task" });
  }
});

// Read all tasks
router.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM task_list_app.tasks";
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

// Read a single task by ID
router.get("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const query = "SELECT * FROM task_list_app.tasks WHERE id = $1";
    const result = await pool.query(query, [taskId]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching task" });
  }
});

// Update a task by ID
router.put("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const { name, description, date, completion_state, favorite, deleted } =
      req.body;
    const query = `
      UPDATE task_list_app.tasks
      SET name = $1, description = $2, date = $3, completion_state = $4, favorite = $5, deleted = $6
      WHERE id = $7
      RETURNING *;
    `;
    const values = [
      name,
      description,
      date,
      completion_state,
      favorite,
      deleted,
      taskId,
    ];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating task" });
  }
});

// Delete a task by ID
router.delete("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const query = "DELETE FROM task_list_app.tasks WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [taskId]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.json({ message: "Task deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting task" });
  }
});

module.exports = router;
