import React, { useState, useEffect } from 'react';
import './SalesManager.css';
import Navbar from '../pages/Navbar';

const SalesManager = () => {
  // State to hold sales data
  const [sales, setSales] = useState([]);
  // State to hold form data for adding sales
  const [formData, setFormData] = useState({ product: '', amount: 0, customerId: '', saleDate: '' });
  // State to hold list of customers
  const [customers, setCustomers] = useState([]);
  // State to hold editing sale data
  const [editingSale, setEditingSale] = useState(null);

  // Function to fetch sales data from backend
  const fetchSales = async () => {
    try {
      // Fetch sales data from backend API
      const response = await fetch('http://localhost:5000/api/sales');
      const data = await response.json();
      // Check if data is an array before setting the sales state
      if (Array.isArray(data)) {
        setSales(data);
      } else {
        console.error('Fetched data is not an array:', data);
        // Set sales state to an empty array if data is not an array
        setSales([]);
      }
    } catch (error) {
      console.error('Error fetching sales:', error);
      // Ensure that sales state is set to an empty array if fetching fails
      setSales([]);
    }
  };

  // Function to fetch list of customers from backend
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

  // Function to handle form submission for adding sales
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // POST request to add new sale
      await fetch('http://localhost:5000/api/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      // Refresh sales data after adding
      fetchSales();
      // Clear form data after submission
      setFormData({ product: '', amount: 0, customerId: '', saleDate: '' });
    } catch (error) {
      console.error('Error adding sale:', error);
    }
  };

  // Function to handle sale deletion
  const handleDelete = async (id) => {
    try {
      // DELETE request to delete sale by ID
      await fetch(`http://localhost:5000/api/sales/${id}`, {
        method: 'DELETE',
      });
      // Refresh sales data after deletion
      fetchSales();
    } catch (error) {
      console.error('Error deleting sale:', error);
    }
  };

  // Function to handle opening the edit form popup
  const openEditForm = (sale) => {
    setEditingSale(sale);
  };

  // Function to handle updating sale
  const handleUpdate = async (updatedSale) => {
    try {
      // PUT request to update sale
      await fetch(`http://localhost:5000/api/sales/${updatedSale.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSale),
      });
      // Refresh sales data after updating
      fetchSales();
      // Close the edit form popup
      setEditingSale(null);
    } catch (error) {
      console.error('Error updating sale:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  

  // Fetch sales and customers data on component mount
  useEffect(() => {
    fetchSales();
    fetchCustomers();
  }, []);

  return (
    <div className="manager-container">
      <Navbar />
      <h1 className="title">Sales Manager</h1>
      <PostForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} handleInputChange={handleInputChange} customers={customers} />
      <div className="sales-grid">
        {sales.map((sale) => (
          <div key={sale.id} className="sale-card">
            <div className="sale-details">
              <strong>Customer Name:</strong> {sale.customer_name}
            </div>
            <div className="sale-details">
              <strong>Company Name:</strong> {sale.company_name}
            </div>
            <div className="sale-details">
              <strong>Product:</strong> {sale.product}
            </div>
            <div className="sale-details">
              <strong>Amount:</strong> ${sale.amount}
            </div>
            <div className="sale-details">
              <strong>Sale Date:</strong> {formatDate(sale.sale_date)}
            </div>
            <button onClick={() => openEditForm(sale)} className="edit-button">Edit</button>
            <button onClick={() => handleDelete(sale.id)} className="delete-button">Delete</button>
          </div>
        ))}
      </div>
      {editingSale && (
        <EditForm sale={editingSale} customers={customers} handleUpdate={handleUpdate} onClose={() => setEditingSale(null)} />
      )}
    </div>
  );
};

const PostForm = ({ formData, setFormData, handleSubmit, handleInputChange, customers }) => (
  <form onSubmit={handleSubmit} className="form">
    <label className="form-label">
      Amount:
      <input required type="number" name="amount" value={formData.amount || ''} onChange={handleInputChange} className="form-input" />
    </label>
    <label className="form-label">
      Customer:
      <select required name="customerId" value={formData.customerId || ''} onChange={handleInputChange} className="form-input">
        <option value="">Select Customer</option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>{customer.name}</option>
        ))}
      </select>
    </label>
    <label className="form-label">
      Company Name:
      <input required type="text" name="companyName" value={formData.companyName || ''} onChange={handleInputChange} className="form-input" />
    </label>
    <label className="form-label">Product:
      <input required type="text" name="product" value={formData.product || ''} onChange={handleInputChange} className="form-input" />
    </label>
    <label className="form-label">Sale Date:
      <input required type="date" name="saleDate" value={formData.saleDate || ''} onChange={handleInputChange} className="form-input" />
    </label>

    <button type="submit" className="form-button">Add Sale</button>
  </form>
);

const EditForm = ({ sale, customers, handleUpdate, onClose }) => {
  const [updatedSale, setUpdatedSale] = useState({ ...sale });

  const handleEditInputChange = (e) => {
    setUpdatedSale({ ...updatedSale, [e.target.name]: e.target.value });
  };

  const onUpdate = () => {
    handleUpdate(updatedSale);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Edit Sale</h2>
        <form className="update-form">
          <label>
            Amount:
            <input type="number" name="amount" value={updatedSale.amount || ''} onChange={handleEditInputChange} />
          </label>
          <label>
            Customer:
            <select name="customerId" value={updatedSale.customerId || ''} onChange={handleEditInputChange}>
              <option value="">Select Customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>{customer.name}</option>
              ))}
            </select>
          </label>
          <label>
            Company Name:
            <input type="text" name="companyName" value={updatedSale.companyName || ''} onChange={handleEditInputChange} />
          </label>
          <label>
            Product:
            <input type="text" name="product" value={updatedSale.product || ''} onChange={handleEditInputChange} />
          </label>
          <label>
            Sale Date:
            <input type="date" name="saleDate" value={updatedSale.saleDate || ''} onChange={handleEditInputChange} />
          </label>
          <button type="button" onClick={onUpdate}>Update</button>
        </form>
      </div>
    </div>
  );
};



export default SalesManager;
