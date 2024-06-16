import React, { useState, useEffect } from 'react';
import './SalesByCustomer.css'; // Import CSS file for styling
import Navbar from '../pages/Navbar';

const SalesByCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [sales, setSales] = useState([]);

  const fetchCustomers = async ()  => {
    try {
      const response = await fetch('http://localhost:5000/api/customers');
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchSalesByCustomer = async (customerId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/sales/customer/${customerId}`);
      const data = await response.json();
      setSales(data);
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  const handleCustomerChange = (e) => {
    const customerId = e.target.value;
    const customer = customers.find((c) => c.id === customerId);
    setSelectedCustomer(customerId);
    setCustomerName(customer ? customer.name : '');
    fetchSalesByCustomer(customerId);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="manager-container">
      <Navbar />
      <h1 className="title">Sales By Customer</h1>
      <label className="form-label">
        Select Customer:
        <select value={selectedCustomer} onChange={handleCustomerChange} className="form-input">
          <option value="">Select a customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
      </label>
      {customerName && <p className="selected-customer">Selected Customer: {customerName}</p>}
      <ul className="sales-list">
        {sales.map((sale) => (
          <li key={sale.id} className="sale-item">
            <span className="sale-info">Product: {sale.product}</span>
            <span className="sale-info">Amount: ${sale.amount}</span>
            <span className="sale-info">Sale Date: {sale.sale_date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalesByCustomer;
