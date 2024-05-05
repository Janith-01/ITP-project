import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Paper } from '@mui/material';
import Navbar from '../FinancialNavbar/Navbar';

const OverviewPage = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchTotalIncome();
    fetchTotalExpense();
    fetchBalance();
  }, []);

  const fetchTotalIncome = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/totalIncome');
      setTotalIncome(response.data.totalIncome);
    } catch (error) {
      console.error('Error fetching total income:', error.message);
    }
  };

  const fetchTotalExpense = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/totalExpense');
      setTotalExpense(response.data.totalExpense);
    } catch (error) {
      console.error('Error fetching total expense:', error.message);
    }
  };

  const fetchBalance = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transactions/balance');
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error.message);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom style={{ marginBottom: '1rem', marginTop: '5rem'}}>
          Overview
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} className="overview-section" style={{ padding: '2rem', marginTop: '5rem' }}>
              <Typography variant="h5" align="center" gutterBottom>
                Total Income
              </Typography>
              <Typography variant="h4" align="center">
                Rs.{totalIncome}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} className="overview-section" style={{ padding: '2rem', marginTop: '5rem' }}>
              <Typography variant="h5" align="center" gutterBottom>
                Total Expense
              </Typography>
              <Typography variant="h4" align="center">
                Rs.{totalExpense}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} className="overview-section" style={{ padding: '2rem', marginTop: '5rem' }}>
              <Typography variant="h5" align="center" gutterBottom>
                Profit
              </Typography>
              <Typography variant="h4" align="center">
                Rs.{balance}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default OverviewPage;
