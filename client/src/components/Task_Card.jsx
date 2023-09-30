import React from "react";
import "./Task_Card.css";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Task_Card = ({ task }) => {
  const { name, description, date, completion_state, favorite, deleted } = task;

  // Convert the ISO date string to a Date object
  const parsedDate = new Date(date);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Format the parsed date
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    parsedDate
  );

  return (
    <div className="task-card">
      <p className="task-card__star">{favorite ? <StarIcon /> : null}</p>
      <h2 className="task-card__name">{name}</h2>
      <p className="task-card__description">{description}</p>
      <p className="task-card__date">{formattedDate}</p>
      <div className="task-card__line"></div>
      <div className="task-card__bottom">
        <p className="task-card__completion-state">
          {completion_state ? "Completed" : "Uncompleted"}
        </p>
        <div className="task-card__icons">
          <EditIcon className="task-card__icon" />
          <DeleteIcon className="task-card__icon" />
        </div>
      </div>
    </div>
  );
};

export default Task_Card;
