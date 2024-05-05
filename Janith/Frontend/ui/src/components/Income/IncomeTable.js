import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import Navbar from "../FinancialNavbar/Navbar";

const IncomeTable = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [salesData, setSalesData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);

  useEffect(() => {
    fetchTotalIncome();
    fetchSalesData();
    fetchIncomeData();
  }, []);

  const fetchTotalIncome = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/totalIncome"
      );
      setTotalIncome(response.data.totalIncome);
    } catch (error) {
      console.error("Error fetching total income:", error.message);
    }
  };

  const fetchSalesData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/Sale/getSelectedfeilds"
      );
      if (response && response.data) {
        setSalesData(response.data);
      }
    } catch (error) {
      console.error("Error fetching sales data:", error.message);
    }
  };

  const fetchIncomeData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/servicehistory/income-data"
      );
      setIncomeData(response.data.incomeData);
    } catch (error) {
      console.error("Error fetching income data:", error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Paper style={{ backgroundColor: "#f0f0f0", padding: "15px" }}>
          <b>Total Incomes:</b> Rs. {totalIncome}
        </Paper>
      </div>
      <div style={{ padding: "20px", marginTop:"5px" }}>
        <h1 style={{ textAlign: "Top-Left", marginBottom: "80px", marginRight: "90rem" }}>Tuskers Holdings Incomes</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead style={{ backgroundColor: "#f0f0f0" }}>
              <TableRow>
                <TableCell style={{ color: "black", fontSize: "20px" , fontWeight: 'bold'}}>Category</TableCell>
                <TableCell style={{ color: "black", fontSize: "20px",fontWeight: 'bold' }}>Date</TableCell>
                <TableCell style={{ color: "black", fontSize: "20px", fontWeight: 'bold' }}>Amounts</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesData &&
                salesData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {item.category}(Product Name: {item.productName})
                    </TableCell>
                    <TableCell>
                      {item.dateSold &&
                        new Date(item.dateSold).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{item.totalSales}</TableCell>
                  </TableRow>
                ))}
              {incomeData &&
                incomeData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {item.category}(Vehicle Id Number: {item.vin})
                    </TableCell>
                    <TableCell>
                      {new Date(item.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{item.cost}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default IncomeTable;
