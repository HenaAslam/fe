import React from "react";

const Task = ({ task, index, onDragStart, draggable }) => {
  return (
    <div
      className="task-inside-column"
      onDragStart={onDragStart}
      draggable={draggable}
    >
      {task.title}
    </div>
  );
};

export default Task;
