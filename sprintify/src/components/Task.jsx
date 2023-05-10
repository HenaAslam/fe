import React, { useState } from "react";

import {
  FiChevronLeft,
  FiChevronUp,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Task = ({
  task,
  index,
  onEditTask,
  tasks,
  board,
  boardId,
  setBoard,
  columnId,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    assignedTo: task.assignedTo,
    dueDate: task.dueDate,
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditTask(editedTask);
    handleClose();
  };

  const lastIndex = tasks.length - 1;
  const handleMoveLeft = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/boards/${boardId}/columns/${columnId}/tasks/${task._id}/left`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentColumnId: columnId,
            currentTaskIndex: index,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to move task to the left");
      }

      const updatedBoardResponse = await fetch(
        `${process.env.REACT_APP_BE_URL}/boards/${boardId}`
      );
      if (!updatedBoardResponse.ok) {
        throw new Error("Failed to fetch updated board data");
      }
      const updatedBoard = await updatedBoardResponse.json();

      setBoard(updatedBoard);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMoveRight = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/boards/${boardId}/columns/${columnId}/tasks/${task._id}/right`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentColumnId: columnId,
            currentTaskIndex: index,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to move task to the right");
      }

      // Fetch the updated board data from the server
      const updatedBoardResponse = await fetch(
        `${process.env.REACT_APP_BE_URL}/boards/${boardId}`
      );
      if (!updatedBoardResponse.ok) {
        throw new Error("Failed to fetch updated board data");
      }
      const updatedBoard = await updatedBoardResponse.json();

      // Update the state of the board to the updated data
      setBoard(updatedBoard);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMoveTop = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/boards/${boardId}/columns/${columnId}/tasks/${task._id}/top`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentColumnId: columnId,
            currentTaskIndex: index,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to move task to the right");
      }

      // Fetch the updated board data from the server
      const updatedBoardResponse = await fetch(
        `${process.env.REACT_APP_BE_URL}/boards/${boardId}`
      );
      if (!updatedBoardResponse.ok) {
        throw new Error("Failed to fetch updated board data");
      }
      const updatedBoard = await updatedBoardResponse.json();

      // Update the state of the board to the updated data
      setBoard(updatedBoard);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMoveBottom = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/boards/${boardId}/columns/${columnId}/tasks/${task._id}/down`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentColumnId: columnId,
            currentTaskIndex: index,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to move task to the bottom");
      }

      // Fetch the updated board data from the server
      const updatedBoardResponse = await fetch(
        `${process.env.REACT_APP_BE_URL}/boards/${boardId}`
      );
      if (!updatedBoardResponse.ok) {
        throw new Error("Failed to fetch updated board data");
      }
      const updatedBoard = await updatedBoardResponse.json();

      // Update the state of the board to the updated data
      setBoard(updatedBoard);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="task-inside-column d-flex align-items-center justify-content-center position-relative">
        {!board.columns[0].tasks.includes(task) && (
          <div
            className="arrow lefttt"
            onClick={handleMoveLeft}
            style={{ cursor: "pointer" }}
          >
            <FiChevronLeft />
          </div>
        )}
        {!board.columns[board.columns.length - 1].tasks.includes(task) && (
          <div
            className="arrow righttt"
            onClick={handleMoveRight}
            style={{ cursor: "pointer" }}
          >
            <FiChevronRight />
          </div>
        )}
        {index !== 0 && (
          <div
            className="arrow top"
            onClick={handleMoveTop}
            style={{ cursor: "pointer" }}
          >
            <FiChevronUp />
          </div>
        )}
        {index !== lastIndex && (
          <div
            className="arrow bottom"
            onClick={handleMoveBottom}
            style={{ cursor: "pointer" }}
          >
            <FiChevronDown />
          </div>
        )}
        <div
          className="task-title d-flex align-items-center justify-content-center"
          style={{ cursor: "pointer", wordBreak: "break-all" }}
          onClick={handleShow}
        >
          {task.title}
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={editedTask.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={editedTask.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="assignedTo">
              <Form.Label>Assigned To</Form.Label>
              <Form.Control
                type="text"
                name="assignedTo"
                value={editedTask.assignedTo}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="dueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={editedTask.dueDate}
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Task;
