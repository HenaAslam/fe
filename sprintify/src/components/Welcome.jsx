import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { MdLogout } from "react-icons/md";
import { useSelector } from "react-redux";

import { io } from "socket.io-client";
import NewBoard from "./NewBoard";

const Welcome = () => {
  let currentUserInfo = useSelector((state) => state.currentUser.currentUser);

  const [text] = useState(
    ` Welcome to SPRINTIFY Board! Streamline your workflow and organize your tasks with ease.`
  );
  const [displayText, setDisplayText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("animated-text");
    const storedText = localStorage.getItem("animated-text");
    if (storedText) {
      setDisplayText(storedText);
    } else {
      const intervalId = setInterval(() => {
        if (text.length === displayText.length) {
          clearInterval(intervalId);
          localStorage.setItem("animated-text", displayText);
          return;
        }
        setDisplayText(text.slice(0, displayText.length + 1));
      }, 50);
      return () => clearInterval(intervalId);
    }
  }, [text, displayText]);

  // useEffect(() => {
  //   const socket = io("http://localhost:3044", { transports: ["websocket"] });

  //   socket.on("connect", () => {
  //     console.log("Connected to socket server!");
  //     socket.emit("sendUserId", currentUserInfo._id);
  //   });

  //   socket.on("welcome", (welcomeMessage) => {
  //     console.log(welcomeMessage);
  //   });

  //   socket.on("disconnect", () => {
  //     console.log("Disconnected from socket server!");
  //   });

  //   socket.on("error", (error) => {
  //     console.error(error);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center new">
        <h6
          className="logout mt-3 mr-n5 p-2"
          onClick={() => {
            localStorage.removeItem("accessToken");
            navigate("/");
          }}
        >
          Logout <MdLogout />{" "}
        </h6>
        <h6 className="hello mt-3 ml-5 p-2">
          Hello, {currentUserInfo?.username}
        </h6>
        <div className="text-center">
          <h1 className="text-center">{displayText}</h1>
          <h5 className="text-center mt-5">
            {" "}
            Create boards, track progress, and achieve your goals.
          </h5>
          <NewBoard />
        </div>
      </Container>
    </>
  );
};

export default Welcome;
