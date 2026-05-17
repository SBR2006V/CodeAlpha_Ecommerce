import axios from "axios";

const API = axios.create({
  baseURL: "https://codealpha-ecommerce-rppe.onrender.com/api",
});

export default API;
