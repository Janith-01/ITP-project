import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateExpenseForm = () => {
    const [expenseData, setExpenseData] = useState({
        transactionId: '',
        date: '',
        amount: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchExpenseData();
    }, []);

    const fetchExpenseData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/transactions/get-extraexpense/${id}`);
            setExpenseData(response.data);
        } catch (error) {
            console.error('Error fetching extra expense data:', error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExpenseData({ ...expenseData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/transactions/update-extraexpense/${id}`, expenseData);
            navigate('/ExpenseTable');
        } catch (error) {
            console.error('Error updating extra expense:', error.message);
        }
    };

    return (
        <div style={{ margin: '20px auto', maxWidth: '500px' }}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <h1 style={{ textAlign: 'center' }}>Update Extra Expense</h1>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        name="transactionId"
                        label="Transaction ID"
                        value={expenseData.transactionId}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        name='description'
                        label='Description'
                        value={expenseData.description}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        name="date"
                        label="Date"
                        type="date"
                        value={expenseData.date}
                        onChange={handleInputChange}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        name="amount"
                        label="Amount"
                        type="number"
                        value={expenseData.amount}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>Update</Button>
                </form>
            </Paper>
        </div>
    );
};

export default UpdateExpenseForm;
