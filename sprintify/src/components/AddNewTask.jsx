import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";

const AddNewTask = ({ columnName, boardId, columnId, setBoard, board }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [task, setTask] = useState({
    title: "",
    description: "",
    // assignedTo: "",
    dueDate: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTask((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleAddTask = async (task) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/boards/${boardId}/columns/${columnId}/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(task),
        }
      );
      const newTask = await response.json();
      console.log(board);
      const updatedColumns = board.columns.map((column) => {
        if (column._id === columnId) {
          // add the new task to the column's tasks array
          return {
            ...column,
            tasks: [...column.tasks, newTask],
          };
        }
        return column;
      });

      // update the board state with the updated columns array
      setBoard((prevBoard) => ({
        ...prevBoard,
        columns: updatedColumns,
      }));
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  const deleteColumn = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/boards/${boardId}/columns/${columnId}`,
        {
          method: "DELETE",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const deletedColumn = await response.json();
      console.log("Deleted column:", deletedColumn);

      // Remove the deleted column from the board array
      const updatedBoard = {
        ...board,
        columns: board.columns.filter((column) => column._id !== columnId),
      };

      // Update the state of the board in your React component
      setBoard(updatedBoard);
    } catch (error) {
      console.error("Error deleting column:", error);
      // Handle the error in your UI
    }
  };
  const onAddTask = () => {
    handleAddTask(task);
    setTask({
      title: "",
      description: "",
      // assignedTo: "",
      dueDate: "",
    });
  };
  return (
    <>
      <h6 className="text-center d-flex mb-5">
        {columnName}{" "}
        <div className="ml-auto" style={{ cursor: "pointer" }}>
          <FaPlus onClick={handleShow} style={{ cursor: "pointer" }} />{" "}
          <FaTrash className="ml-2" onClick={deleteColumn} />{" "}
        </div>{" "}
      </h6>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onAddTask}>
            <Form.Group>
              <Form.Label className="place">Task title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter task title"
                className="inputs"
                value={task.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="place">Task description</Form.Label>
              <Form.Control
                name="description"
                type="text"
                placeholder="Enter task description"
                className="inputs"
                value={task.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* <Form.Group>
              <Form.Label className="place">Task assigned to</Form.Label>
              <Form.Control
                type="text"
                name="assignedTo"
                placeholder=" Assigned to"
                className="inputs"
                value={task.assignedTo}
                onChange={handleInputChange}
              />
            </Form.Group> */}
            <Form.Group>
              <Form.Label className="place">Due date</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                className="inputs"
                value={task.dueDate}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onAddTask}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddNewTask;
