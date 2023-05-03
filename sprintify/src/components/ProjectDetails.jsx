import { useParams } from "react-router-dom";

const ProjectDetails = () => {
  const params = useParams();
  console.log(params);
  return <h1>hello</h1>;
};
export default ProjectDetails;
