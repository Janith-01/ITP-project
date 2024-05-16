import React, { useState, useEffect } from 'react';
import InventoryNav from '../InventoryNav/InventoryNav';
import axios from 'axios';
import './home.css'; 

const Home = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [totalSales, setTotalSales] = useState(0); // New state for total sales
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total products and total value
        const stockResponse = await axios.get('http://localhost:8083/api/getall');
        const stockData = stockResponse.data;
        const totalQuantity = stockData.reduce((acc, curr) => acc + curr.quantity, 0);
        const totalVal = stockData.reduce((acc, curr) => acc + (curr.quantity * curr.unitPrice), 0);
        setTotalProducts(totalQuantity);
        setTotalValue(totalVal);

        // Fetch total sales
        const salesResponse = await axios.get('http://localhost:8083/Sale/getAll');
        const totalSalesAmount = salesResponse.data.reduce((acc, sale) => acc + sale.totalSales, 0);
        setTotalSales(totalSalesAmount);

        // Fetch out of stock products
        const outOfStockResponse = await axios.get('http://localhost:8083/api/getall');
        const outOfStock = outOfStockResponse.data.filter(product => product.status === 'out of stock');
        setOutOfStockProducts(outOfStock);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='home-background'>
      <InventoryNav />
      <div className='dashboard-title'>Dashboard Overview</div>
      <div className='product-value-container'>
        <div className='total-products'>
          <div className='total-products-title'><i className="fa-solid fa-bag-shopping"></i> Total Products in Stock:</div>
          <div className='total-products-count'>{totalProducts}</div>
        </div>

        <div className='total-value'>
          <div className='total-value-title'><i className="fa-solid fa-sack-dollar"></i> Total Value of Products (LKR):</div>
          <div className='total-value-count'>{totalValue}</div>
        </div>

        <div className='total-sales'>
          <div className='total-sales-title'><i className="fa-solid fa-coins"></i> Total Sales (LKR):</div>
          <div className='total-sales-count'>{totalSales}</div>
        </div>
      </div>

      <div className='dashboard-title'>Out of Stock Products</div>
      <div className='product-table-container'>
        <table className='product-table'>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Unit Price</th>
            </tr>
          </thead>
          <tbody>
            {outOfStockProducts.map(product => (
              <tr key={product._id}>
                <td>{product.productId}</td>
                <td>{product.productName}</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
                <td>{product.unitPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;

