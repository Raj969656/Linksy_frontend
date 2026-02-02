import axios from "axios";

const API = axios.create({
  baseURL: "https://url-shortner-backend-x55x.onrender.com",
});

export default API;
