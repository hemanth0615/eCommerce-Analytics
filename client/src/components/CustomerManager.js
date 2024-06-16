// frontend/src/components/CustomersManager.js

import React, { useState, useEffect } from 'react';
import './CustomerManager.css'; // Import CSS file for styling
import Navbar from '../pages/Navbar';

const CustomersManager = () => {
  // State to hold customers data
  const [customers, setCustomers] = useState([]);
  // State to hold form data for adding/updating customers
  const [formData, setFormData] = useState({ name: '', email: '' });

  // Function to fetch customers data from backend
  const fetchCustomers = async () => {
    try {
      // Fetch customers data from backend API
      const response = await fetch('http://localhost:5000/api/customers');
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  // Function to handle form input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission for adding/updating customers
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // POST request to add new customer
      await fetch('http://localhost:5000/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      // Refresh customers data after adding/updating
      fetchCustomers();
      // Clear form data after submission
      setFormData({ name: '', email: '' });
    } catch (error) {
      console.error('Error adding/updating customer:', error);
    }
  };

  // Function to handle customer deletion
  const handleDelete = async (id) => {
    try {
      // DELETE request to delete customer by ID
      await fetch(`http://localhost:5000/api/customers/${id}`, {
        method: 'DELETE',
      });
      // Refresh customers data after deletion
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  // Fetch customers data on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="manager-container">
      <Navbar />
      <h1 className="title">Customers Manager</h1>
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">
          Name:
          <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-input" />
        </label>
        <label className="form-label">
          Email:
          <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-input" />
        </label>
        <button type="submit" className="form-button">Add Customer</button>
      </form>
      <div className="customer-grid">
        {customers.map((customer) => (
          <div key={customer.id} className="customer-card">
            <div>
              <strong>Name:</strong> {customer.name}
            </div>
            <div>
              <strong>Email:</strong> {customer.email}
            </div>
            <button onClick={() => handleDelete(customer.id)} className="delete-button">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomersManager;
