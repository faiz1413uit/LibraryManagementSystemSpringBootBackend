import React, { useState, useEffect } from "react";
import api from "../api";
import "./Home.css"; // reuse book-grid and book-card styles

function BorrowReturn() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [books, setBooks] = useState([]); // state for available books

  useEffect(() => {
    // Add background class to body
    document.body.className = "borrow-return-background";

    // Fetch available books
    fetchBooks();

    // Cleanup function
    return () => {
      document.body.className = "";
    };
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await api.get("/");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books", err);
    }
  };

  const borrowBook = async () => {
    if (!title.trim()) {
      setMessage("⚠️ Please enter a book title.");
      return;
    }

    try {
      const res = await api.put(`/borrow/${title}`);
      setMessage(`📚 ${res.data}`);
      fetchBooks(); // refresh books after borrowing
    } catch (err) {
      setMessage("❌ Error: Book not found or unavailable for borrowing.");
    }
  };

  const returnBook = async () => {
    if (!title.trim()) {
      setMessage("⚠️ Please enter a book title.");
      return;
    }

    try {
      const res = await api.put(`/return/${title}`);
      setMessage(`📖 ${res.data}`);
      fetchBooks(); // refresh books after returning
    } catch (err) {
      setMessage("❌ Error: Book not found or already returned.");
    }
  };

  return (
    <div>
      <div className="card">
        <h2>Borrow / Return Book</h2>
        <input
          type="text"
          placeholder="Enter book title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1rem",
            flexWrap: "wrap",
          }}
        >
          <button onClick={borrowBook}>📚 Borrow Book</button>
          <button onClick={returnBook}>📖 Return Book</button>
        </div>
        {message && <p>{message}</p>}
      </div>

      {/* Available books grid */}
      <div className="available-books">
        <h1>📚 Available Books</h1>
        {books.length === 0 ? (
          <p>No books available</p>
        ) : (
          <div className="book-grid">
            {books.map((book, idx) => (
              <div className="book-card" key={idx}>
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>ISBN: {book.isbn}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BorrowReturn;
