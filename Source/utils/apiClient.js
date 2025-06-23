import axios from 'axios';
import { BASE_URL } from '../api';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic GET request
export const getData = async (endpoint) => {
  const response = await apiClient.get(endpoint);
  return response.data;
};



// Generic POST request
export const postData = async (endpoint, body) => {
  const response = await apiClient.post(endpoint, body);
  return response.data;
};

export const deleteData = async (endpoint) => {
  const response = await apiClient.delete(endpoint);
  return response.data;
};

// utils/apiClient.js
export const putData = async (endpoint, body) => {
  const response = await apiClient.put(endpoint, body);
  return response.data;
};

