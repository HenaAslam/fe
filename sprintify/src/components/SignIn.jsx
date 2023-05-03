import { Button, Container, Form } from "react-bootstrap";
import "../css/signin.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { persistedStore } from "../redux/store";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCurrentUser, updateAccessToken } from "../redux/actions";
const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      let res = await fetch(`${process.env.REACT_APP_BE_URL}/users/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const currentUser = await res.json();
        console.log(currentUser);
        localStorage.setItem("accessToken", currentUser.accessToken);
        dispatch(setCurrentUser(currentUser.user));
        console.log(currentUser.accessToken);
        dispatch(updateAccessToken(localStorage.getItem("accessToken")));

        // update the persisted state
        persistedStore.persist();
        navigate("/main");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container
        fluid
        className="d-flex align-items-center justify-content-center signin"
      >
        <div className="content  text-center">
          <h1>WELCOME</h1>
          <a href={`${process.env.REACT_APP_BE_URL}/users/googleLogin`}>
            <button className="google-btn p-2 mt-4">
              {" "}
              <FcGoogle size={25} className="m-2" />
              Sign up with Google
            </button>
          </a>

          <p className="m-5 or ">- OR -</p>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
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
              type="submit"
              className="create mt-5 mb-5"
            >
              Log In
            </Button>
          </Form>
          <span className="already  ">
            New here?
            <Link to="/signup">
              <span className="ml-2">Create an Account</span>
            </Link>
          </span>
        </div>
      </Container>
    </>
  );
};
export default SignIn;
