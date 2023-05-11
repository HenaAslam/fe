import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

import AddNewTask from "./AddNewTask";
import Column from "./Column";
import { useNavigate } from "react-router-dom";

function Board({ board, onAddColumn, setBoard, boardId }) {
  const [newColumnName, setNewColumnName] = useState("");
  const navigate = useNavigate();

  const handleAddColumn = () => {
    onAddColumn(newColumnName);
    setNewColumnName("");
  };

  const handleNewColumnNameChange = (event) => {
    setNewColumnName(event.target.value);
  };

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    let columnId = draggableId.replace("column-", "");

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
    const url = `${process.env.REACT_APP_BE_URL}/boards/${boardId}/columns/${columnId}/move`;
    const data = { destinationIndex };
    axios.patch(url, data);
  };

  const handleDeleteBoard = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/boards/${boardId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      // return await response.json();
      navigate("/main");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="board">
        <div className="new-column">
          <Form className="mb-5 text-center d-flex flex-column align-items-center">
            <Form.Group>
              <Form.Control
                type="text"
                className="text-center"
                placeholder="New Column Name"
                value={newColumnName}
                onChange={handleNewColumnNameChange}
                style={{ width: "350px" }}
              />
            </Form.Group>
            <Button
              onClick={handleAddColumn}
              style={{ fontSize: "14px", width: "350px" }}
              variant="primary"
              className="rounded-pill py-1 px-2"
            >
              Add Column
            </Button>
            <Button
              onClick={handleDeleteBoard}
              style={{ fontSize: "14px", width: "350px" }}
              variant="primary"
              className="rounded-pill py-1 px-2 mt-3"
            >
              Delete Board
            </Button>
          </Form>
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
                        <AddNewTask
                          columnName={column.name}
                          boardId={boardId}
                          columnId={column._id}
                          setBoard={setBoard}
                          board={board}
                        />
                        <Column
                          key={column._id}
                          column={column}
                          tasks={column.tasks}
                          boardId={boardId}
                          setBoard={setBoard}
                          board={board}
                        />
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
