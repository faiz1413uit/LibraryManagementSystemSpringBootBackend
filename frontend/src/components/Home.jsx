import React, { useEffect, useState } from "react";
import api from "../api";
import "./Home.css";

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Add background class to body
    document.body.className = "home-background";

    // Fetch available books
    fetchBooks();

    // Cleanup function to remove background class
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

  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <h1>📖 Library Management System</h1>
        <p>
          Welcome to our modern library. Easily search books by book name or author
          name, add, borrow, and return books.
        </p>
      </div>

      {/* Books Grid */}
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

export default Home;
