import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../FinancialSidebar/FinancialSidebar.js";
import MenuIcon from "@mui/icons-material/Menu";
import Header from "../Header/Header";
import { PDFDocument, rgb } from "pdf-lib";


const ExpenseTable = () => {
  const [salaries, setSalaries] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [extraExpenses, setExtraExpenses] = useState([]);
  const [updateData, setUpdateData] = useState({});
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    fetchExpenseData();
    fetchSalaries();
    fetchExtraExpenses();
  }, []);

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/SalaryAdd/getAllsalary"
      );
      setSalaries(response.data.data);
    } catch (error) {
      console.error("Error fetching salaries:", error.message);
    }
  };

  const fetchExpenseData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/totalExpense"
      );
      console.log(response.data);
      setTotalExpense(response.data.totalExpense);
    } catch (error) {
      console.error("Error fetching total expense:", error.message);
    }
  };

  const fetchExtraExpenses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/transactions/get-extraexpenses"
      );
      setExtraExpenses(response.data);
      console.log("Extra expenses fetched after update:", response.data);
    } catch (error) {
      console.error("Error fetching extra expenses:", error.message);
    }
  };

  const handleAddExpenseClick = () => {
    navigateTo("/ExpenseForm");
  };

  const handleEditClick = (expense) => {
    setUpdateData(expense);
    setOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/transactions/delete-extraexpense/${id}`
      );
      fetchExtraExpenses();
      toast.success("Extra Expense deleted successfully");
    } catch (error) {
      console.error("Error deleting extra expense:", error.message);
      toast.error("Error deleting extra expense");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUpdate = async () => {
    console.log("Update button clicked");
    try {
      const { _id, ...updateFields } = updateData;
      await axios.put(
        `http://localhost:5000/api/transactions/update-extraexpense/${_id}`,
        updateFields
      );
      fetchExtraExpenses();
      handleClose();
      toast.success("Extra Expense updated successfully");
    } catch (error) {
      console.error("Error updating extra expense:", error.message);
      toast.error("Error updating extra expense");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const filteredExpenses = extraExpenses.filter((expense) => {
    return (
      expense.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatDate(expense.date).includes(searchTerm.toLowerCase()) ||
      expense.amount.toString().includes(searchTerm.toLowerCase())
    );
  });

  const generateReport = async () => {
    try {
      const extraExpensesResponse = await axios.get(
        "http://localhost:5000/api/transactions/get-extraexpenses"
      );
      const extraExpensesData = extraExpensesResponse.data;
      
      const filteredExpenses = extraExpensesData.filter((expense) => {
        return (
          expense.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      const fontSize = 15;

      page.drawText("Expense Report", {
        x: 50,
        y: height - 50,
        size: fontSize + 10,
        color: rgb(0, 0, 0),
      });

      let y = height - 100;

      page.drawText(`Total Expense: Rs. ${totalExpense}`, {
        x: 50,
        y,
        size: fontSize,
        color: rgb(0, 0, 0),
      });

      y -= 50;

      const headers = ["Transaction ID", "Date", "Amount"];
      const cellWidth = (width - 100) / headers.length;
      const cellHeight = 50;

      headers.forEach((header, index) => {
        page.drawText(header, {
          x: 50 + index * cellWidth,
          y,
          size: fontSize,
          color: rgb(0, 0, 0),
        });
      });

      y -= cellHeight;

      filteredExpenses.forEach((expense) => {
        const rowData = [expense.transactionId, formatDate(expense.date), expense.amount];

        rowData.forEach((data, index) => {
          page.drawText(data, {
            x: 50 + index * cellWidth,
            y,
            size: fontSize,
            color: rgb(0, 0, 0),
          });
        });

        y -= cellHeight;
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "ExpenseReport.pdf";
      link.click();
    } catch (error) {
      console.error("Error generating PDF report:", error.message);
    }
  };

  return (
    <div>
      <Header />
     <div style={{ position: "relative", minHeight: "100vh" }}>
      <div style={{ position: "fixed", top: 0, left: 0 }}>
        <IconButton
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 999, color: 'white' }}
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <MenuIcon />
        </IconButton >
        <div style={{transform: `translateX(${showSidebar ? '0%' : '-100%'})`, transition: 'transform 0.3s ease', position: 'fixed', top: 0, left: 0, width: '250px', height: '100%', backgroundColor: '#fff', boxShadow: '2px 2px 10px rgba(0,0,0,0.1)', zIndex: 998, overflowY: 'auto' }}>
        {showSidebar && <Sidebar />}
        </div>
      </div>
      <div style={{ marginLeft: showSidebar ? "250px" : "0" }}>
        <div style={{ position: "relative" }}>
          <h1
            style={{
              textAlign: "Top-Left",
              marginBottom: "20px",
              marginLeft: "20px",
              marginTop: "90px",
            }}
          >
            Tuskers Holdings Expenses
          </h1>
        </div>
        <div style={{ padding: "20px", marginTop: "50px" }}>
        <Paper style={{ padding: "25px", backgroundColor: "#f0f0f0",maxWidth: "200px",alignItems: "center", margin: "auto",marginTop: "0px" }}>
            <b>Total Expenses:</b> Rs. {totalExpense}
          </Paper>
          <Button
            variant="contained"
            onClick={handleAddExpenseClick}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              marginBottom: "50px",
              marginLeft: "103rem",
            }}
          >
            Add Extra Expense
          </Button>
          <TextField
            label="Search by EmpID / Transaction ID"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleInputChange}
            style={{ marginBottom: "20px", maxWidth: "300px", marginLeft: "1540px"}}
          />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#f0f0f0" }}>
                  <TableCell style={{ fontWeight: "bold" }}>
                    EmpID / Transaction ID
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Month / Date
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Total / Amount
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {salaries.map((salary) => (
                  <TableRow key={salary._id}>
                    <TableCell>
                      {salary.EmpID}-({salary.Job_Role})
                    </TableCell>
                    <TableCell>{salary.Month}</TableCell>
                    <TableCell>{salary.Total}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
                {filteredExpenses.map((expense) => (
                  <TableRow key={expense._id}>
                    <TableCell>{expense.transactionId}-({expense.description})</TableCell>
                    <TableCell>{formatDate(expense.date)}</TableCell>
                    <TableCell>{expense.amount}</TableCell>
                    <TableCell>
                      <Button
                        style={{
                          marginRight: "5px",
                          backgroundColor: "#4CAF50",
                          color: "white",
                        }}
                        onClick={() => handleEditClick(expense)}
                      >
                        Edit
                      </Button>
                      <Button
                        style={{ backgroundColor: "#f44336", color: "white" }}
                        onClick={() => handleDeleteClick(expense._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            onClick={generateReport}
            style={{
              backgroundColor: "#2196F3",
              color: "white",
              position: "initial",
              bottom: "20px",
              right: "25px",
              marginBottom: "250px",
              marginTop: "20px",
            }}
          >
            Generate Report
          </Button>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Update Extra Expense</DialogTitle>
          <DialogContent>
            <form onSubmit={handleUpdate}>
              <TextField
                name="transactionId"
                label="Transaction ID"
                value={updateData.transactionId}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="amount"
                label="Amount"
                type="number"
                value={updateData.amount}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="description"
                label="Description"
                value={updateData.description}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="date"
                label="Date"
                type="date"
                value={formatDate(updateData.date)}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              style={{ backgroundColor: "#f44336", color: "white" }}
              onClick={handleClose}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              style={{
                marginRight: "5px",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
              onClick={handleUpdate}
              color="primary"
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      </div>
    </div>
  );
};

export default ExpenseTable;
