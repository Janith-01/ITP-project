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
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { saveAs } from "file-saver";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import Sidebar from "../FinancialSidebar/FinancialSidebar.js";
import MenuIcon from "@mui/icons-material/Menu";
import Header from "../Header/Header.js";

const IncomeTable = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [salesData, setSalesData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const totalIncomeResponse = await axios.get(
        "http://localhost:5000/api/totalIncome"
      );
      setTotalIncome(totalIncomeResponse.data.totalIncome);

      const salesDataResponse = await axios.get(
        "http://localhost:5000/api/Sale/getSelectedfeilds"
      );
      setSalesData(salesDataResponse.data);

      const incomeDataResponse = await axios.get(
        "http://localhost:5000/api/servicehistory/income-data"
      );
      setIncomeData(incomeDataResponse.data.incomeData);

      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const generateReport = async () => {
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 12;

    let y = height - 50;

    page.drawText("Tuskers Holdings Incomes Report", {
      x: 50,
      y,
      size: 18,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });
    y -= 30;

    page.drawText(`Total Incomes: Rs. ${totalIncome}`, {
      x: 50,
      y,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });
    y -= 30;

    const salesTableData = filteredSalesData.map(
      (item) =>
        `${item.category}(Product Name: ${item.productName}), ${item.dateSold &&
          new Date(item.dateSold).toLocaleDateString()}, ${item.totalSales}`
    );
    const incomeTableData = filteredIncomeData.map(
      (item) =>
        `${item.category}(Vehicle Id Number: ${item.vin}), ${new Date(
          item.date
        ).toLocaleDateString()}, ${item.cost}`
    );

    const combinedTableData = [...salesTableData, ...incomeTableData];

    combinedTableData.forEach((rowData) => {
      page.drawText(rowData, {
        x: 50,
        y,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
      y -= 20;
    });

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, "income_report.pdf");
  };

  const filteredSalesData = salesData.filter((item) =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredIncomeData = incomeData.filter((item) =>
    item.vin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ position: "relative" }}>
      <Header />
      <div style={{ position: "fixed", top: 0, left: 0 }}>
        <IconButton
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 999, color: 'white' }}
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <MenuIcon />
        </IconButton>
        <div style={{transform: `translateX(${showSidebar ? '0%' : '-100%'})`, transition: 'transform 0.3s ease', position: 'fixed', top: 0, left: 0, width: '250px', height: '100%', backgroundColor: '#fff', boxShadow: '2px 2px 10px rgba(0,0,0,0.1)', zIndex: 998, overflowY: 'auto' }}>
          <Sidebar />
        </div>
      </div>
      <div style={{ marginLeft: showSidebar ? "250px" : "0" }}>
        
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
            position: "relative",
          }}
        >
          <Paper
            style={{
              backgroundColor: "#f0f0f0",
              padding: "25px",
              position: "flex",
              justifyContent: "center",
              display: "inline-flex",
              top: 30,
              left: 0,
              zIndex: 999,
            }}
          >
            <b>Total Incomes:</b>  Rs.{totalIncome}
          </Paper>
          <TextField
            label="Product Name/Vehicle Id Number"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            style={{
              position: "absolute",
              top: "200px",
              right: "40px",
              width: "300px",
            }}
          />
        </div>
        <div style={{ padding: "20px", marginTop: "5px" }}>
          <h1
            style={{
              textAlign: "left",
              marginBottom: "80px",
              marginRight: "80rem",
            }}
          >
            Tuskers Holdings Incomes
          </h1>
          
          <TableContainer component={Paper}>
            <Table style={{ padding: "20px", marginTop: "50px" }}>
              <TableHead style={{ backgroundColor: "#f0f0f0" }}>
                <TableRow>
                  <TableCell
                    style={{
                      color: "black",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    Category
                  </TableCell>
                  <TableCell
                    style={{
                      color: "black",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    style={{
                      color: "black",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    Amounts
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSalesData.map((item, index) => (
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
                {filteredIncomeData.map((item, index) => (
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
          <Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#2196F3",
              color: "white",
              position: "initial",
              bottom: "20px",
              right: "25px",
              marginBottom: "250px",
              marginTop: "20px",
            }}
            onClick={generateReport}
          >
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IncomeTable;
