import React, { useState, useEffect } from "react";
import api from "../api";

function AddBook() {
  const [book, setBook] = useState({ title: "", author: "", isbn: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Add background class to body
    document.body.className = "add-book-background";
    
    // Cleanup function to remove background class
    return () => {
      document.body.className = "";
    };
  }, []);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/insert", book);
      setMessage(`✅ ${res.data}`);
      setBook({ title: "", author: "", isbn: "" });
    } catch (err) {
      setMessage("❌ Error adding book. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="card">
      <h2>📝 Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={book.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author Name"
          value={book.author}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="isbn"
          placeholder="ISBN Number"
          value={book.isbn}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Book to Library</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddBook;