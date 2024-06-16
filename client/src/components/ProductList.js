import React from 'react';

const ProductList = ({ salesData, productSales, selectedYear, selectedYearsRange }) => {
  let filteredSales = salesData;

  if (selectedYear !== null) {
    filteredSales = filteredSales.filter((sale) => new Date(sale.sale_date).getFullYear() === selectedYear);
  }

  if (selectedYearsRange !== null) {
    const [startYear, endYear] = selectedYearsRange;
    filteredSales = filteredSales.filter((sale) => {
      const saleYear = new Date(sale.sale_date).getFullYear();
      return saleYear >= startYear && saleYear <= endYear;
    });
  }

  // Sort productSales in descending order based on quantity
  productSales.sort((a, b) => {
    const quantityA = filteredSales.filter((sale) => sale.product === a.productName).length;
    const quantityB = filteredSales.filter((sale) => sale.product === b.productName).length;
    return quantityB - quantityA;
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {productSales.map((productSale, index) => (
            <tr key={index}>
              <td>{productSale.productName}</td>
              <td>{filteredSales.filter((sale) => sale.product === productSale.productName).length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
