import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Main from "./components/Main";
import ProjectDetails from "./components/ProjectDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/main" element={<Main />} />
          <Route path="/boards/:id" element={<ProjectDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
