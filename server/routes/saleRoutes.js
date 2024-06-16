const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');

// Routes for sales
router.get('/', saleController.getAllSales);
router.get('/:id', saleController.getSaleById);
router.post('/', saleController.addSale);
router.put('/:id', saleController.updateSale);
router.delete('/:id', saleController.deleteSale);

// New route to get sales by customer ID
router.get('/customer/:customerId', saleController.getSalesByCustomer);

// New route to get sales by company name
router.get('/company/:companyName', saleController.getSalesByCompany);

router.get('/products', saleController.getUniqueProductSales);

module.exports = router;