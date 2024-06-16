// services/customerService.js

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Example base URL for your backend API

const customerService = {
  getAllCustomers: async () => {
    return await axios.get(`${BASE_URL}/customers`);
  },
  createCustomer: async (customerData) => {
    return await axios.post(`${BASE_URL}/customers`, customerData);
  },
  // Similar functions for updating and deleting customers
};

export default customerService;
