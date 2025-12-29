import React, { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import "./Create.css";
import axios from "axios";

const API = "http://127.0.0.1:8000";

const Create: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) return;

    try {
      const res = await axios.post(`${API}/user/createnotes`, {
        title,
        description,
      });

      console.log("Created note:", res.data);
      alert(
        `Note Created:\nTitle: ${res.data.title}\nDescription: ${res.data.description}`
      );
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating note:", error);
      alert("Failed to create note");
    }
  };

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

      <div className="create">
        <h1>Create Note</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
