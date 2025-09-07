import React, { useEffect } from "react";

function SearchResults({ results }) {
  useEffect(() => {
    // Add background class to body
    document.body.className = "search-background";
    
    // Cleanup function to remove background class
    return () => {
      document.body.className = "";
    };
  }, []);
  if (!results) {
    return (
      <div className="card">
        <p className="loading">🔍 Type something in the search bar to find books...</p>
      </div>
    );
  }

  let books = [];

  if (Array.isArray(results)) {
    books = results;
  } else if (typeof results === "object") {
    books = [results];
  } else {
    return (
      <div className="card">
        <h2>🔍 Search Results</h2>
        <p className="error">{results}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>🔍 Search Results</h2>
      {books.length === 0 ? (
        <div className="card">
          <p className="loading">📭 No books found matching your search.</p>
        </div>
      ) : (
        <div className="book-grid">
          {books.map((book, idx) => (
            <div className="book-card" key={idx}>
              <h3>📚 {book.title || "Unknown Title"}</h3>
              <p><strong>👤 Author:</strong> {book.author || "N/A"}</p>
              <p><strong>🔢 ISBN:</strong> {book.isbn || "N/A"}</p>
              <p><strong>📋 Status:</strong> {book.status || "Available"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;