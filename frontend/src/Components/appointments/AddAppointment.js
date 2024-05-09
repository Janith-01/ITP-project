import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Container, Grid, Paper } from '@mui/material';

function AddAppointment() {
  const [appointment, setAppointment] = useState({
    date: '',
    time: '',
    description: '',
    vehicleMake: '',
    vehicleModel: '',
    serviceType: '',
    customerName: '',
    customerEmail: '',
    customerPhone: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post('http://localhost:5000/users/appointments', appointment);
        setAppointment({
          date: '',
          time: '',
          description: '',
          vehicleMake: '',
          vehicleModel: '',
          serviceType: '',
          customerName: '',
          customerEmail: '',
          customerPhone: ''
        });
        alert('Appointment added successfully!');
      } catch (error) {
        console.error('Error adding appointment:', error);
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!appointment.date) {
      errors.date = 'Date is required';
      valid = false;
    }

    if (!appointment.time) {
      errors.time = 'Time is required';
      valid = false;
    }

    if (!appointment.description) {
      errors.description = 'Description is required';
      valid = false;
    }

    if (!appointment.vehicleMake) {
      errors.vehicleMake = 'Vehicle make is required';
      valid = false;
    }

    if (!appointment.vehicleModel) {
      errors.vehicleModel = 'Vehicle model is required';
      valid = false;
    }

    if (!appointment.serviceType) {
      errors.serviceType = 'Service type is required';
      valid = false;
    }

    if (!appointment.customerName) {
      errors.customerName = 'Customer name is required';
      valid = false;
    }

    if (!appointment.customerEmail) {
      errors.customerEmail = 'Customer email is required';
      valid = false;
    } else if (!isValidEmail(appointment.customerEmail)) {
      errors.customerEmail = 'Invalid email format';
      valid = false;
    }

    if (!appointment.customerPhone) {
      errors.customerPhone = 'Customer phone number is required';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const isValidEmail = (email) => {
    // Simple email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Link to="/mainhome">Back</Link>
      <Typography variant="h4" align="center" gutterBottom>
        Add New Appointment
      </Typography>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="date"
                label="Date"
                name="date"
                value={appointment.date}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.date}
                helperText={errors.date}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="time"
                label="Time"
                name="time"
                value={appointment.time}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.time}
                helperText={errors.time}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                label="Description"
                name="description"
                placeholder="Description"
                value={appointment.description}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                label="Vehicle Make"
                name="vehicleMake"
                placeholder="Vehicle Make"
                value={appointment.vehicleMake}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.vehicleMake}
                helperText={errors.vehicleMake}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                label="Vehicle Model"
                name="vehicleModel"
                placeholder="Vehicle Model"
                value={appointment.vehicleModel}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.vehicleModel}
                helperText={errors.vehicleModel}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                label="Service Type"
                name="serviceType"
                placeholder="Service Type"
                value={appointment.serviceType}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.serviceType}
                helperText={errors.serviceType}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                label="Customer Name"
                name="customerName"
                placeholder="Customer Name"
                value={appointment.customerName}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.customerName}
                helperText={errors.customerName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Customer Email"
                name="customerEmail"
                placeholder="Customer Email"
                value={appointment.customerEmail}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.customerEmail}
                helperText={errors.customerEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="tel"
                label="Customer Phone"
                name="customerPhone"
                placeholder="Customer Phone"
                value={appointment.customerPhone}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.customerPhone}
                helperText={errors.customerPhone}
              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ borderRadius: '3px' }}
              >
                Add Appointment
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default AddAppointment;
