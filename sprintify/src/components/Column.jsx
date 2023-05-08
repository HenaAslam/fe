import React, { useState } from "react";
import Task from "./Task";
import axios from "axios";

const Column = ({ column, tasks, onTaskDrop }) => {
  const [draggedTask, setDraggedTask] = useState(null);

  const handleTaskDragStart = (e, task) => {
    setDraggedTask(task);
  };

  const handleTaskDragOver = (e) => {
    e.preventDefault();
  };

  const handleTaskDrop = async (e, column) => {
    e.preventDefault();
    const updatedTask = { ...draggedTask, columnId: column._id };
    const res = await axios.put(
      `${process.env.REACT_APP_BE_URL}/boards/${draggedTask._id}/position`,
      updatedTask
    );
    onTaskDrop(res.data.updatedTask);
  };

  return (
    <div
      onDragOver={handleTaskDragOver}
      onDrop={(e) => handleTaskDrop(e, column)}
    >
      {tasks.map((task, index) => (
        <Task
          key={task._id}
          task={task}
          index={index}
          onDragStart={(e) => handleTaskDragStart(e, task)}
          draggable
        />
      ))}
    </div>
  );
};

export default Column;
