import React from "react";

import logoImage from "../images/logo.png";

import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className={"Sidebar"}>
      <img className="Logo-Image" src={logoImage} alt="Task Manager Logo" />
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
