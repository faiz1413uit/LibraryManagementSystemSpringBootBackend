import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/books", // adjust if backend runs on another port
});

export default api;
