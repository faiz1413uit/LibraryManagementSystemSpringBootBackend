import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import AddBook from "./components/AddBook";
import SearchResults from "./components/SearchResults";
import BorrowReturn from "./components/BorrowReturn";
import api from "./api";
import "./App.css";

function App() {
  const [searchResults, setSearchResults] = useState(null);

  // Search handler passed to Header
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults("⚠️ Please enter a valid book title or author.");
      return;
    }
    try {
      const res = await api.put(`/search/${query}`);
      setSearchResults(res.data);
    } catch (err) {
      setSearchResults("❌ No Such Book Available");
    }
  };

  return (
    <div className="layout">
      <Header onSearch={handleSearch} />

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/borrow-return" element={<BorrowReturn />} />
          <Route path="/search" element={<SearchResults results={searchResults} />} />
        </Routes>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
