// Import necessary libraries and styles
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from "react-to-print"; // Importing useReactToPrint hook for printing functionality
import AttendD from '../AttendD/AttendD'; // Importing the AttendD component to display individual attendance records
import EmpNav from '../EmpNav/EmpNav'; // Importing the EmpNav component for employee navigation
import './AttendDisplay.css'; // Importing styles for AttendDisplay component

// Endpoint URL for fetching attendance data
const URL = 'http://localhost:8083/attend';

// AttendDisplay component responsible for displaying attendance data
function AttendDisplay() {
  // State variables
  const [users, setUsers] = useState([]); // State to store attendance data
  const [searchQuery, setSearchQuery] = useState(''); // State to store search query
  const [noResults, setNoResults] = useState(false); // State to track if no search results found

  // Effect hook to fetch attendance data from the server on component mount
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(URL);
        setUsers(response.data); // Set the fetched attendance data in the state
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchHandler(); // Call the fetchHandler function
  }, []);

  // Ref for printing component
  const ComponentsRef = useRef();

  // Hook to handle printing functionality
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current, // Ensure ComponentsRef is correctly set
    documentTitle: "Attend Report", // Set the document title for the printed report
    onAfterPrint: () => alert("Attend Report Successfully Downloaded !"), // Alert after printing is done
  });

  // Function to handle search
  const handleSearch = async () => {
    try {
      const response = await axios.get(URL);
      // Filter users based on search query
      const filteredUsers = response.data.filter((user) =>
        Object.values(user).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setUsers(filteredUsers); // Set the filtered users in the state
      setNoResults(filteredUsers.length === 0); // Set noResults state based on search result
    } catch (error) {
      console.error('Error searching:', error);
    }
  }

  // Render AttendDisplay component
  return (
    <div className='Attend-container'>
      <EmpNav /> {/* Render EmpNav component for employee navigation */}
      <br />
      {/* Search bar for filtering users */}
      <div className="search-container">
        <input
          onChange={(e) => setSearchQuery(e.target.value)} // Handle search query change
          type="text"
          name="search"
          placeholder="Search Users Details"
        />
        <button onClick={handleSearch} className='AttendDownload'>Search</button> {/* Button to trigger search */}
      </div>
      <div ref={ComponentsRef}> {/* Ref for printing */}
        <h1>Attendance Details</h1>
        {/* Conditional rendering based on search results */}
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
              {/* Map through users array and render AttendD component for each user */}
              {users.map((user) => (
                <AttendD key={user._id} user={user} />
              ))}
            </tbody>
          </table>
        )}
      </div>
      <br />
      {/* Button to trigger printing */}
      <button onClick={handlePrint} className='AttendDownload'>Download Report</button>
    </div>
  );
}

// Export the AttendDisplay component
export default AttendDisplay;
