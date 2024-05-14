import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import './SalaryAdd.css';

function SalaryAdd() {
    const history = useNavigate();
    const [user, setUser] = useState({
        EmpID: '',
        Month: '',
        Job_Role: '',
        Basic_Salary: 0,
        OT_Hours: 0,
        OT_Rate: 1000,
        OT_Total: 0,
        Bonus: 0,
        Total: 0,
    });
    const [idError, setIdError] = useState(false);
    const [basicSalaryError, setBasicSalaryError] = useState(false);
    const [otHoursError, setOtHoursError] = useState(false);
    const [otRateError, setOtRateError] = useState(false);
    const [bonusError, setBonusError] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const regex = /^[a-zA-Z0-9\s]*$/; // Regular expression to allow only letters, numbers, and spaces

        // Check for forbidden symbols for Employee ID
        if (name === 'EmpID') {
            if (!regex.test(value)) {
                setIdError(true);
            } else {
                setIdError(false);
            }
        }

        // Check for basic salary to be a number >= 0
        if (name === 'Basic_Salary') {
            if (isNaN(value) || Number(value) < 0) {
                setBasicSalaryError(true);
            } else {
                setBasicSalaryError(false);
            }
        }

        // Check for OT Hours to be a number >= 0
        if (name === 'OT_Hours') {
            if (isNaN(value) || Number(value) < 0) {
                setOtHoursError(true);
            } else {
                setOtHoursError(false);
            }
        }

        // Check for OT Rate to be a number >= 0
        if (name === 'OT_Rate') {
            if (isNaN(value) || Number(value) < 0) {
                setOtRateError(true);
            } else {
                setOtRateError(false);
            }
        }

        // Check for Bonus to be a number >= 0
        if (name === 'Bonus') {
            if (isNaN(value) || Number(value) < 0) {
                setBonusError(true);
            } else {
                setBonusError(false);
            }
        }

        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
            // Calculate OT_Total if OT_Hours and OT_Rate are provided
            OT_Total: name === 'OT_Hours' || name === 'OT_Rate' ? value * user.OT_Rate : user.OT_Total,
            // Calculate Total if Bonus is provided
            Total: name === 'Bonus' ? Number(value) + Number(user.OT_Total) + Number(user.Basic_Salary) : user.Total,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any of the fields are empty
        const isEmpty = Object.values(user).some(value => value === '');
        if (isEmpty) {
            alert('Please fill in all fields.');
            return;
        }

        // Check if any of the input fields have errors
        if (idError || basicSalaryError || otHoursError || otRateError || bonusError) {
            alert('Please correct the input errors.');
            return;
        }

        try {
            const response = await sendRequest();
            if (response && response.data) {
                console.log(response.data); // Check the response data
                alert("Salary Add Success");
                history("/SalaryADisplay");
            } else {
                throw new Error("Failed to add salary");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const sendRequest = async () => {
        try {
            const response = await axios.post("http://localhost:5000/salaryAdd", {
                EmpID: String(user.EmpID),
                Month: String(user.Month),
                Job_Role: String(user.Job_Role),
                Basic_Salary: Number(user.Basic_Salary),
                OT_Hours: Number(user.OT_Hours),
                OT_Rate: Number(user.OT_Rate),
                OT_Total: Number(user.OT_Total),
                Bonus: Number(user.Bonus),
                Total: Number(user.Total),
            });
            return response; // Return the response object
        } catch (error) {
            throw new Error(error.response.data.message || "An error occurred while adding salary");
        }
    };

    const [showOptions, setShowOptions] = useState(false);

    const handleJobRoleClick = () => {
        setShowOptions(!showOptions);
    };

    const handleJobRoleSelect = (role) => {
        setUser((prevUser) => ({
            ...prevUser,
            Job_Role: role,
        }));
        setShowOptions(false);
    };

    return (
        <div>
            <Link to="/SalaryADisplay">
                <button  className='view-button'>View Details</button>
            </Link>
            <div className="container16">
                <h1>Add Salary</h1>
                <form onSubmit={handleSubmit} className='form-Salary'>
                    <label>Employee ID</label>
                    <br />
                    <input type="text" value={user.EmpID} onChange={handleInputChange} name="EmpID" required></input>
                    {idError && <span className="error-message">Employee ID can only contain letters, numbers, and spaces</span>}
                    <br /><br />

                    <label>Month</label>
                    <br />
                    <input type="month" value={user.Month} onChange={handleInputChange} name="Month" required></input>
                    <br /><br />


                    <label onClick={handleJobRoleClick}>Job Role</label>
                    <br />
                    {showOptions && (
                        <div>
                            <input type="radio" value="Manager" onChange={() => handleJobRoleSelect("Manager")} name="Job_Role"></input>
                            <label>Manager</label>
                            <br />
                            <input type="radio" value="Mechanical Employee" onChange={() => handleJobRoleSelect("Mechanical Employee")} name="Job_Role"></input>
                            <label>Mechanical Employee</label>
                            <br />
                            <input type="radio" value="Ordinary Employee" onChange={() => handleJobRoleSelect("Ordinary Employee")} name="Job_Role"></input>
                            <label>Ordinary Employee</label>
                            <br /><br />
                        </div>
                    )}

                    <label>Basic Salary</label>
                    <br />
                    <input type="text" value={user.Basic_Salary} onChange={handleInputChange} name="Basic_Salary" required></input>
                    {basicSalaryError && <span className="error-message">Please enter a positive value for Basic Salary</span>}
                    <br /><br />

                    <label>OT Hours</label>
                    <br />
                    <input type="text" value={user.OT_Hours} onChange={handleInputChange} name="OT_Hours" required></input>
                    <br /><br />

                    <label>OT Rate</label>
                    <br />
                    <input type="text" value={user.OT_Rate} onChange={handleInputChange} name="OT_Rate" required></input>
                    <br /><br />

                    <label>OT Total</label>
                    <br />
                    <input type="text" value={user.OT_Total} onChange={handleInputChange} name="OT_Total" required></input>
                    <br /><br />

                    <label>Bonus</label>
                    <br />
                    <input type="text" value={user.Bonus} onChange={handleInputChange} name="Bonus" required></input>
                    <br /><br />

                    <label>Total</label>
                    <br />
                    <input type="text" value={user.Total} onChange={handleInputChange} name="Total" required></input>
                    <br /><br />

                    <button type="submit">Submit</button>
                </form>
        </div>
        </div>
    );
}

export default SalaryAdd;
