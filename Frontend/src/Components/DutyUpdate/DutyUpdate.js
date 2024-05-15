import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './DutyUpdate.css';

function DutyUpdate() {
    const [inputs, setInputs] = useState({});
    const [idError, setIdError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const history = useNavigate();
    const { _id } = useParams();

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:8083/schedule/${_id}`);
                setInputs(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchHandler();
    }, [_id]);

    const sendRequest = async () => {
        try {
            await axios.put(`http://localhost:8083/schedule/${_id}`, inputs);
            alert("Request updated successfully");
        } catch (error) {
            console.error('Error updating leave request:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const regex = /^[a-zA-Z0-9\s]*$/; // Regular expression to allow only letters, numbers, and spaces

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

        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputs.duration <= 0) {
            alert("Duration must be greater than 0.");
            return;
        }
        if (!inputs.Eid || !inputs.name || !inputs.Month || !inputs.week || !inputs.duration || !inputs.reason) {
            alert("Please fill in all fields.");
            return;
          }
      
        if (idError || nameError) {
            alert("Employee ID and name can only contain letters, numbers, and spaces.");
            return;
        }

        await sendRequest();
        history("/dutyScheduleD");
    };

    return (
        <div className="container8">
            <br /><br /><br /><br /><br />
            <h1>Update Duty Schedule</h1><br />
            <form onSubmit={handleSubmit} className=".form-dutyupdate">
                <label>Employee ID </label>
                <input type='text' value={inputs.Eid || ''} onChange={handleChange} name='Eid' required />
                {idError && <span className="error-message">Employee ID can only contain letters, numbers, and spaces</span>}
                <br /><br />
                <label>Employee Name </label>
                <input type='text' value={inputs.name || ''} onChange={handleChange} name='name' required />
                {nameError && <span className="error-message">Name can only contain letters, numbers, and spaces</span>}
                <br /><br />
                <label>Month </label>
                <input type='month' value={inputs.Month || ''} onChange={handleChange} name='Month' required /><br /><br />
                <label>Week </label>
                <input type='week' value={inputs.week || ''} onChange={handleChange} name='week' required /><br /><br />
                <label>Duration (in days) </label>
                <input type='number' value={inputs.duration || ''} onChange={handleChange} name='duration' required /><br /><br />
                <label>Special Task</label><br /><br />
                <textarea value={inputs.reason || ''} onChange={handleChange} name='reason' /><br /><br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default DutyUpdate;
