import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IOSSwitch from "./Utils/IOSSwitch";

import "./Task_Card.css";

const Task_Card = ({ task }) => {
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

  const handleFavoriteClick = () => {
    const updatedTask = { ...task, favorite: !task.favorite };

    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then(() => setIsFavorite(!isFavorite))
      .catch((error) => console.log(error));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsDeleted(true);
      })
      .catch((error) => console.log(error));
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

    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then(() => setIsCompleted(!isCompleted))
      .catch((error) => console.log(error));
  };

  const handleSubmit = () => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        date,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

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
      {isEditing ? (
        <>
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
