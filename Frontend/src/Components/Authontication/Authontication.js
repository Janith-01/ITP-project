import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Authontication.css';

function Authentication() {
  const [formData, setFormData] = useState({
    email: '',
    managerId: '', // This corresponds to the Eid of the Employee Manager
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8083/authenticate', formData);
      if (response.data.authenticated) {
        if (response.data.navigateToManagerView) {
          navigate('/managerView');
        } else {
          alert('You are not authorized to view the Manager View Page.');
        }
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error authenticating user:', error);
      alert('An error occurred while authenticating. Please try again.');
    }
  };

  return (
    <div className='Auth-container'>
      <h1>Authentication</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label><br />
        <input type="email" autoComplete='off' name="email" value={formData.email} onChange={handleInputChange} required /><br />
        <label>Employee Manager ID</label><br />
        <input type="text" autoComplete='off' name="managerId" value={formData.managerId} onChange={handleInputChange} required /><br />
        <button type="submit">Authenticate</button>
      </form>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default Authentication;