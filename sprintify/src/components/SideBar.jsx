import { useEffect, useState } from "react";
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBoardsAction } from "../redux/actions";

const SideBar = ({ boardCount }) => {
  const token = localStorage.getItem("accessToken");

  const dispatch = useDispatch();
  let currentUserInfo = useSelector((state) => state.currentUser.currentUser);
  const BoardsOfLoggedUser = useSelector((state) => state.boardsOfUser.results);
  console.log(currentUserInfo);
  const [fetchedBoards, setFetchedBoards] = useState([]);
  let fetchedBoardss;

  useEffect(() => {
    const a = async () => {
      fetchedBoardss = await dispatch(fetchBoardsAction(token));
      console.log("f", fetchedBoardss);
      setFetchedBoards(fetchedBoardss);
    };
    a();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, token, boardCount]);

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
        {console.log("ASDDDDDDDDF", fetchedBoards)}
        <ListGroup className="mt-5">
          {fetchedBoards?.boards?.map((b) => (
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
