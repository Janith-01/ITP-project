import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './LeaveRequest.css';

function Leaverequest() {
    const navigate = useNavigate(); // Import useNavigate hook

    const [user, setUser] = useState({
        name: "",
        Eid: "",
        lType: "",
        sdate: "",
        edate: "",
        reason: "",
        status: "Pending",
    });
    const [idError, setIdError] = useState(false);
    const [nameError, setNameError] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Regular expression to allow only letters, numbers, and spaces
        const regex = /^[a-zA-Z0-9\s]*$/;

        // Check for forbidden symbols for Employee ID
        if (name === 'Eid') {
            if (!regex.test(value)) {
                setIdError(true);
            } else {
                setIdError(false);
            }
        }

        // Check for forbidden symbols for Name
        if (name === 'name') {
            if (!regex.test(value)) {
                setNameError(true);
            } else {
                setNameError(false);
            }
        }

        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if any field is empty
        for (const key in user) {
            if (!user[key]) {
                alert("Please fill in all fields.");
                return;
            }
        }

        // Check if any input field has errors
        if (idError || nameError) {
            alert('Please correct the input errors.');
            return;
        }

        try {
            await axios.post("http://localhost:5000/leaverequest", user);
            alert("Add Success");
            navigate("/displayrequest"); // Navigate to /displayrequest route
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className='container22'>
            
            <h1>Leave History</h1>
            <form onSubmit={handleSubmit} className='form-leave'>
                <label className='Rh1'>Name</label><br />
                <input type='text' value={user.name} onChange={handleInputChange} name='name' required /><br />
                {nameError && <span className="error-message">Name can only contain letters, numbers, and spaces</span>}
                <br /><br />
                <label className='Rh1'>EmpId</label><br />
                <input type='text' value={user.Eid} onChange={handleInputChange} name='Eid' required /><br />
                {idError && <span className="error-message">Employee ID can only contain letters, numbers, and spaces</span>}
                <br /><br />
                <label className='Rh1'>Leave Type</label><br />
                <input type='text' value={user.lType} onChange={handleInputChange} name='lType' required /><br /><br />
                <label className='Rh1'>Start Date</label><br />
                <input type='date' value={user.sdate} onChange={handleInputChange} name='sdate' required /><br /><br />
                <label className='Rh1'>End Date</label><br />
                <input type='date' value={user.edate} onChange={handleInputChange} name='edate' required /><br /><br />
                <label className='Rh1'>Reason</label><br />
                <textarea value={user.reason} onChange={handleInputChange} name='reason' className='textarea'/><br /><br />
                <label className='Rh1'>Status</label><br />
                <input type='text' value={user.status} onChange={handleInputChange} name='status,Rh1' required /><br /><br />
                <button type="submit">Submit</button><br></br><br></br>
                <button onClick={() => navigate('/displayrequest')} className='lR'>Leave History</button> {/* Add onClick event handler */}
            </form>
        </div>
    );
}

export default Leaverequest;