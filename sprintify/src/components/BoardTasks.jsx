import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Board from "./Board";
import { fetchBoardsAction } from "../redux/actions";

const BoardTasks = (props) => {
  const params = useParams();

  const BoardsOfLoggedUser = useSelector((state) => state.boardsOfUser.results);

  const [board, setBoard] = useState(null);
  const dispatch = useDispatch();
  const updatedBoard = useSelector((state) => state.addBoard.board);
  const token = localStorage.getItem("accessToken");
  const [c, setC] = useState(null);
  let a;
  useEffect(() => {
    const b = async () => {
      a = await dispatch(fetchBoardsAction(token));
      console.log(a);
      setC(a);
    };
    b();
  }, [updatedBoard, token, dispatch]);

  console.log("c", c);
  let selectedBoard = c?.boards?.find(
    (b) => b._id.toString() === params.id.toString()
  );
  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BE_URL}/boards/${selectedBoard._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const data = await response.json();
        console.log("data", data);
        setBoard(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBoard]);

  const handleAddColumn = async (columnName) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/boards/${board._id}/columns`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ name: columnName }),
        }
      );
      const newColumn = await response.json();
      setBoard((prevBoard) => ({
        ...prevBoard,
        columns: [...prevBoard.columns, newColumn],
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    let columnId = draggableId.replace("column-", "");
    if (!destination) {
      return;
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/boards/${board._id}/columns/${columnId}/move`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ newIndex: destination.index }),
        }
      );
      const updatedColumn = await response.json();
      setBoard((prevBoard) => {
        const columns = [...prevBoard.columns];
        columns.splice(source.index, 1);
        columns.splice(destination.index, 0, updatedColumn);
        return { ...prevBoard, columns };
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (board === null) {
    return <div>Loading...</div>;
  }

  return (
    // <Container className="d-flex flex-column justify-content-center align-items-center ">
    <Container className="mt-5 text-center" style={{ overflowX: "auto" }}>
      <h4 style={{ fontWeight: "bold" }}>{selectedBoard?.boardname} </h4>
      <h6>{selectedBoard?.description}</h6>
      {console.log("board", board)}
      <Board
        board={board}
        onAddColumn={handleAddColumn}
        onDragEnd={handleDragEnd}
        setBoard={setBoard}
        boardId={selectedBoard._id}
      />
    </Container>
  );
};
export default BoardTasks;
