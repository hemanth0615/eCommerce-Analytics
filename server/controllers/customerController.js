// backend/controllers/customerController.js
const customerModel = require('../models/customerModel');

// Controller functions for customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await customerModel.getAllCustomers();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await customerModel.getCustomerById(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addCustomer = async (req, res) => {
  const customerData = req.body;
  try {
    const newCustomer = await customerModel.addCustomer(customerData);
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const customerData = req.body;
  try {
    const updatedCustomer = await customerModel.updateCustomer(id, customerData);
    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCustomer = await customerModel.deleteCustomer(id);
    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(deletedCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Controller function for batch customer creation
const createBatchCustomers = async (req, res) => {
  const customers = req.body; // Array of customer objects
  try {
    const createdCustomers = await Customer.insertMany(customers);
    res.status(201).json(createdCustomers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create customers' });
  }
};




module.exports = {
  getAllCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  createBatchCustomers
};
