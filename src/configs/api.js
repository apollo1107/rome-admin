import axios from "axios";
import { authConfig } from "./urls";

// Set environment-based API URLs
const LIVE_API_URL = process.env.NEXT_PUBLIC_LIVE_API;
const STAGING_API_URL = process.env.NEXT_PUBLIC_STAGING_API;
const DEBUG_API_URL = process.env.NEXT_PUBLIC_DEBUG_API;

// Choose base URL based on the environment
const baseUrl = process.env.NODE_ENV === 'production' ? LIVE_API_URL :
  process.env.NODE_ENV === 'staging' ? STAGING_API_URL :
    DEBUG_API_URL;

// Full API URL
const apiUrl = `${baseUrl}/api`;

// Create an Axios instance
const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Authorization header if token exists
const setAuthHeader = async () => {
  const token = await window.localStorage.getItem(authConfig.storageTokenKeyName);
  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers["Authorization"];
  }
};

// Interceptors for request and response handling
api.interceptors.request.use(
  (config) => {
    // Set the auth header before sending the request
    setAuthHeader();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors (e.g., unauthorized)
    if (error.response && error.response.status === 401) {
      // Add your logic for handling unauthorized errors (e.g., redirect to login)
      console.error("Unauthorized access, please login again.");
    }
    return Promise.reject(error);
  }
);

export const apiClient = api;

// Utility function for making POST requests with data
export const postRequest = async (url, data) => {
  try {
    const response = await apiClient.post(url, data);
    return response.data;
  } catch (error) {
    console.error(`Error in POST request to ${url}:`, error);
    throw error;
  }
};

// Utility function for making GET requests
export const getRequest = async (url, params) => {
  try {
    const response = await apiClient.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(`Error in GET request to ${url}:`, error);
    throw error;
  }
};

// Utility function for making PUT requests
export const putRequest = async (url, data) => {
  try {
    const response = await apiClient.put(url, data);
    return response.data;
  } catch (error) {
    console.error(`Error in PUT request to ${url}:`, error);
    throw error;
  }
};

// Utility function for making DELETE requests
export const deleteRequest = async (url) => {
  try {
    const response = await apiClient.delete(url);
    return response.data;
  } catch (error) {
    console.error(`Error in DELETE request to ${url}:`, error);
    throw error;
  }
};


// Example of POST request to add a user
// const addUser = async (userData) => {
//   try {
//     const response = await postRequest('/apps/users/add-user', userData);
//     console.log('User added:', response);
//   } catch (error) {
//     console.error('Error adding user:', error);
//   }
// };

// // Example of GET request to fetch a list of users
// const fetchUsers = async () => {
//   try {
//     const response = await getRequest('/apps/users');
//     console.log('Users:', response);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//   }
// };
