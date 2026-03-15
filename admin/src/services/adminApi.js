import axios from "axios";

/*
-------------------------------------
GET BASE URL FROM ENV
-------------------------------------
*/

const BASE_URL = import.meta.env.VITE_API_URL;

/*
-------------------------------------
AXIOS INSTANCE
-------------------------------------
*/

const API = axios.create({
  baseURL: `${BASE_URL}/api/admin`,
  headers: {
    "Content-Type": "application/json"
  }
});

/*
-------------------------------------
ADD TOKEN AUTOMATICALLY
-------------------------------------
*/

API.interceptors.request.use(
  (config) => {

    // get token from localStorage
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


/*
-------------------------------------
HANDLE RESPONSE ERRORS
-------------------------------------
*/

API.interceptors.response.use(
  (response) => response,
  (error) => {

    // अगर token invalid हो जाए
    if (error.response && error.response.status === 401) {

      localStorage.removeItem("token");

      window.location.href = "/admin/login";
    }

    return Promise.reject(error);
  }
);


/*
-------------------------------------
ADMIN APIs
-------------------------------------
*/

// Dashboard
export const getDashboard = () => API.get("/dashboard");

// Users
export const getUsers = () => API.get("/users");

export const deleteUser = (id) =>
  API.delete(`/user/${id}`);


// Transactions
export const getTransactions = () =>
  API.get("/transactions");

export const deleteTransaction = (id) =>
  API.delete(`/transaction/${id}`);


/*
-------------------------------------
EXPORT API INSTANCE
-------------------------------------
*/

export default API;