import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:1337/api",
});
// baseURL: "https://strapi-todo.onrender.com/api",

export default axiosInstance;
