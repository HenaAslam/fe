import React from "react";
import Task from "./Task";

const Column = ({ column, tasks }) => {
  return (
    <div>
      {tasks.map((task, index) => (
        <Task key={task._id} task={task} index={index} />
      ))}
    </div>
  );
};

export default Column;
