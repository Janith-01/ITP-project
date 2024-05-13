import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CostByMonth.css';
import Nav from '../Nav/Nav';

const CostByMonth = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);

  useEffect(() => {
    fetchMonthlyExpenses();
  }, []);

  const fetchMonthlyExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/total-cost-by-month'); // Endpoint to fetch total cost by month
      setMonthlyExpenses(response.data);
    } catch (error) {
      console.error('Error fetching monthly expenses:', error);
    }
  };

  return (
    <div className="cost-by-month-container">
        <Nav />
      <h2>Monthly Service Cost</h2>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {monthlyExpenses.map((expense, index) => (
            <tr key={index}>
              <td>{getMonthName(expense._id)}</td>
              <td>{expense.totalCost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Helper function to get month name from month number
const getMonthName = (monthNumber) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months[monthNumber - 1];
};

export default CostByMonth;
