import React from "react";
import LinearProgress from "@mui/material/LinearProgress";

import "./Task_Completed.css";

const TaskCompleted = ({ completedTasks, totalTasks }) => {
  const completionPercentage = (completedTasks / totalTasks) * 100;

  return (
    <div className="Task-Completed-Container">
      <div>
        <LinearProgress
          variant="determinate"
          value={completionPercentage}
          color="success"
          style={{ height: "15px" , marginTop: "20px", borderRadius: "5px"}}
        />
      </div>
      <p className="Task-Complete-Information">
        {completedTasks} out of {totalTasks} completed
      </p>
    </div>
  );
};

export default TaskCompleted;
