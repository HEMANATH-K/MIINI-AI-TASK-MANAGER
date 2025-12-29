import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">AI_Notes_Manager</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/create">Create</Link>
          <Link to="/search">Search</Link>
          <Link to="/edit/1">Edit</Link>
        </div>
      </nav>
      <div className="home">
        <h1>Home Page</h1>
        <p>Welcome to AI Notes Manager!</p>
      </div>
    </div>
  );
};

export default Home;
