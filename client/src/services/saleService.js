// services/salesService.js

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Example base URL for your backend API

const salesService = {
  getAllSales: async () => {
    return await axios.get(`${BASE_URL}/sales`);
  },
  createSale: async (saleData) => {
    return await axios.post(`${BASE_URL}/sales`, saleData);
  },
  // Similar functions for updating and deleting sales
};

export default salesService;
