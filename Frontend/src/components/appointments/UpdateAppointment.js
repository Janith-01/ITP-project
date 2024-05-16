import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UpdateAppointment() {
  const [appointment, setAppointment] = useState({ date: '', time: '', description: '' });
  const { id } = useParams();

  const fetchAppointmentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8083/users/${id}`);
      setAppointment(response.data.appointment);
    } catch (error) {
      console.error('Error fetching appointment details:', error);
    }
  };

  useEffect(() => {
    // Call fetchAppointmentDetails when id changes or component mounts
    fetchAppointmentDetails();
  }, [id]); // Include id as a dependency here

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8083/users/${id}`, appointment);
      // Optionally, add a message to indicate successful update
      alert('Appointment updated successfully!');
    } catch (error) {
      console.error('Error updating appointment:', error);
      // Optionally, handle error display or logging
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Update Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="date"
          value={appointment.date}
          onChange={handleChange}
          required
          style={{ marginBottom: '10px', padding: '8px', fontSize: '16px', width: '100%' }}
        />
        <input
          type="time"
          name="time"
          value={appointment.time}
          onChange={handleChange}
          required
          style={{ marginBottom: '10px', padding: '8px', fontSize: '16px', width: '100%' }}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={appointment.description}
          onChange={handleChange}
          required
          style={{ marginBottom: '20px', padding: '8px', fontSize: '16px', width: '100%' }}
        />
        <button
          type="submit"
          style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '3px', border: 'none', cursor: 'pointer' }}
        >
          Update Appointment
        </button>
      </form>
    </div>
  );
}

export default UpdateAppointment;
