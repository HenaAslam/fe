import { Form, Button, Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import leaf2 from "../assets/flower.png";
import { useDispatch } from "react-redux";
import "../css/signup.css";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "../redux/actions";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(process.env.REACT_APP_BE_URL);
    try {
      let res = await fetch(`${process.env.REACT_APP_BE_URL}/users`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const newUser = await res.json();
        console.log("New User: ", newUser);

        localStorage.setItem("accessToken", newUser.accessToken);
        dispatch(setCurrentUser(newUser.user));

        console.log(newUser.accessToken);
        navigate("/main");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid className="signup">
      <Row>
        <Col
          md={5}
          className="left d-none d-md-block "
          style={{ position: "relative" }}
        >
          <em>
            <h1> SPRINTIFY BOARD</h1>
          </em>

          <img
            src={leaf2}
            alt="leaf"
            height="600"
            width="600"
            className="leaf d-none d-md-block"
          />
        </Col>
        <Col
          md={7}
          className="right d-flex justify-content-center align-items-center"
        >
          <div className="text-center">
            <h1>Get Started</h1>

            <a href={`${process.env.REACT_APP_BE_URL}/users/googleLogin`}>
              <button className="google-btn p-2 mt-4">
                {" "}
                <FcGoogle size={25} className="m-2" />
                Sign up with Google
              </button>
            </a>

            <p className="m-5 or ">- OR -</p>
            <Form>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Full name"
                  value={user.username}
                  onChange={(e) => {
                    setUser({
                      ...user,
                      username: e.target.value,
                    });
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="email"
                  value={user.email}
                  placeholder="Email address"
                  onChange={(e) => {
                    setUser({
                      ...user,
                      email: e.target.value,
                    });
                  }}
                />
              </Form.Group>
              <Form.Group className="password-input-container">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) => {
                    setUser({
                      ...user,
                      password: e.target.value,
                    });
                  }}
                />
                <button
                  type="button"
                  className="password-toggle-button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </Form.Group>

              <Button
                variant="primary"
                // type="submit"
                className="create mt-5 mb-5"
                onClick={handleSubmit}
              >
                Create Account
              </Button>
            </Form>
            <span className="already  ">
              Already have an account?{" "}
              <Link to="/">
                <span>Log in</span>
              </Link>
            </span>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
