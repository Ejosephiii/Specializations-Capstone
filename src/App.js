import React from "react";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./components/Home/Home.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Register />} path="/" />
          <Route element={<Home />} path="/home" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
