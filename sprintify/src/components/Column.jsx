import React from "react";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";

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

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    // If the task was dropped outside of the column or at the same position, do nothing
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    // Call handleTaskMove to update the position of the task in the column
    await handleTaskMove(destination.index, draggableId);

    // Update the task order in the state of the board
    const tasks = Array.from(column.tasks);
    tasks.splice(source.index, 1);
    tasks.splice(destination.index, 0, draggableId);

    const updatedColumn = {
      ...column,
      tasks,
    };

    const updatedColumns = Array.from(board.columns);
    updatedColumns.splice(source.index, 1, updatedColumn);

    setBoard({ ...board, columns: updatedColumns });
  };

  const handleTaskMove = async (newPosition, draggableId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/boards/${boardId}/columns/${column._id}/tasks/${draggableId}/move`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPosition }),
        }
      );
      if (response.ok) {
        const updatedBoard = await response.json();
        setBoard(updatedBoard);
      } else {
        console.error("Failed to move task");
      }
    } catch (error) {
      console.error("Failed to move task", error);
    }
  };

  const updatedTasks = tasks.map((task, index) => ({
    ...task,
    index,
  }));

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={column._id}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.map((task, index) => (
                <Draggable
                  key={task._id}
                  draggableId={`task-${task._id}`}
                  index={task.index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Task
                        setBoard={setBoard}
                        boardId={boardId}
                        columnId={column._id}
                        key={task._id}
                        task={task}
                        onEditTask={(updatedTask) =>
                          onEditTask(boardId, column._id, task, updatedTask)
                        }
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Column;
