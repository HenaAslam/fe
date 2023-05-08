import React from "react";

const Task = ({ task, index }) => {
  return <div className="task-inside-column">{task.title}</div>;
};

export default Task;
