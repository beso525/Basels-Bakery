import axios from "axios";

const API_BASE_URL = import.meta.env.PROD ? "" : "http://localhost:5000";

const api = axios.create({
  baseURL : API_BASE_URL,
  withCredentials: true,
})

export default api;