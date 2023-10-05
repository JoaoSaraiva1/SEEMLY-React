import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import Select from "react-select";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import IOSSwitch from "./Utils/IOSSwitch";

import "./Task_Card.css";

const Task_Card = ({ task, categories, updateTask }) => {
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
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [deletedTask, setDeletedTask] = useState(null);
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
    ? `Category-Container Category-${taskCategory.value}`
    : "Category-Container";

  const handleFavoriteClick = () => {
    axios
      .put(`http://localhost:5000/tasks/${id}`, {
        ...task,
        favorite: !isFavorite,
      })
      .then(() => {
        setIsFavorite((prevIsFavorite) => !prevIsFavorite);

        updateTask(id, { favorite: !isFavorite });
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
        setIsDeleted(true);

        updateTask(id, { isDeleted: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteTask = (task) => {
    // Store the deleted task in the state
    setDeletedTask(task);

    // Show the Snackbar
    setIsSnackbarOpen(true);

    setIsDeleted(true);
  };

  const handleSnackbarClose = () => {
    // If the user clicked "Undo," you can re-add the deleted task
    if (deletedTask) {
      // Reset the state to undelete the task
      setIsDeleted(false);

      // You can also send an Axios request here to undelete the task on the server
      // Once undeleted, update the task list on success
      // Don't forget to reset the `deletedTask` state to `null`
      axios
        .put(`http://localhost:5000/tasks/${id}`, {
          ...task,
          isDeleted: false, // Update the `isDeleted` property on the server
        })
        .then(() => {
          // Update the task list on success
          updateTask(id, { isDeleted: false });
          setIsSnackbarOpen(false);
        })
        .catch((error) => {
          console.log(error);
        });

      setDeletedTask(null);
    } else {
      // If the Snackbar closes without "Undo," send the Axios DELETE request
      axios
        .delete(`http://localhost:5000/tasks/${id}`)
        .then((response) => {
          // Update the task list on success
          updateTask(id, { isDeleted: true });
          setIsSnackbarOpen(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
      .then(() => {
        setIsCompleted(!isCompleted);

        updateTask(id, { completion_state: !isCompleted });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmitEdit = () => {
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

        updateTask(id, updatedTask);
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
    <div className="Task-Card">
      <div className={categoryClassName}>
        {taskCategory ? taskCategory.label : "No Category"}
      </div>
      {isEditing ? (
        <>
          <Box sx={{ position: "absolute", top: 5, right: 5 }}>
            <IconButton onClick={handleCancelClick}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Select
            className="Task-Card_Category_Editing"
            value={selectedCategory}
            options={categoryOptions}
            onChange={(selectedOption) => {
              setSelectedCategory(selectedOption);
            }}
          />

          <input
            className="Task-Card_Name_Editing"
            type="text"
            value={name}
            placeholder="Name"
            onChange={handleNameChange}
          />

          <textarea
            className="Task-Card_Description_Editing"
            type="text"
            value={description}
            placeholder="Description"
            onChange={handleDescriptionChange}
          />
          <input
            className="Task-Card_Date_Editing"
            type="date"
            value={date}
            onChange={handleDateChange}
          />
          <button
            className="Task-Card_Button_Editing"
            onClick={handleSubmitEdit}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <p className="Task-Card_Star" onClick={handleFavoriteClick}>
            {isFavorite ? (
              <StarIcon sx={{ fontSize: 32 }} />
            ) : (
              <StarBorderIcon sx={{ fontSize: 32 }} />
            )}
          </p>
          <h2 className="Task-Card_Name">{name}</h2>
          <p className="Task-Card_Description">{description}</p>
          <p className="Task-Card_Date">{formattedDate}</p>
          <div className="Task-Card_Line"></div>
          <div className="Task-Card_Bottom">
            <IOSSwitch
              sx={{ m: 1 }}
              checked={isCompleted}
              onChange={handleCompletedChange}
            />
            <p
              className={`Task-Card_Completion-State ${
                isCompleted ? "Completed" : ""
              }`}
            >
              {isCompleted ? "Completed" : "Uncompleted"}
            </p>
            <div className="Task-Card_Icons">
              <EditIcon
                className="Task-Card_Icon"
                sx={{ fontSize: 30 }}
                onClick={handleEditClick}
              />
              <DeleteIcon
                sx={{ fontSize: 30 }}
                className="Task-Card_Icon"
                onClick={handleDeleteTask}
              />
            </div>
            <Snackbar
              open={isSnackbarOpen}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                severity="error"
                action={
                  <Button
                    color="inherit"
                    size="small"
                    onClick={handleSnackbarClose}
                  >
                    Undo
                  </Button>
                }
              >
                Task deleted.
              </MuiAlert>
            </Snackbar>
          </div>
        </>
      )}
    </div>
  );
};

export default Task_Card;
