import React, { useState, useEffect } from "react";
import Task_Card from "../components/Task_Card";
import Task_Form from "../components/Task_Form";
import AddBoxIcon from "@mui/icons-material/AddBox";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data));

    fetch("http://localhost:5000/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleAddTask = () => {
    setShowForm(false);
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div
          className="add-card"
          style={{
            border: "2px dashed #BDBDBD",
            width: "300px",
            height: "215px",
            borderRadius: "16px",
            margin: "16px",
            padding: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            cursor: "pointer",
            backgroundColor: "#F5F5F5",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
          onClick={handleToggleForm}
        >
          <AddBoxIcon style={{ fontSize: 50 }} />
          <p style={{ margin: "8px", fontWeight: "bold" }}>Add a new task</p>
        </div>
        {tasks.map((task) => (
          <Task_Card key={task.id} task={task} categories={categories} />
        ))}
      </div>
      <div>
        <h2>Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      </div>
      {showForm && (
        <Task_Form
          isOpen={showForm}
          onAddTask={handleAddTask}
          onClose={handleToggleForm}
          categories={categories}
        />
      )}
    </div>
  );
};

export default Home;
