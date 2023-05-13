import { Col, Container, Row } from "react-bootstrap";

import SideBar from "./SideBar";

import BoardTasks from "./BoardTasks";

const ProjectDetails = ({ boardCount, setBoardCount }) => {
  return (
    <>
      <Container fluid className=" board">
        <Row noGutters className="dash-row">
          <Col xs={2}>
            <SideBar />
          </Col>
          <Col xs={10}>
            <BoardTasks boardCount={boardCount} setBoardCount={setBoardCount} />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ProjectDetails;
