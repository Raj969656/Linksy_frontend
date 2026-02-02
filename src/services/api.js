import axios from "axios";

const API = axios.create({
  baseURL: "https://url-shortner-backend-x55x.onrender.com",
});

// attach userId if logged in
API.interceptors.request.use((config) => {
  if (window.Clerk?.user) {
    config.headers["x-user-id"] = window.Clerk.user.id;
  }
  return config;
});

export default API;
