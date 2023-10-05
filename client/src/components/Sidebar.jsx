import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className={"Sidebar"}>
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
