import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
      <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/customers" className="nav-link">
            Customers
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/sales" className="nav-link">
            Sales
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/salesbycustomer" className="nav-link">
            Sales By Customer
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/salesbycompany" className="nav-link">
            Sales By Company
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/saleschart" className="nav-link">
            Sales Chart
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
