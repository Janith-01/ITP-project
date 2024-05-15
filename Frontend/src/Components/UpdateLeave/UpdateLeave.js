import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateLeave.css';

function UpdateLeave() {
    const [inputs, setInputs] = useState({});
    const [idError, setIdError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const history = useNavigate();
    const { _id } = useParams();

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:8083/leaverequest/${_id}`);
                setInputs(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchHandler();
    }, [_id]);

    const sendRequest = async () => {
        try {
            await axios.put(`http://localhost:8083/leaverequest/${_id}`, inputs);
            alert("Request updated successfully");
        } catch (error) {
            console.error('Error updating leave request:', error);
        }
    };

    const handleChange = (e) => {
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

        setInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if any input field has errors
        if (idError || nameError) {
            alert('Please correct the input errors.');
            return;
        }

        await sendRequest();
        history("/displayrequest");
    };

    return (
        <div className="container25">
            <h1>Update Leave</h1>
            <form onSubmit={handleSubmit} className='form-leaveUpdate'>
                <label>Name</label><br />
                <input type='text' value={inputs.name} onChange={handleChange} name='name' required /><br />
                {nameError && <span className="error-message">Name can only contain letters, numbers, and spaces</span>}
                <br /><br />
                <label>EmpId</label><br />
                <input type='text' value={inputs.Eid} onChange={handleChange} name='Eid' required /><br />
                {idError && <span className="error-message">Employee ID can only contain letters, numbers, and spaces</span>}
                <br /><br />
                <label>Leave Type</label><br />
                <input type='text' value={inputs.lType} onChange={handleChange} name='lType' required /><br /><br />
                <label>Start Date</label><br />
                <input type='date' value={inputs.sdate} onChange={handleChange} name='sdate' required /><br /><br />
                <label>End Date</label><br />
                <input type='date' value={inputs.edate} onChange={handleChange} name='edate' required /><br /><br />
                <label>Reason</label><br />
                <textarea value={inputs.reason} onChange={handleChange} name='reason' /><br /><br />
                <label>Status</label><br />
                <input type='text' value={inputs.status} onChange={handleChange} name='status' required /><br /><br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default UpdateLeave;