import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../FinancialNavbar/Navbar';

const ExpenseForm = () => {
    const [formData, setFormData] = useState({
        transactionId: '',
        amount: '',
        description: '',
        date: '',
        category: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataWithNumberAmount = {
                ...formData,
                amount: parseFloat(formData.amount)  
            };

            const response = await axios.post('http://localhost:5000/api/transactions/add-extraexpense', formDataWithNumberAmount);
            console.log('Response from backend:', response.data);
            setFormData({
                transactionId: '',
                amount: '',
                description: '',
                date: '',
                category: ''
            });

            toast.success('Expense added successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.error('Error submitting form data:', error.message);
        }
    };

    return (
        <div>
            <Navbar/>
            <Container maxWidth="sm" style={{ marginTop: '100px' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Add Expense
                </Typography>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <TextField
                        fullWidth
                        label="Transaction ID"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        type="number"
                        label="Amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        type="date"
                        label="Date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Add Expense
                    </Button>
                </form>
            </Container>
          <ToastContainer />
        </div>
    );
};

export default ExpenseForm;
