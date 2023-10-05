import React, { useState } from "react";

import "./Task_Search.css"; 

const TaskSearch = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="Task-Search-Container">
      <input
        className="Task-Search-Input" 
        type="text"
        placeholder="Search by task name or category..."
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
    </div>
  );
};

export default TaskSearch;
