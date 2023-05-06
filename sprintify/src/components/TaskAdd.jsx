import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksAction } from "../redux/actions";

const TaskAdd = ({ columnname, boardId, columnId }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => setShow(false);
  const tasksOfBoard = useSelector((state) => state.tasksOfBoard.results);
  console.log(tasksOfBoard);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { title, description, assignedTo, dueDate };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/boards/${boardId}/columns/${columnId}/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
      alert("Failed to create board");
    }
    handleClose();
  };
  useEffect(() => {
    dispatch(
      fetchTasksAction(
        `${localStorage.getItem("accessToken")}`,
        `${boardId}`,
        `${columnId}`
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <h6 className="text-center d-flex">
        {columnname}{" "}
        <div className="ml-auto">
          <FaPlus onClick={handleShow} style={{ cursor: "pointer" }} />{" "}
          <FaTrash className="ml-2" />{" "}
        </div>{" "}
      </h6>
      <Modal
        show={show}
        onHide={handleClose}
        scrollable
        className="add-exp-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="place">Board Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                className="inputs"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="place">Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                className="inputs"
                onChange={(event) => setDescription(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="place">Assigned to</Form.Label>
              <Form.Control
                type="text"
                placeholder="Assigned to"
                value={assignedTo}
                className="inputs"
                onChange={(event) => setAssignedTo(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="place">Due date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Task due date"
                value={dueDate}
                className="inputs"
                onChange={(event) => setDueDate(event.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleSubmit}
            style={{ fontSize: "14px" }}
            variant="primary"
            className="rounded-pill py-1 px-2"
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default TaskAdd;
