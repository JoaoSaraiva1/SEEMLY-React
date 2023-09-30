const express = require("express");
const router = express.Router();
const pool = require("../db/db");

// CREATE a new category
router.post("/", async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = await pool.query(
            "INSERT INTO categories (name) VALUES($1) RETURNING *",
            [name]
        );
        res.json(newCategory.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// READ all categories
router.get("/", async (req, res) => {
    try {
        const allCategories = await pool.query("SELECT * FROM categories");
        res.json(allCategories.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// READ a single category
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const category = await pool.query(
            "SELECT * FROM categories WHERE category_id = $1",
            [id]
        );
        res.json(category.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// UPDATE a category
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedCategory = await pool.query(
            "UPDATE categories SET name = $1 WHERE category_id = $2",
            [name, id]
        );
        res.json("Category was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

// DELETE a category
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await pool.query(
            "DELETE FROM categories WHERE category_id = $1",
            [id]
        );
        res.json("Category was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;
