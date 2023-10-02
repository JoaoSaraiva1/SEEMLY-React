import React from "react";

const TaskSorting = ({ onSort }) => {
  
  const handleSort = (e) => {
    const selectedSortOption = e.target.value;
    onSort(selectedSortOption);
  };

  return (
    <div>
      <label htmlFor="sort">Sort by:</label>
      <select id="sort" onChange={handleSort}>
        <option value="date">Date</option>
        <option value="category">Category</option>
        <option value="uncompletedFirst">Uncompleted First</option>
        <option value="completedFirst">Completed First</option>
        {/* Add more sorting options as needed */}
      </select>
    </div>
  );
};

export default TaskSorting;
