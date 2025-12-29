import React, { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Search.css";

const API = "http://127.0.0.1:8000";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await axios.get(`${API}/user/search_notes`, {
        params: { q: query }, 
      });

      setResults(res.data);
      console.log("Search results:", res.data);
    } catch (error) {
      console.error("Error searching notes:", error);
      alert("Failed to search notes");
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

      <div className="search">
        <h1>Search Notes</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
          <button type="submit">Search</button>
        </form>

        <div className="results">
          {results.map((note) => (
            <div key={note.id} className="note-card">
              <h3>{note.title}</h3>
              <p>{note.description}</p>
              <small>
                Created: {new Date(note.created_on).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
