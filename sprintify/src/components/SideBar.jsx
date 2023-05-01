import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SideBar = () => {
  let currentUserInfo = useSelector((state) => state.currentUser.currentUser);
  console.log(currentUserInfo);
  return (
    <Container className="d-flex justify-content-center pt-5 side ">
      <div className="text-center">
        <Link to="/">
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
          {/* boards.map */}
          {/* <Link to={"/board/"+id } > */}
          <ListGroupItem className="my-2">
            LinkedIn Clone Project Board
          </ListGroupItem>
          {/* </Link> */}
          <ListGroupItem className="my-2">
            Spotify Clone Project Board
          </ListGroupItem>
          <ListGroupItem className="my-2">
            WhatsApp Clone Project Board
          </ListGroupItem>
        </ListGroup>
      </div>
    </Container>
  );
};

export default SideBar;
