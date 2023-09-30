// Load environment variables from a .env file (if present)
const dotenv = require("dotenv").config();

// Import the Express.js library
const express = require("express");
const cors = require("cors"); // Import the cors middleware

// Create an instance of the Express application
const app = express();

const taskRouter = require("./routes/task_router.js");
const userRouter = require("./routes/user_router.js");
const loginRouter = require("./routes/login_router.js");
const registerRouter = require("./routes/register_router.js"); 

app.use(cors()); // Use the cors middleware
app.use(express.json());
app.use("/tasks", taskRouter);
app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

// Define the port for the server to listen on, defaulting to 3000
const port = process.env.DEV_PORT || 3000;
// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
