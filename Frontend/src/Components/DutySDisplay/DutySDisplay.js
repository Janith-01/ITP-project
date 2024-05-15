import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import DutySuser from '../DutySuser/DutySuser';
import EmpNav from "../EmpNav/EmpNav";
import { useReactToPrint } from "react-to-print";
import './DutySDisplay.css'; // Import the CSS file

const URL = "http://localhost:8083/schedule";

function DutySDisplay() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Initialize navigate
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(URL);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchHandler();
  }, []); // Empty dependency array to ensure it only runs once

  const handleAddNewTask = () => {
    navigate('/dutySchedule'); // Navigate to DutySchedule component
  };

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Duty Schedule Report",
    onafterprint: () => alert("Duty Schedule Report Successfully Download"),
  });

  const handleSearch = async () => {
    try {
      const response = await axios.get(URL);
      const filteredUsers = response.data.filter((user) =>
        Object.values(user).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setUsers(filteredUsers);
      setNoResults(filteredUsers.length === 0);
    } catch (error) {
      console.error('Error searching:', error);
    }
  }

  return (
    <div className="container18">
      <EmpNav />
      <div ref={ComponentsRef}>
        <h1> Duty Schedule Display</h1>
        <div className="search-container1">
          <input 
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"  
            placeholder="Search Details"
            className='no-print'
            
          />
          <button onClick={handleSearch} className="no-print , DSB" >Search</button><br/>
          
        </div>
        <button onClick={handleAddNewTask} className="no-print  , ADD-New-task ">ADD New task</button><br/><br/><br/>

        {noResults ? (
          <div>
            <p>No Duty Schedule Found</p>
          </div>
        ) : (
          <table className="user-table">
            <thead className="user-table1">
              <tr >
                <th>ID</th>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Month</th>
                <th>Week</th>
                <th>Duration</th>
                <th>Special Task</th>
                <th className="no-print , user-table ">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, i) => (
                  <DutySuser key={i} user={user} />
                ))
              ) : (
                <tr>
                  <td colSpan="8">No duty schedule available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      <br/>
      <button onClick={handlePrint} className="download-button1">Download</button>
    </div>
  );
}

export default DutySDisplay;
