import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://strapi-todo.onrender.com/api",
});

export default axiosInstance;
