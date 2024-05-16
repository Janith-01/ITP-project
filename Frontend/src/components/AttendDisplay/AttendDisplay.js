// AttendDisplay.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from "react-to-print";
import AttendD from '../AttendD/AttendD';
import EmpNav from '../EmpNav/EmpNav';
import './AttendDisplay.css';


const URL = 'http://localhost:8083/attend';

function AttendDisplay() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(URL);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchHandler();
  }, []);

  const ComponentsRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current, // Ensure ComponentsRef is correctly set
    documentTitle: "Attend Report",
    onAfterPrint: () => alert("Attend Report Successfully Downloaded !"),
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
    <div className='Attend-container'>
      <EmpNav />
      <br />
      <div className="search-container">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search Users Details"
        />
        <button onClick={handleSearch} className='AttendDownload'>Search</button>
      </div>
      <div ref={ComponentsRef}>
        <h1>Attendance Details</h1>
        {noResults ? (
          <p>No results found.</p>
        ) : (
          <table className="user-tableattend">
            <thead className="user-tableattend1">
              <tr>
                <th >ID</th>
                <th>Employee ID</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>Departure Time</th>
                <th className="no-print , user-tableattend ">Action</th>
              </tr>
            </thead>
            <tbody >
              {users.map((user) => (
                <AttendD key={user._id} user={user} />
              ))}
            </tbody>
          </table>
        )}
      </div>
      <br />
      <button onClick={handlePrint} className='AttendDownload'>Download Report</button>
    </div>
  );
}

export default AttendDisplay;
