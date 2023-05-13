import { useEffect, useState } from "react";
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBoardsAction } from "../redux/actions";

const SideBar = () => {
  const dispatch = useDispatch();
  let currentUserInfo = useSelector((state) => state.currentUser.currentUser);
  const BoardsOfLoggedUser = useSelector((state) => state.boardsOfUser.results);
  console.log(currentUserInfo);

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

  return (
    <Container className="d-flex justify-content-center pt-5 side ">
      <div className="text-center">
        <Link to="/main">
          {" "}
          <div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Home-icon.svg/2048px-Home-icon.svg.png"
              height="20"
              alt=""
            />{" "}
            <span className="home-icon pl-2"> Home </span>
          </div>
        </Link>
        <h5 className="pt-5 boards-title ">YOUR BOARDS</h5>
        {console.log(c)}
        <ListGroup className="mt-5">
          {c?.boards?.map((b) => (
            <Link to={"/boards/" + b._id} key={b._id}>
              <ListGroupItem className="my-2" style={{ color: "black" }}>
                {b.boardname}
              </ListGroupItem>
            </Link>
          ))}

          {/* </Link> */}
        </ListGroup>
      </div>
    </Container>
  );
};

export default SideBar;
