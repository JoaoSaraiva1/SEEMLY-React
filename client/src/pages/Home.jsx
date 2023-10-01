import React, { useState, useEffect } from "react";
import Task_Card from "../components/Task_Card";
import Task_Form from "../components/Task_Form";

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

  const handleAddTask = (newTask) => {
    // Handle adding the new task (you can implement this logic)
    // After adding the task, you may want to hide the form again
    setShowForm(false);
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {tasks.map((task) => (
          <Task_Card key={task.id} task={task} />
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
      <div
        className="add-card"
        style={{
          backgroundColor: "transparent",
          border: "1px dashed gray",
          height: "200px",
          width: "200px",
        }}
        onClick={handleToggleForm}
      >
        <p>Add a new task</p>
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
