// src/api/axiosInstance.ts
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseURL
});

// Intercept to add the JWT automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Excluir GET públicos si deseas
  if (token && token !== "null" && token !== "undefined") {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

//Intercept if the JWT is expired to be deleted
api.interceptors.response.use(
  (response) => response, // dejar pasar respuestas exitosas
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Token inválido o expirado. Eliminando token...");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
