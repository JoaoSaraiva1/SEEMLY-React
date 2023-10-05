/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TaskCard from "../components/Task_Card";
import TaskForm from "../components/Task_Form";
import TaskSorting from "../components/Task_Sorting";
import Task_Completed from "../components/Task_Completed";
import TaskSearch from "../components/Task_Search";
import Sidebar from "../components/Sidebar.jsx";
import { sortTasks } from "../utils/Sort_Tasks";

import "./Home.css";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [sortOption, setSortOption] = useState("date");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAndSortedTasks, setFilteredAndSortedTasks] = useState([]);

  //DATA FETCHING
  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data));

    fetch("http://localhost:5000/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  //SORTING and SEARCHING LOGIC
  const handleSort = (selectedSortOption) => {
    setSortOption(selectedSortOption);
  };

  const sortedTasks = sortTasks(tasks, sortOption);

  useEffect(() => {
    const filtered = tasks.filter((task) =>
      task.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sorted = sortTasks(filtered, sortOption);

    setFilteredAndSortedTasks(sorted);
  }, [tasks, searchQuery, sortedTasks, sortOption]);

  const handleSearch = (newQuery) => {
    setSearchQuery(newQuery);
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleAddTask = () => {
    setShowForm(false);
  };

  const completedTasks = sortedTasks.filter((task) => task.completion_state);

  const numberOfCompletedTasks = completedTasks.length;

  return (
    <div className="Main-Container">
      <div className="Sidebar-Container">
        <Sidebar />
      </div>
      <div className="Main-Content">
        <h1>Task Manager</h1>
        <div className="Display-Manipulation-Zone">
          <TaskSorting onSort={handleSort} />
          <Task_Completed
            completedTasks={numberOfCompletedTasks}
            totalTasks={tasks.length}
          />
        </div>
        <TaskSearch onSearch={handleSearch} />
        <div
          className="Tasks-Display"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          <div className="Add-Card" onClick={handleToggleForm}>
            <AddBoxIcon style={{ fontSize: 50 }} />
            <p>Add a new task</p>
          </div>
          {filteredAndSortedTasks.map((task) => (
            <TaskCard key={task.id} task={task} categories={categories} />
          ))}
        </div>
        {showForm && (
          <TaskForm
            isOpen={showForm}
            onAddTask={handleAddTask}
            onClose={handleToggleForm}
            categories={categories}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
