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

const Task = ({ task, index, onEditTask, tasks }) => {
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
  return (
    <>
      <div className="task-inside-column d-flex align-items-center justify-content-center position-relative">
        {index !== 0 && (
          <div className="arrow top">
            <FiChevronUp />
          </div>
        )}
        {index !== lastIndex && (
          <div className="arrow bottom">
            <FiChevronDown />
          </div>
        )}
        <div className="arrow lefttt">
          <FiChevronLeft />
        </div>
        <div className="arrow righttt">
          <FiChevronRight />
        </div>
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
