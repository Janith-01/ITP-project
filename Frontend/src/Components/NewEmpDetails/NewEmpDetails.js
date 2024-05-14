import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewEmpUser from '../NewEmpUser/NewEmpUser';
import EmpNav from '../EmpNav/EmpNav';
import { useNavigate } from 'react-router-dom';
 // Import useNavigate
import './NewEmpDetails.css';

const URL = "http://localhost:5000/NewEmp";

function NewEmpDetails() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate(); // useNavigate hook

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(URL);
            setUsers(response.data.data); // Adjust according to the actual structure of your response
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
 
    const handleAddNewEmployee = () => {
        navigate('/NewEmp');
    };

    return (
        <div className='New-container'>
            <EmpNav />
            <br></br><br></br><br></br>
            <button onClick={handleAddNewEmployee} className='ANE'>Add New Employee</button>
            <h1>Employee Details</h1>
            <table className="user-tableattend">
                <thead className="user-tableNew">
                    <tr className='trNew'>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Gmail</th>
                        <th>Job Role</th>
                        <th>Employee Id</th>
                        <th >Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, i) => (
                        <NewEmpUser key={i} user={user} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default NewEmpDetails;
