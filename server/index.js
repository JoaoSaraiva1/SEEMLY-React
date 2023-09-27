// Load environment variables from a .env file (if present)
const dotenv = require("dotenv").config();

// Import the Express.js library
const express = require("express");

// Create an instance of the Express application
const app = express();

// Define the port for the server to listen on, defaulting to 3000
const port = process.env.PORT || 3000;

const taskRouter = require("./routes/task_router.js");
const userRouter = require("./routes/user_router.js");

app.use("/tasks", taskRouter);
app.use("/users", userRouter);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
