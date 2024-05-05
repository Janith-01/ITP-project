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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../FinancialNavbar/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExpenseTable = () => {
  const [salaries, setSalaries] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [extraExpenses, setExtraExpenses] = useState([]);
  const [updateData, setUpdateData] = useState({});
  const [open, setOpen] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    fetchExpenseData();
    fetchSalaries();
    fetchExtraExpenses();
  }, []);

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/SalaryAdd/getAllSalary"
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
    const { name, value } = e.target;
    console.log("Input changed:", name, value);
    setUpdateData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

  return (
    <div>
      <Navbar />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
      >
        <Paper style={{ backgroundColor: "#f0f0f0", padding: "10px" }}>
          <b>Total Expense:</b> Rs. {totalExpense}
        </Paper>
        </div>
        <div style={{ position: 'fixed', top: '240px', right: '30px' }}>
        <Button
          variant="contained"
          onClick={handleAddExpenseClick}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
          }}
        >
          Add Extra Expense
        </Button>
        </div>
        <h1
          style={{
            textAlign: "Top-Left",
            marginBottom: "20px",
            marginLeft: "20px",
            marginTop: "2px",
          }}
        >
          Tuskers Holdings Expenses
        </h1>

      <div style={{ padding: "20px", marginTop: "50px" }}>
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
              {extraExpenses.map((expense) => (
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
  );
};

export default ExpenseTable;
