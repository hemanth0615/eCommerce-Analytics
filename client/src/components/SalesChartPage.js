import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Navbar from '../pages/Navbar';
import ProductList from './ProductList';

const SalesChartPage = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyMonthly, setSelectedCompanyMonthly] = useState('');
  const [selectedCompanyYearly, setSelectedCompanyYearly] = useState('');
  const [selectedChartTypeMonthly, setSelectedChartTypeMonthly] = useState('column');
  const [selectedChartTypeYearly, setSelectedChartTypeYearly] = useState('column');
  const [selectedYearFromMonthly, setSelectedYearFromMonthly] = useState(null);
  const [selectedYearFromYearly, setSelectedYearFromYearly] = useState(null);
  const [selectedYearTo, setSelectedYearTo] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const [productSales, setProductSales] = useState([]);

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

  const fetchSalesData = async (companyName) => {
    try {
      const response = await fetch(`http://localhost:5000/api/sales/company/${encodeURIComponent(companyName)}`);
      const data = await response.json();
      setSalesData(data);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  const fetchProductSales = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sales/products');
      const data = await response.json();
      setProductSales(data);
    } catch (error) {
      console.error('Error fetching product sales:', error);
    }
  };

  const aggregateMonthlySalesData = () => {
    const monthlySales = {};

    for (let i = 0; i < 12; i++) {
      const key = `${selectedYearFromMonthly}-${i}`;
      monthlySales[key] = 0;
    }

    salesData.forEach((sale) => {
      const saleDate = new Date(sale.sale_date);
      const year = saleDate.getFullYear();
      const month = saleDate.getMonth();

      if (year === selectedYearFromMonthly && sale.company_name === selectedCompanyMonthly) {
        const key = `${year}-${month}`;
        monthlySales[key] += 1;
      }
    });

    setMonthlyData(Object.entries(monthlySales).map(([key, count]) => ({ name: getMonthName(parseInt(key.split('-')[1])), y: count })));
  };

  const aggregateYearlySalesData = () => {
    const yearlySales = {};

    salesData.forEach((sale) => {
      const saleDate = new Date(sale.sale_date);
      const year = saleDate.getFullYear();

      if (year >= selectedYearFromYearly && year <= selectedYearTo && sale.company_name === selectedCompanyYearly) {
        if (!yearlySales[year]) yearlySales[year] = 0;
        yearlySales[year] += 1;
      }
    });

    setYearlyData(Object.entries(yearlySales).map(([year, count]) => ({ name: year.toString(), y: count })));
  };

  const aggregateProductSalesData = () => {
    const productSalesMap = {};

    salesData.forEach((sale) => {
      const productName = sale.product;

      if (!productSalesMap[productName]) {
        productSalesMap[productName] = 0;
      }

      productSalesMap[productName] += 1;
    });

    setProductSales(Object.entries(productSalesMap).map(([productName, count]) => ({ productName, salesCount: count })));
  };

  const getMonthName = (monthIndex) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthIndex];
  };

  const handleCompanyChangeMonthly = (e) => {
    const companyName = e.target.value;
    setSelectedCompanyMonthly(companyName);
    fetchSalesData(companyName);
  };

  const handleCompanyChangeYearly = (e) => {
    const companyName = e.target.value;
    setSelectedCompanyYearly(companyName);
    fetchSalesData(companyName);
  };

  const handleChartTypeChangeMonthly = (e) => {
    setSelectedChartTypeMonthly(e.target.value);
  };

  const handleChartTypeChangeYearly = (e) => {
    setSelectedChartTypeYearly(e.target.value);
  };

  const handleYearFromChangeMonthly = (e) => {
    setSelectedYearFromMonthly(parseInt(e.target.value));
  };

  const handleYearFromChangeYearly = (e) => {
    setSelectedYearFromYearly(parseInt(e.target.value));
  };

  const handleYearToChange = (e) => {
    setSelectedYearTo(parseInt(e.target.value));
  };

  const getSortedUniqueYears = () => {
    const uniqueYears = Array.from(new Set(salesData.map((sale) => new Date(sale.sale_date).getFullYear())));
    return uniqueYears.sort((a, b) => a - b);
  };

  useEffect(() => {
    fetchCompanies();
    fetchProductSales();
  }, []);

  useEffect(() => {
    if (salesData.length > 0) {
      aggregateMonthlySalesData();
      aggregateYearlySalesData();
      aggregateProductSalesData();
    }
  }, [salesData, selectedYearFromMonthly, selectedYearFromYearly, selectedYearTo, selectedCompanyMonthly, selectedCompanyYearly]);

  const isMonthlyDataValid = selectedCompanyMonthly && selectedYearFromMonthly;
  const isYearlyDataValid = selectedCompanyYearly && selectedYearFromYearly && selectedYearTo;

  const monthlyChartOptions = {
    chart: {
      type: selectedChartTypeMonthly,
    },
    title: {
      text: `Monthly Sales`,
    },
    xAxis: {
      categories: isMonthlyDataValid ? Object.keys(monthlyData).map(month => getMonthName(month)) : [],
    },
    yAxis: {
      title: {
        text: 'Number of Sales',
      },
    },
    series: [{
      name: 'Sales',
      data: isMonthlyDataValid ? Object.values(monthlyData) : [],
    }],
  };

  const yearlyChartOptions = {
    chart: {
      type: selectedChartTypeYearly,
    },
    title: {
      text: `Yearly Sales`,
    },
    xAxis: {
      categories: yearlyData.map((data) => data.name),
    },
    yAxis: {
      title: {
        text: 'Number of Sales',
      },
    },
    series: [{
      name: 'Sales',
      data: yearlyData.map((data) => ({ y: data.y })),
    }],
  };

  return (
    <div>
      <Navbar />
      <h1>Sales Chart</h1>

      {/* Monthly Sales Section */}
      <section>
        <h2>Monthly Sales</h2>
        <label>
          Select Company:
          <select value={selectedCompanyMonthly} onChange={handleCompanyChangeMonthly}>
            <option value="">Select a company</option>
            {companies.map((company, index) => (
              <option key={index} value={company}>
                {company}
              </option>
            ))}
          </select>
        </label>

        <label>
          Select Chart Type:
          <select value={selectedChartTypeMonthly} onChange={handleChartTypeChangeMonthly}>
            <option value="column">Column Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="pie">Pie Chart</option>
            <option value="line">Line Chart</option>
            <option value="area">Area Chart</option>
          </select>
        </label>

        <label>
          From Year:
          <select value={selectedYearFromMonthly || ''} onChange={handleYearFromChangeMonthly}>
            <option value="">Select a year</option>
            {getSortedUniqueYears().map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>

        {isMonthlyDataValid && (
          <>
            <h3>Monthly Sales Chart: {selectedYearFromMonthly}</h3>
            <HighchartsReact highcharts={Highcharts} options={monthlyChartOptions} />
            <h3>Products List</h3>
            <ProductList salesData={salesData} productSales={productSales} selectedYear={selectedYearFromMonthly} selectedYearsRange={null} />
          </>
        )}
      </section>

      {/* Yearly Sales Section */}
      <section>
        <h2>Yearly Sales</h2>
        <label>
          Select Company:
          <select value={selectedCompanyYearly} onChange={handleCompanyChangeYearly}>
            <option value="">Select a company</option>
            {companies.map((company, index) => (
              <option key={index} value={company}>
                {company}
              </option>
            ))}
          </select>
        </label>

        <label>
          Select Chart Type:
          <select value={selectedChartTypeYearly} onChange={handleChartTypeChangeYearly}>
            <option value="column">Column Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="pie">Pie Chart</option>
            <option value="line">Line Chart</option>
            <option value="area">Area Chart</option>
          </select>
        </label>

        <label>
  From Year:
  <select value={selectedYearFromYearly || ''} onChange={handleYearFromChangeYearly}>
    <option value="">Select a year</option>
    {getSortedUniqueYears().map((year, index) => (
      <option key={index} value={year}>
        {year}
      </option>
    ))}
  </select>
</label>

<label>
  To Year:
  <select value={selectedYearTo || ''} onChange={handleYearToChange}>
    <option value="">Select a year</option>
    {getSortedUniqueYears().map((year, index) => (
      <option key={index} value={year}>
        {year}
      </option>
    ))}
  </select>
</label>


        {isYearlyDataValid && (
          <>
            <h3>Yearly Sales Chart: {selectedYearFromYearly} - {selectedYearTo}</h3>
            <HighchartsReact highcharts={Highcharts} options={yearlyChartOptions} />
            <h3>Products List</h3>
            <ProductList salesData={salesData} productSales={productSales} selectedYear={null} selectedYearsRange={[selectedYearFromYearly, selectedYearTo]} />
          </>
        )}
      </section>
    </div>
  );
};

export default SalesChartPage;
