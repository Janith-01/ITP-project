// EmployeeDisplay.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeUser from '../EmployeeUser/EmployeeUser';

const URL = "http://localhost:5000/Employeeadd";

function EmployeeDisplay() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(URL);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchHandler();
  }, []);

  return (
    <div>
      <h1>Employee Details</h1>
      {users.map((user, i) => (
        <EmployeeUser key={i} user={user} />
      ))}
    </div>
  );
}

export default EmployeeDisplay;
