import React from "react";
import "./Sidebar.css"; 

const Sidebar = ({ isSidebarVisible }) => {
  console.log("🚀 ~ file: Sidebar.jsx:5 ~ Sidebar ~ isSidebarVisible:", isSidebarVisible)
  return (
    <div className="Sidebar">
      <h2>Menu</h2>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/tasks">Tasks</a>
        </li>
        <li>
          <a href="/categories">Categories</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
