import React, { useState } from 'react';
import { TextField, Button, Container, Typography, IconButton, Paper } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header/Header';
import Sidebar from "../FinancialSidebar/FinancialSidebar.js";
import MenuIcon from "@mui/icons-material/Menu";
import pic1 from './pic1.jpg';

const ExpenseForm = () => {
    const [formData, setFormData] = useState({
        transactionId: '',
        amount: '',
        description: '',
        date: '',
        category: ''
    });
    const [showSidebar, setShowSidebar] = useState(false);

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
            if (!formData.transactionId || !formData.amount || !formData.description || !formData.date || !formData.category) {
                toast.error('Please fill in all fields!');
                return;
            }
            const amount = parseFloat(formData.amount);
            if (isNaN(amount) || amount <= 0) {
                toast.error('Please enter a valid amount!');
                return;
            }

            const formDataWithNumberAmount = {
                ...formData,
                amount
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
        <div style={{ position: "relative", minHeight: "100vh", background: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${pic1})`, backgroundSize: 'cover' }}>
            <div style={{ position: "fixed", top: 0, left: 0 }}>
                <IconButton
                    style={{ position: 'fixed', top: 0, left: 0, zIndex: 999, color: 'white' }}
                    onClick={() => setShowSidebar(!showSidebar)}
                >
                    <MenuIcon />
                </IconButton>
                <div style={{transform: `translateX(${showSidebar ? '0%' : '-100%'})`, transition: 'transform 0.3s ease', position: 'fixed', top: 0, left: 0, width: '250px', height: '100%', backgroundColor: '#fff', boxShadow: '2px 2px 10px rgba(0,0,0,0.1)', zIndex: 998, overflowY: 'auto' }}>
                {showSidebar && <Sidebar />}
                </div>
            </div>
            <div style={{ marginLeft: showSidebar ? "250px" : "0" }}>
                <Header/>
                <Container maxWidth="sm" style={{ marginTop: '100px' }}>
                    <Paper style={{ padding: "20px", backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                        <Typography variant="h4" align="center" gutterBottom>
                            Add Expense
                        </Typography>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <TextField
                                fullWidth
                                label="Transaction"
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
                    </Paper>
                </Container>
                <ToastContainer />
            </div>
        </div>
    );
};

export default ExpenseForm;
