import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Paper, IconButton } from '@mui/material';
import Chart from 'chart.js/auto';
import Sidebar from "../FinancialSidebar/FinancialSidebar.js";
import MenuIcon from "@mui/icons-material/Menu";
import Header from '../Header/Header.js';

const OverviewPage = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const chartRef = useRef(null);
  const pieChartRef = useRef(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    fetchTotalIncome();
    fetchTotalExpense();
  }, []);

  useEffect(() => {
    if (totalIncome !== 0 && totalExpense !== 0) {
      fetchBalance();
    }
  }, [totalIncome, totalExpense]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    if (pieChartRef.current) {
      pieChartRef.current.destroy();
    }
    drawChart();
  }, [totalIncome, totalExpense, balance]);

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
      const response = await axios.get('http://localhost:5000/totalBalance');
      setBalance(response.data.totalBalance);
    } catch (error) {
      console.error('Error fetching balance:', error.message);
    }
  };

  const drawChart = () => {
    const ctx = document.getElementById('myChart');
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Total Income', 'Total Expense'],
        datasets: [{
          label: 'Percentage',
          data: [(totalIncome / (totalIncome + totalExpense) * 100).toFixed(2), (totalExpense / (totalIncome + totalExpense) * 100).toFixed(2)],
          backgroundColor: [
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 99, 132, 0.5)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + '%';
              }
            }
          }
        }
      }
    });

    // Pie chart
    const pieCtx = document.getElementById('pieChart');
    pieChartRef.current = new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: ['Profit', 'Total Expense', 'Total Income'],
        datasets: [{
          label: 'Amount',
          data: [balance, totalExpense, totalIncome],
          backgroundColor: [
            'rgba(75, 192, 192, 0.5)', // Profit
            'rgba(255, 99, 132, 0.5)',  // Total Expense
            'rgba(54, 162, 235, 0.5)',  // Total Income
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      }
    });
  };

  return (
    <>
    <div>
    <div style={{ position: 'relative' }}>
      <IconButton
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 999, color: 'white' }}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <MenuIcon />
      </IconButton>

      <Header />
      <div style={{ transform: `translateX(${showSidebar ? '0%' : '-100%'})`, transition: 'transform 0.3s ease', position: 'fixed', top: 0, left: 0, width: '250px', height: '100%', backgroundColor: '#fff', boxShadow: '2px 2px 10px rgba(0,0,0,0.1)', zIndex: 998, overflowY: 'auto' }}>
        <Sidebar />
      </div>

      <div style={{ marginLeft: showSidebar ? '250px' : '0', marginTop: '64px' }}>
        <Container maxWidth="md">
          <Typography variant="h4" align="center" gutterBottom style={{ marginBottom: '1rem' }}>
            Overview
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Paper elevation={3} className="overview-section" style={{ padding: '2rem' }}>
                <Typography variant="h5" align="center" gutterBottom>
                  Total Income
                </Typography>
                <Typography variant="h4" align="center">
                  Rs.{totalIncome}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper elevation={3} className="overview-section" style={{ padding: '2rem' }}>
                <Typography variant="h5" align="center" gutterBottom>
                  Total Expense
                </Typography>
                <Typography variant="h4" align="center">
                  Rs.{totalExpense}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper elevation={3} className="overview-section" style={{ padding: '2rem' }}>
                <Typography variant="h5" align="center" gutterBottom>
                  Profit
                </Typography>
                <Typography variant="h4" align="center">
                  Rs.{balance}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3} style={{ marginTop: '2rem' }}>
            <Grid item xs={12} sm={6}>
              <canvas id="myChart" style={{ height: '300px' }}></canvas>
            </Grid>
            <Grid item xs={12} sm={6}>
              <canvas id="pieChart" style={{ height: '300px' }}></canvas>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
    </div>
    </>
  );
};

export default OverviewPage;
