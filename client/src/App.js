import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/HomePage';
import CustomerManager from "./components/CustomerManager";
import SalesManager from "./components/SalesManager";
import SalesByCustomer from "./components/SalesByCustomer";
import SalesChartPage from "./components/SalesChartPage";
import SalesByCompany from "./components/SalesByCompany";
import ProductList from "./components/ProductList";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/customers" element={<CustomerManager />} />
            <Route path="/sales" element={<SalesManager />} />
            <Route path="/salesbycustomer" element={<SalesByCustomer />} />
            <Route path="/salesbycompany" element={<SalesByCompany />} />
            <Route path="/productslist" element={<ProductList />} />
            <Route path="/saleschart" element={<SalesChartPage />} />

        </Routes>
    </BrowserRouter>
  );
}

export default App;
