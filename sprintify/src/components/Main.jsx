import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setCurrentUser } from "../redux/actions";
import { Col, Container, Row } from "react-bootstrap";
import SideBar from "./SideBar";
import Welcome from "./Welcome";
import "../css/main.css";
const Main = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getMeInfo = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      let res = await fetch(`${process.env.REACT_APP_BE_URL}/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        let userInfoFromGoogle = await res.json();
        dispatch(setCurrentUser(userInfoFromGoogle));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) navigate("/");
    if (searchParams.get("accessToken")) {
      console.log(searchParams.get("accessToken"));
      localStorage.setItem("accessToken", searchParams.get("accessToken"));
      getMeInfo();
      navigate("/main");
    }
  }, [getMeInfo, navigate, searchParams]);

  return (
    <>
      <Container fluid className=" board">
        <Row noGutters className="dash-row">
          <Col xs={2}>
            <SideBar />
          </Col>
          <Col xs={10}>
            <Welcome />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Main;
