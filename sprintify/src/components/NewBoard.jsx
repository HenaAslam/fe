import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { ADD_BOARD } from "../redux/actions";

const NewBoard = () => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const [boardname, setBoardname] = useState("");
  const [description, setDescription] = useState("");

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => setShow(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { boardname, description };
    try {
      const response = await fetch(`${process.env.REACT_APP_BE_URL}/boards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      dispatch({
        type: ADD_BOARD,
        payload: responseData,
      });

      console.log(responseData);
    } catch (error) {
      console.error(error);
      alert("Failed to create board");
    }
    handleClose();
  };

  return (
    <>
      <Button className="mt-5 new-board " onClick={handleShow}>
        Click here to create a new board!
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        scrollable
        className="add-exp-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="boardname">
              <Form.Label className="place">Board Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter board name"
                className="inputs"
                value={boardname}
                onChange={(event) => setBoardname(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label className="place">Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                className="inputs"
                onChange={(event) => setDescription(event.target.value)}
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
export default NewBoard;
