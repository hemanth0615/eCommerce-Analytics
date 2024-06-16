const pool = require('../config');

// Function to get all sales from the database
const getAllSales = async () => {
  try {
    const allSales = await pool.query('SELECT s.*, c.name AS customer_name FROM sales s INNER JOIN customers c ON s.customer_id = c.id');
    return allSales.rows;
  } catch (error) {
    throw error;
  }
};


// Function to get a sale by ID from the database
const getSaleById = async (saleId) => {
  try {
    const sale = await pool.query('SELECT * FROM sales WHERE id = $1', [saleId]);
    return sale.rows[0];
  } catch (error) {
    throw error;
  }
};

const addSale = async (saleData) => {
  const { customerId, companyName, product, amount, saleDate } = saleData;
  try {
    const newSale = await pool.query('INSERT INTO sales (customer_id, company_name, product, amount, sale_date) VALUES ($1, $2, $3, $4, $5) RETURNING *', [customerId, companyName, product, amount, saleDate]);
    return newSale.rows[0];
  } catch (error) {
    throw error;
  }
};

const updateSale = async (saleId, saleData) => {
  const { customerId, companyName, product, amount, saleDate } = saleData;
  try {
    const updatedSale = await pool.query('UPDATE sales SET customer_id = $1, company_name = $2, product = $3, amount = $4, sale_date = $5 WHERE id = $6 RETURNING *', [customerId, companyName, product, amount, saleDate, saleId]);
    return updatedSale.rows[0];
  } catch (error) {
    throw error;
  }
};



// Function to delete a sale from the database
const deleteSale = async (saleId) => {
  try {
    const deletedSale = await pool.query('DELETE FROM sales WHERE id = $1 RETURNING *', [saleId]);
    return deletedSale.rows[0];
  } catch (error) {
    throw error;
  }
};

const getSalesByCustomerId = async (customerId) => {
  try {
    const query = 'SELECT * FROM sales WHERE customer_id = $1';
    const values = [customerId];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    throw new Error(`Error fetching sales by customer ID: ${error.message}`);
  }
};
module.exports = {
  getAllSales,
  getSaleById,
  addSale,
  updateSale,
  deleteSale,
  getSalesByCustomerId
};