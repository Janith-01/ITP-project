import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SalaryUpdate.css'; // Import the CSS file

function SalaryUpdate() {
    const [inputs, setInputs] = useState({
        EmpID: null,
        Month: null,
        Job_Role: null,
        Basic_Salary: null,
        OT_Hours: null,
        OT_Rate: null,
        OT_Total: null,
        Bonus: null,
        Total: null,
    });  
    const history = useNavigate(); // Issue might be here
    const { _id } = useParams();

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/salaryAdd/${_id}`);
                setInputs(response.data.data); // Set inputs with response data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchHandler();
    }, [_id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Regular expression to allow only letters, numbers, and spaces for Employee ID
        const idRegex = /^[a-zA-Z0-9\s]*$/;

        // Check for forbidden symbols for Employee ID
        if (name === 'EmpID' && !idRegex.test(value)) {
            alert('Employee ID can only contain letters, numbers, and spaces');
            return;
        }

        let updatedInputs = { ...inputs, [name]: value };

        // Check for positive numbers for Basic Salary, OT Hours, OT Rate, and Bonus
        if (name === 'Basic_Salary' || name === 'OT_Hours' || name === 'OT_Rate' || name === 'Bonus') {
            if (isNaN(value) || Number(value) < 0) {
                alert(`${name} must be a positive number or zero`);
                return;
            }
        }

        // Calculate OT_Total if OT_Hours and OT_Rate are provided
        if (name === 'OT_Hours' || name === 'OT_Rate') {
            updatedInputs = {
                ...updatedInputs,
                OT_Total: Number(updatedInputs.OT_Hours) * Number(updatedInputs.OT_Rate),
            };
        }

        // Calculate Total if Bonus is provided
        if (name === 'Bonus') {
            updatedInputs = {
                ...updatedInputs,
                Total: Number(updatedInputs.OT_Total) + Number(value) + Number(updatedInputs.Basic_Salary),
            };
        }

        setInputs(updatedInputs);
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/salaryAdd/${_id}`, {
                EmpID: String(inputs.EmpID),
                Month: String(inputs.Month),
                Job_Role: String(inputs.Job_Role),
                Basic_Salary: Number(inputs.Basic_Salary),
                OT_Hours: Number(inputs.OT_Hours),
                OT_Rate: Number(inputs.OT_Rate),
                OT_Total: Number(inputs.OT_Total),
                Bonus: Number(inputs.Bonus),
                Total: Number(inputs.Total),
            });
            alert("Salary Update Success");
            history("/SalaryADisplay"); // Navigate to the display page after successful update
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="container25">
            <h1>Update Details</h1>
            <form onSubmit={handleSubmit} className='form-SalaryUpdate'>
            <label>Employee ID</label>
                <br />
                <input type="text" value={inputs?.EmpID ?? ''} onChange={handleInputChange} name="EmpID" required></input>
                <br></br>
                <br></br>

                <label>Month</label>
                <br />
                <input type="month" value={inputs?.Month ?? ''} onChange={handleInputChange} name="Month" required></input>
                <br></br>
                <br></br>

                <label>Job Role</label>
                <br />
                <input type="text" value={inputs?.Job_Role ?? ''} onChange={handleInputChange} name="Job_Role" required></input>
                <br></br>
                <br></br>

                <label>Basic Salary</label>
                <br />
                <input type="text" value={inputs?.Basic_Salary ?? ''} onChange={handleInputChange} name="Basic_Salary" required></input>
                <br></br>
                <br></br>

                <label>OT Hours</label>
                <br />
                <input type="text" value={inputs?.OT_Hours ?? ''} onChange={handleInputChange} name="OT_Hours" required></input>
                <br></br>
                <br></br>

                <label>OT Rate</label>
                <br />
                <input type="text" value={inputs?.OT_Rate ?? ''} onChange={handleInputChange} name="OT_Rate" required></input>
                <br></br>
                <br></br>

                <label>OT Total</label>
                <br />
                <input type="text" value={inputs?.OT_Total ?? ''} onChange={handleInputChange} name="OT_Total" required></input>
                <br></br>
                <br></br>

                <label>Bonus</label>
                <br />
                <input type="text" value={inputs?.Bonus ?? ''} onChange={handleInputChange} name="Bonus" required></input>
                <br></br>
                <br></br>

                <label>Total</label>
                <br />
                <input type="text" value={inputs?.Total ?? ''} onChange={handleInputChange} name="Total" required></input>
                <br></br>
                <br></br>
                <button>Submit</button>
            </form>
        </div>
    );
}

export default SalaryUpdate;

