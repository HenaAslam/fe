import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Main from "./components/Main";
import ProjectDetails from "./components/ProjectDetails";
import { useSelector } from "react-redux";

function App() {
  const BoardsOfLoggedUser = useSelector((state) => state.boardsOfUser.results);
  const [boardCount, setBoardCount] = useState(
    BoardsOfLoggedUser[0]?.boards.length
  );

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/main"
            element={<Main />}
            boardCount={boardCount}
            setBoardCount={setBoardCount}
          />
          <Route
            path="/boards/:id"
            element={<ProjectDetails />}
            boardCount={boardCount}
            setBoardCount={setBoardCount}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
