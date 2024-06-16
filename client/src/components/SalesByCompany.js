import React, { useState, useEffect } from 'react';
// import './SalesByCompany.css';
import Navbar from '../pages/Navbar';

const SalesByCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [sales, setSales] = useState([]);

  const fetchCompanies = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sales');
      const data = await response.json();
      if (Array.isArray(data)) {
        const uniqueCompanies = [...new Set(data.map(item => item.company_name))];
        setCompanies(uniqueCompanies);
      } else {
        console.error('Fetched data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const fetchSalesByCompany = async (companyName) => {
    try {
      const response = await fetch(`http://localhost:5000/api/sales/company/${encodeURIComponent(companyName)}`);
      const data = await response.json();
      setSales(data);
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  const handleCompanyChange = (e) => {
    const companyName = e.target.value;
    setSelectedCompany(companyName);
    fetchSalesByCompany(companyName);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="manager-container">
      <Navbar />
      <h1 className="title">Sales By Company</h1>
      <label className="form-label">
        Select Company:
        <select value={selectedCompany} onChange={handleCompanyChange} className="form-input">
          <option value="">Select a company</option>
          {companies.map((company, index) => (
            <option key={index} value={company}>
              {company}
            </option>
          ))}
        </select>
      </label>
      <ul className="sales-list">
        {Array.isArray(sales) && sales.length > 0 ? (
          sales.map((sale) => (
            <li key={sale.id} className="sale-item">
              <span className="sale-info">Product: {sale.product}</span>
              <span className="sale-info">Amount: ${sale.amount}</span>
              <span className="sale-info">Sale Date: {sale.sale_date}</span>
              <span className="sale-info">Customer: {sale.customer_name}</span> {/* Added Customer Name */}
            </li>
          ))
        ) : (
          <li>No sales data available</li>
        )}
      </ul>
    </div>
  );
};

export default SalesByCompany;
