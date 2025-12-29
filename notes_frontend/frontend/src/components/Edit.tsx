import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./Edit.css";
import axios from "axios";

const API = "http://127.0.0.1:8000";

const Edit: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const navigate = useNavigate();

  const [newTitle, setNewTitle] = useState(title || "");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      if (!title) return;
      try {
        const res = await axios.get(`${API}/user/notes`);
        const note = res.data.find((n: any) => n.title === title);
        if (note) {
          setNewTitle(note.title);
          setDescription(note.description);
        }
      } catch (err) {
        console.error(err);
        alert("Failed to load note");
      }
    };
    fetchNote();
  }, [title]);

  const handleUpdate = async () => {
    if (!title) return;
    try {
      await axios.put(`${API}/user/update_notes/${title}`, {
        title: newTitle,
        description: description,
      });
      alert("Note updated successfully!");
      navigate("/search");
    } catch (error) {
      console.error(error);
      alert("Failed to update note");
    }
  };

  const handleDelete = async () => {
    if (!title) return;
    try {
      await axios.delete(`${API}/user/delete_notes/${title}`);
      alert("Note deleted successfully!");
      navigate("/search");
    } catch (error) {
      console.error(error);
      alert("Failed to delete note");
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
        </div>
      </nav>

      <div className="edit">
        <h1>Edit Note</h1>
        <form>
          <div className="form-row">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Title"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </div>
          <div className="button-group">
            <button type="button" onClick={handleUpdate}>
              Update
            </button>
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
