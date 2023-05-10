import React from "react";
import Task from "./Task";

const Column = ({ column, tasks, boardId, setBoard, board }) => {
  const onEditTask = async (boardId, columnId, task, updatedTask) => {
    try {
      console.log(updatedTask);
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/boards/${boardId}/columns/${columnId}/tasks/${task._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update the board state with the updated task

      const updatedColumns = board.columns.map((column) => {
        if (column._id === columnId) {
          return {
            ...column,
            tasks: column.tasks.map((t) =>
              t._id === task._id ? { ...t, ...updatedTask } : t
            ),
          };
        }
        return column;
      });

      setBoard((prevBoard) => ({
        ...prevBoard,
        columns: updatedColumns,
      }));
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  return (
    <div>
      {tasks.map((task, index) => (
        <Task
          tasks={tasks}
          key={task._id}
          index={index}
          task={task}
          onEditTask={(updatedTask) =>
            onEditTask(boardId, column._id, task, updatedTask)
          }
        />
      ))}
    </div>
  );
};

export default Column;
