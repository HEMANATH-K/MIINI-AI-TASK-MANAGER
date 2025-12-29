import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import Edit from "./components/Edit";
import Search from "./components/Search";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
};

export default App;
