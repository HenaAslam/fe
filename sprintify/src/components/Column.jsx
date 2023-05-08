import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Task from "./Task";

const Column = ({ column, tasks }) => {
  const [stateTasks, setStateTasks] = useState(tasks);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStateTasks = Array.from(stateTasks);
    const [removed] = newStateTasks.splice(source.index, 1);
    newStateTasks.splice(destination.index, 0, removed);

    setStateTasks(newStateTasks);

    fetch(`${process.env.REACT_APP_BE_URL}/boards/${draggableId}/position`, {
      method: "PUT",
      body: JSON.stringify({ position: destination.index }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div>
      <h2>{column.title}</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={column._id}>
          {(provided, snapshot) => (
            <div
              className="task-column"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {stateTasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
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
