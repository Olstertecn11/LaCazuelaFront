import axios from "axios";
import constants from "@/config/constants";

const api = axios.create({
  baseURL: constants.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para incluir token automáticamente
api.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('token') || 'null');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores globalmente (opcional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // manejar token expirado, redirigir al login, etc.
      console.warn("Token expirado");
    }
    return Promise.reject(error);
  }
);

export default api;
