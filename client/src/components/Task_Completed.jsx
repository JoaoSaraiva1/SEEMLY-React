import React from "react";
import LinearProgress from "@mui/material/LinearProgress";

const Task_Completed = ({ completedTasks, totalTasks }) => {
  // Calculate the completion percentage
  const completionPercentage = (completedTasks / totalTasks) * 100;

  return (
    <div >
      {completedTasks}
      <LinearProgress variant="determinate" value={completionPercentage} />
      {totalTasks}
    </div>
  );
};

export default Task_Completed;
