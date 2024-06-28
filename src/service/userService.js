import axios from "axios";

const API_URL = "http://localhost:8000/users";

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error users id", error);
    throw error;
  }
};

export const createUser = async (name, email, password) => {
  try {
    const response = await axios.post("http://localhost:8000/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Register Error", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:8000/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log("Error logging in: ", error);
    throw error;
  }
};

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const updateUser = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
