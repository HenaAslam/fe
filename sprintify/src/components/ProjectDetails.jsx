import { useParams } from "react-router-dom";

const ProjectDetails = () => {
  const params = useParams();
  return <h1>{params}</h1>;
};
export default ProjectDetails;
