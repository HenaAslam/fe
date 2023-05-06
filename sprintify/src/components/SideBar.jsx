import { useEffect } from "react";
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBoardsAction } from "../redux/actions";

const SideBar = () => {
  const token = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  let currentUserInfo = useSelector((state) => state.currentUser.currentUser);
  const BoardsOfLoggedUser = useSelector((state) => state.boardsOfUser.results);

  console.log(currentUserInfo);
  useEffect(() => {
    dispatch(fetchBoardsAction(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        <ListGroup className="mt-5">
          {BoardsOfLoggedUser[0]?.boards.map((b) => (
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
