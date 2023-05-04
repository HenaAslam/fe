import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
function Board({ board, onAddColumn, onDragEnd }) {
  const [newColumnName, setNewColumnName] = useState("");

  const handleAddColumn = () => {
    onAddColumn(newColumnName);
    setNewColumnName("");
  };

  const handleNewColumnNameChange = (event) => {
    setNewColumnName(event.target.value);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
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
                <div className="column">
                  <input
                    type="text"
                    placeholder="New Column Name"
                    value={newColumnName}
                    onChange={handleNewColumnNameChange}
                  />
                  <button
                    onClick={handleAddColumn}
                    draggableid="add-column-button"
                  >
                    Add Column
                  </button>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
}
export default Board;
