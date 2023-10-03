import React, { useState } from "react";

 const TaskSearch = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by task name or category..."
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
    </div>
  );
};

export default TaskSearch;