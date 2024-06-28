import axios from "axios";

const API_URL = "http://localhost:8000/books";

export const getBooks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getBookById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const getToken = () => {
  return localStorage.getItem("token");
};

export const createBook = async (formData) => {
  const token = getToken();
  const response = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateBook = async (id, title, author, publisher, year, pages) => {
  const response = await axios.put(`${API_URL}/${id}`, {
    title,
    author,
    publisher,
    year,
    pages,
  });
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
