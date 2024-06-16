const pool = require('../config');

// Function to get all customers from the database
const getAllCustomers = async () => {
  try {
    const allCustomers = await pool.query('SELECT * FROM customers');
    return allCustomers.rows;
  } catch (error) {
    throw error;
  }
};

// Function to get a customer by ID from the database
const getCustomerById = async (customerId) => {
  try {
    const customer = await pool.query('SELECT * FROM customers WHERE id = $1', [customerId]);
    return customer.rows[0];
  } catch (error) {
    throw error;
  }
};

// Function to add a new customer to the database
const addCustomer = async (customerData) => {
  const { name, email } = customerData;
  try {
    const newCustomer = await pool.query('INSERT INTO customers (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
    return newCustomer.rows[0];
  } catch (error) {
    throw error;
  }
};

// Function to update an existing customer in the database
const updateCustomer = async (customerId, customerData) => {
  const { name, email } = customerData;
  try {
    const updatedCustomer = await pool.query('UPDATE customers SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, customerId]);
    return updatedCustomer.rows[0];
  } catch (error) {
    throw error;
  }
};

// Function to delete a customer from the database
const deleteCustomer = async (customerId) => {
  try {
    const deletedCustomer = await pool.query('DELETE FROM customers WHERE id = $1 RETURNING *', [customerId]);
    return deletedCustomer.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};
