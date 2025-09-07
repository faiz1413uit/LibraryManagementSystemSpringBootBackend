import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({ onSearch }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
    navigate("/search");
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" className="nav-link">📚 Home</Link>
        <Link to="/add" className="nav-link">➕ Add Book</Link>
        <Link to="/borrow-return" className="nav-link">🔄 Borrow/Return</Link>
      </div>
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search books by title or author..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">🔍 Search</button>
      </form>
    </nav>
  );
}

export default Header;