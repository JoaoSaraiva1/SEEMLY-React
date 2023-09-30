import React, { useState, useEffect } from "react";
import Task_Card from "../components/Task_Card";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div style={{}}>
      <h1>Task Manager</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {tasks.map((task) => (
          <Task_Card key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Home;
