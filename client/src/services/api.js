import axios from "axios";

const API = axios.create({
  baseURL: "https://codealpha-ecommerce-rppe.onrender.com",
});

export default API;
