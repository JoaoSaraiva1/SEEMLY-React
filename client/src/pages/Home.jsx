/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TaskCard from "../components/Task_Card";
import TaskForm from "../components/Task_Form";
import TaskSorting from "../components/Task_Sorting";
import TaskCompleted from "../components/Task_Completed";
import TaskSearch from "../components/Task_Search";
import Sidebar from "../components/Sidebar.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { sortTasks } from "../utils/Sort_Tasks";

import "./Home.css";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [sortOption, setSortOption] = useState("date");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAndSortedTasks, setFilteredAndSortedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  //DATA FETCHING
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      fetch("http://localhost:5000/tasks")
        .then((response) => response.json())
        .then((data) => {
          setTasks(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching tasks:", error);
          setIsLoading(false);
        });

      fetch("http://localhost:5000/categories")
        .then((response) => response.json())
        .then((data) => setCategories(data));
    }, 1000);
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
  }, [searchQuery, sortOption, isLoading, page]);

  const handleSearch = (newQuery) => {
    setSearchQuery(newQuery);
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleAddTask = () => {
    setShowForm(false);
  };

  const updateTask = (taskId, updatedProperties) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, ...updatedProperties };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const completedTasks = sortedTasks.filter((task) => task.completion_state);

  const numberOfCompletedTasks = completedTasks.length;

  // Calculate the start and end indices for the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  // Slice the tasks to display only the tasks for the current page
  const tasksToDisplay = filteredAndSortedTasks.slice(startIndex, endIndex);

  return (
    <div className="Main-Container">
      <div className="Sidebar-Container">
        <Sidebar />
      </div>
      <div className="Main-Content">
        <div className="Display-Manipulation-Zone">
          <TaskSearch className="Task-Search" onSearch={handleSearch} />
          <TaskCompleted
            className="Task-Completed"
            completedTasks={numberOfCompletedTasks}
            totalTasks={tasks.length}
          />
          <TaskSorting className="Task-Sorting" onSort={handleSort} />
        </div>
        <div
          className="Tasks-Display"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          <div className="Add-Card" onClick={handleToggleForm}>
            <AddBoxIcon style={{ fontSize: 50 }} />
            <p>Add a new task</p>
          </div>
          {isLoading ? (
            <div className="Loading-State">
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            </div>
          ) : (
            tasksToDisplay.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                categories={categories}
                updateTask={updateTask}
              />
            ))
          )}
        </div>
        <div className="Pagination-Container">
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <Pagination
              count={Math.ceil(filteredAndSortedTasks.length / itemsPerPage)}
              page={page}
              onChange={(event, value) => setPage(value)}
            />
          </Stack>
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
