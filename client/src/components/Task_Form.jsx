import React, { useState } from "react";
import Modal from "react-modal";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import CreatableSelect from "react-select/creatable";

import "./Task_Form.css";

Modal.setAppElement("#root");

const Task_Form = ({ onClose, isOpen, categories }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [taskFavorite, setTaskFavorite] = useState(false);
  const [taskPriority, setTaskPriority] = useState("medium");
  const [taskCategory, setTaskCategory] = useState("");
  const [error, setError] = useState(null); // Added state for error handling

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: taskName,
          description: taskDescription,
          date: taskDate,
          favorite: taskFavorite,
          priority: taskPriority,
          category_id: taskCategory.value,
        }),
      });
      if (response.ok) {
        setTaskName("");
        setTaskDescription("");
        setTaskDate("");
        setTaskFavorite(false);
        setTaskPriority("medium");
        setTaskCategory("");
        onClose();
      } else {
        setError("Failed to add task");
      }
    } catch (error) {
      setError(
        "An error occurred during the fetch operation: " + error.message
      );
    }
  };

  const handleFavoriteClick = () => {
    setTaskFavorite(!taskFavorite);
  };

  const handlePriorityChange = (e) => {
    setTaskPriority(e.target.value);
  };

  const handleCategoryChange = (newValue) => {
    setTaskCategory(newValue);
  };

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <div>
      <Modal
        className="task-modal_content"
        isOpen={isOpen}
        onRequestClose={onClose}
        overlayClassName="task-modal_overlay"
      >
        <Box sx={{ position: "absolute", top: 5, right: 5 }}>
          <IconButton onClick={handleAddTask}>
            <CloseIcon />
          </IconButton>
        </Box>
        <form onSubmit={handleAddTask}>
          <div className="task-modal_title_area">
            <PlaylistAddIcon />
            <h1 className="task-modal_title">Add a new task</h1>
          </div>
          <div className="task-modal_input_area">
            <label>
              Task Name
              <input
                type="text"
                className="task-modal_name_input_field"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Task Description
              <textarea
                className="task-modal_textarea_field"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Date
              <input
                type="date"
                className="task-modal_date_input_field"
                value={taskDate || new Date().toISOString().substr(0, 10)}
                onChange={(e) => setTaskDate(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Priority
              <select
                className="task-modal_priority_select_field"
                value={taskPriority}
                onChange={handlePriorityChange}
                required
              >
                <option
                  className="task-modal_priority_select_field"
                  value="high"
                >
                  High
                </option>
                <option
                  className="task-modal_priority_select_field"
                  value="medium"
                >
                  Medium
                </option>
                <option
                  className="task-modal_priority_select_field"
                  value="low"
                >
                  Low
                </option>
              </select>
            </label>
            <br />
            <label className="task-modal_favorite">
              Favorite
              {taskFavorite ? (
                <StarIcon
                  className="task-modal_favorite_icon"
                  onClick={handleFavoriteClick}
                />
              ) : (
                <StarBorderIcon
                  className="task-modal_favorite_icon"
                  onClick={handleFavoriteClick}
                />
              )}
            </label>
            <label>
              Category
              <CreatableSelect
                options={categoryOptions}
                value={categoryOptions.value}
                onChange={handleCategoryChange}
                required
              />
            </label>
            <br />
          </div>
          <div className="task-modal_button_area">
            <button className="btn btn-primary" type="submit">
              Add
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Task_Form;
