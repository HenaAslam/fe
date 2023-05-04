import { Col, Container, Row } from "react-bootstrap";

import SideBar from "./SideBar";

import BoardTasks from "./BoardTasks";

const ProjectDetails = () => {
  return (
    <>
      <Container fluid className=" board">
        <Row noGutters className="dash-row">
          <Col xs={2}>
            <SideBar />
          </Col>
          <Col xs={10}>
            <BoardTasks />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ProjectDetails;
