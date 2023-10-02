import axios from "axios";
import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IOSSwitch from "./Utils/IOSSwitch";
import Select from "react-select";

import "./Task_Card.css";

const Task_Card = ({ task, categories }) => {
  const {
    id,
    name: initialName,
    description: initialDescription,
    date: initialDate,
    completion_state,
    favorite,
  } = task;

  // Convert the ISO date string to a Date object
  const parsedDate = new Date(initialDate);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Format the parsed date
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    parsedDate
  );

  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [date, setDate] = useState(initialDate);
  const [isEditing, setIsEditing] = useState(false);
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(completion_state);
  const [taskCategory, setTaskCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({
    value: taskCategory.id,
    label: taskCategory.name,
  });

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  useEffect(() => {
    const selectedCategory = categories.find(
      (category) => category.id === task.category_id
    );
  
    if (selectedCategory) {
      const formattedCategory = {
        value: selectedCategory.id,
        label: selectedCategory.name,
      };
  
      setTaskCategory(formattedCategory);
      setSelectedCategory(formattedCategory);
    }
  }, [categories, task.category_id]);
  
  const categoryClassName = taskCategory
    ? `category-container category-${taskCategory.value}`
    : "category-container";

  const handleFavoriteClick = () => {
    const updatedTask = { ...task, favorite: !task.favorite };

    axios
      .put(`http://localhost:5000/tasks/${id}`, updatedTask)
      .then((response) => {
        setIsFavorite(!isFavorite);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    axios
      .delete(`http://localhost:5000/tasks/${id}`)
      .then((response) => {
        console.log(response.data);
        setIsDeleted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleCompletedChange = () => {
    const updatedTask = { ...task, completion_state: !isCompleted };

    axios
      .put(`http://localhost:5000/tasks/${id}`, updatedTask)
      .then((response) => {
        setIsCompleted(!isCompleted);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = () => {
    const updatedTask = {
      ...task,
      name,
      description,
      date,

      category_id: selectedCategory.value,
    };

    axios
      .put(`http://localhost:5000/tasks/${id}`, updatedTask)
      .then((response) => {

        setTaskCategory(selectedCategory);

      })
      .catch((error) => {
        console.log(error);
      });

    setIsEditing(false);
  };

  if (isDeleted) {
    return null;
  }

  const handleCancelClick = () => {
    setName(initialName);
    setDescription(initialDescription);
    setDate(initialDate);
    setIsEditing(false);
  };

  return (
    <div className="task-card">
      <div className={categoryClassName}>
        {taskCategory ? taskCategory.label : "No Category"}
      </div>
      {isEditing ? (
        <>
          <Select
            className="task-card_category_editing"
            value={selectedCategory}
            options={categoryOptions}
            onChange={(selectedOption) => {
              setSelectedCategory(selectedOption);
            }}
          />
          <Box sx={{ position: "absolute", top: 5, right: 5 }}>
            <IconButton onClick={handleCancelClick}>
              <CloseIcon />
            </IconButton>
          </Box>
          <input
            className="task-card_name_editing"
            type="text"
            value={name}
            placeholder="Name"
            onChange={handleNameChange}
          />
          <textarea
            className="task-card_description_editing"
            type="text"
            value={description}
            placeholder="Description"
            onChange={handleDescriptionChange}
          />
          <input
            className="task-card_date_editing"
            type="date"
            value={date}
            onChange={handleDateChange}
          />
          <button className="task-card_button_editing" onClick={handleSubmit}>
            Save
          </button>
        </>
      ) : (
        <>
          <p className="task-card_star" onClick={handleFavoriteClick}>
            {isFavorite ? (
              <StarIcon sx={{ fontSize: 32 }} />
            ) : (
              <StarBorderIcon sx={{ fontSize: 32 }} />
            )}
          </p>
          <h2 className="task-card_name">{name}</h2>
          <p className="task-card_description">{description}</p>
          <p className="task-card_date">{formattedDate}</p>
          <div className="task-card_line"></div>
          <div className="task-card_bottom">
            <IOSSwitch
              sx={{ m: 1 }}
              checked={isCompleted}
              onChange={handleCompletedChange}
            />
            <p
              className={`task-card_completion-state ${
                isCompleted ? "completed" : ""
              }`}
            >
              {isCompleted ? "Completed" : "Uncompleted"}
            </p>
            <div className="task-card_icons">
              <EditIcon className="task-card_icon" onClick={handleEditClick} />
              <DeleteIcon
                className="task-card_icon"
                onClick={handleDeleteClick}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Task_Card;
