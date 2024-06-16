const saleModel = require('../models/saleModel');
const pool = require('../config');

// Controller functions for sales
const getAllSales = async (req, res) => {
  try {
    const sales = await saleModel.getAllSales();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await saleModel.getSaleById(id);
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.json(sale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addSale = async (req, res) => {
  const saleData = req.body;
  try {
    const newSale = await saleModel.addSale(saleData);
    res.status(201).json(newSale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const saleData = req.body;
  try {
    const updatedSale = await saleModel.updateSale(id, saleData);
    if (!updatedSale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.json(updatedSale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSalesByCustomer = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const sales = await saleModel.getSalesByCustomerId(customerId);
    res.json(sales);
  } catch (error) {
    console.error('Error fetching sales by customer:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSale = await saleModel.deleteSale(id);
    if (!deletedSale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.json(deletedSale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSalesByCompany = async (req, res) => {
  const { companyName } = req.params;
  try {
    const sales = await pool.query('SELECT * FROM sales WHERE company_name = $1', [companyName]);
    res.json(sales.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching sales by company name' });
  }
};

const getUniqueProductSales = async (req, res) => {
  try {
    const uniqueProducts = await pool.query('SELECT product, COUNT(*) AS salesCount FROM sales GROUP BY product');
    res.json(uniqueProducts.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching unique product sales' });
  }
};


module.exports = {
  getAllSales,
  getSaleById,
  addSale,
  updateSale,
  deleteSale,
  getSalesByCustomer,
  getSalesByCompany,
  getUniqueProductSales
};
