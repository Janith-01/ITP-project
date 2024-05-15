import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NewEmp.css'


function NewEmp() {
    const history = useNavigate();
    const [user, setUser] = useState({
        name: "",
        gmail: "",
        jobRole: "",
        Eid: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await sendRequest();
            alert("Register Success");
            history("/NewEmpDetails");
        } catch (err) {
            alert(err.message);
        }
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:8083/NewEmp", {
            name: String(user.name),
            gmail: String(user.gmail),
            jobRole: String(user.jobRole),
            Eid: String(user.Eid),
        });
    };

    const handleViewDetails = () => {
        history("/NewEmpDetails");
    };

    return (
        <div className='container16'>
            <h1>Employee Details</h1>
            <button onClick={handleViewDetails}>View Details</button>
            <form onSubmit={handleSubmit} className='form-Salary1'>
            <label>Name</label><br />
                <input type='text' value={user.name} onChange={handleInputChange} name='name' required /><br />
                <label>E-mail</label><br />
                <input type='mail' value={user.gmail} onChange={handleInputChange} name='gmail' required /><br />
                <label>Job Role</label><br />
                <div>
                    <input type='radio' value='Employee Manager' onChange={handleInputChange} name='jobRole' required />
                    <label>Employee Manager</label><br />
                    <input type='radio' value='Financial Manager' onChange={handleInputChange} name='jobRole' required />
                    <label>Financial Manager</label><br />
                    <input type='radio' value='Senior Manager' onChange={handleInputChange} name='jobRole' required />
                    <label>Senior Manager</label><br />
                    <input type='radio' value='Inventory Manager' onChange={handleInputChange} name='jobRole' required />
                    <label>Inventory Manager</label><br />
                    <input type='radio' value='Vehicle Manager' onChange={handleInputChange} name='jobRole' required />
                    <label>Vehicle Manager</label><br />
                    <input type='radio' value='Customer Manager' onChange={handleInputChange} name='jobRole' required />
                    <label>Customer Manager</label><br />
                    <input type='radio' value='Supplier Manager' onChange={handleInputChange} name='jobRole' required />
                    <label>Supplier Manager</label><br />
                    <input type='radio' value='General Manager' onChange={handleInputChange} name='jobRole' required />
                    <label>General Employee</label><br />
                </div>
                <label>Employee ID</label><br />
                <input type='text' value={user.Eid} onChange={handleInputChange} name='Eid' required /><br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default NewEmp;
