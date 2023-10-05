import React from "react";
import "./Task_Sorting.css";

const TaskSorting = ({ onSort }) => {
  const handleSort = (e) => {
    const selectedSortOption = e.target.value;
    onSort(selectedSortOption);
  };

  return (
    <div className="Task-Sorting-Container">
      <label htmlFor="sort">Sort by:</label>
      <select id="sort" className="Task-Sorting-Select" onChange={handleSort}>
        <option value="date">Date</option>
        <option value="category">Category</option>
        <option value="uncompletedFirst">Uncompleted First</option>
        <option value="completedFirst">Completed First</option>
      </select>
    </div>
  );
};

export default TaskSorting;
