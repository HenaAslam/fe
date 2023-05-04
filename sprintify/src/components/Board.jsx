import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";

function Board({ board, onAddColumn, setBoard, boardId }) {
  const [newColumnName, setNewColumnName] = useState("");

  const handleAddColumn = () => {
    onAddColumn(newColumnName);
    setNewColumnName("");
  };

  const handleNewColumnNameChange = (event) => {
    setNewColumnName(event.target.value);
  };

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // If dropped outside the droppable area
    if (!destination) {
      return;
    }

    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    setBoard((prevBoard) => {
      const columns = [...prevBoard.columns];
      const [removed] = columns.splice(sourceIndex, 1);
      columns.splice(destinationIndex, 0, removed);
      return { ...prevBoard, columns };
    });

    // Save updated board to database using API call
    const url = `${process.env.REACT_APP_BE_URL}/boards/${boardId}/columns/${draggableId}/move`;
    const data = { destinationIndex };
    axios.patch(url, data);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="board">
        <div className="new-column">
          <input
            type="text"
            placeholder="New Column Name"
            value={newColumnName}
            onChange={handleNewColumnNameChange}
          />
          <button onClick={handleAddColumn}>Add Column</button>
        </div>
        <div className="columns">
          <Droppable droppableId="columns" direction="horizontal">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="column-list"
              >
                {board.columns.map((column, index) => (
                  <Draggable
                    key={column._id}
                    draggableId={`column-${column._id}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="column"
                        key={column._id}
                      >
                        <h2>{column.name}</h2>
                        {/* Add task components here */}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
}

export default Board;
