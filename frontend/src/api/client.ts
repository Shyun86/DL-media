import axios from "axios";

/**
 * The base URL for the API.
 * It's read from the Vite environment variables.
 * @see https://vitejs.dev/guide/env-and-mode.html
 */
const VITE_API_URL = import.meta.env.VITE_API_URL;

/**
 * The main Axios instance for the application.
 * It's configured with the base URL and default headers.
 */
export const apiClient = axios.create({
  baseURL: VITE_API_URL || "/api", // Fallback to /api for development
  headers: {
    "Content-Type": "application/json",
  },
});

// You can add interceptors for request and response here.
// For example, to add an authentication token to every request.
// apiClient.interceptors.request.use(config => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default apiClient;
