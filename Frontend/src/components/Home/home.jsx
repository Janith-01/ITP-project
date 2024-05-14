/*import React from 'react';
import Nav from '../Nav/Nav';
import './home.css'; 

const Home = () => {
  return (
    <div className='home-background'>
      <Nav />
     
      <div className='title'>
        Inventory Management Dashboard
      </div>
    </div>
  );
}

export default Home;*/


/*import React, { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import './home.css'; 

const Home = () => {
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/getall');
        const stockData = response.data;
        // Calculate total quantity
        const total = stockData.reduce((acc, curr) => acc + curr.quantity, 0);
        setTotalProducts(total);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, []);

  return (
    <div className='home-background'>
      <Nav />
     
      <div className='dashboard-container'>
        <div className='dashboard-title'>
          Inventory Management Dashboard
        </div>
        <div className='total-products'>
          <div className='total-products-title'>Total Products in Stock: <i class="fa-solid fa-bag-shopping"></i></div>
          <div className='total-products-count'>{totalProducts}</div>
        </div>
      </div>
    </div>
  );
}

export default Home;*/

import React, { useState, useEffect } from 'react';
import InventoryNav from '../InventoryNav/InventoryNav'
import axios from 'axios';
import './home.css'; 

const Home = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/getall');
        const stockData = response.data;

        // Calculate total quantity
        const totalQuantity = stockData.reduce((acc, curr) => acc + curr.quantity, 0);
        setTotalProducts(totalQuantity);

        // Calculate total value
        const totalVal = stockData.reduce((acc, curr) => acc + (curr.quantity * curr.unitPrice), 0);
        setTotalValue(totalVal);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, []);

  return (
    <div className='home-background'>
      <InventoryNav/>
        <div className='dashboard-title'>
          Inventory Management Dashboard
        </div>
        <div className='product-dashboard-container'>
        <div className='total-products'>
          <div className='total-products-title'><i className="fa-solid fa-bag-shopping"></i> Total Products in Stock:</div>
          <div className='total-products-count'>{totalProducts}</div>
        </div>
        </div>

        <div className='value-dashboard-container'>
        <div className='total-value'>
          <div className='total-value-title'><i className="fa-solid fa-sack-dollar"></i> Total Value of Products (LKR):</div>
          <div className='total-value-count'>{totalValue}</div>
        </div>
        </div>
  </div>
    
  );
}

export default Home;

