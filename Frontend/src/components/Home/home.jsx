// Home.js
import React, { useState, useEffect } from 'react';
import InventoryNav from '../InventoryNav/InventoryNav';
import axios from 'axios';
import './home.css'; 

const Home = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get('http://localhost:8083/getall');
        const stockData = response.data;

        console.log("Stock Data:", stockData);

        // Calculate total quantity
        const totalQuantity = stockData.reduce((acc, curr) => acc + curr.quantitySold, 0);
        setTotalProducts(totalQuantity);

        console.log("Total Quantity:", totalQuantity);

        // Calculate total value
        const totalVal = stockData.reduce((acc, curr) => {
          console.log("Current Product:", curr);
          if (!isNaN(curr.quantitySold) && !isNaN(curr.unitPrice)) {
            const productValue = curr.quantitySold * curr.unitPrice;
            console.log("Product Value:", productValue);
            return acc + productValue;
          } else {
            return acc;
          }
        }, 0);

        console.log("Total Value:", totalVal);

        setTotalValue(totalVal);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, []);

  return (
    <div className='home-background'>
      <InventoryNav />
      <div className='dashboard-title'>
        Inventory Management Dashboard
      </div>
      <div className='product-value-container'>
        <div className='total-products'>
          <div className='total-products-title'><i className="fa-solid fa-bag-shopping"></i> Total Products in Stock:</div>
          <div className='total-products-count'>{totalProducts}</div>
        </div>

        <div className='total-value'>
          <div className='total-value-title'><i className="fa-solid fa-sack-dollar"></i> Total Value of Products (LKR):</div>
          <div className='total-value-count'>{totalValue}</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
