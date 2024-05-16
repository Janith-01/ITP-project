import React, { useEffect, useState, useRef } from 'react';
import EmpNav from "../EmpNav/EmpNav";
import axios from "axios";
import Request from "../Request/Request";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './lRequestdisplay.css'; 

const URL = "http://localhost:8083/leaverequest";

const LRequestDisplay = () => {
  const navigate = useNavigate(); // Get access to the navigate function

  const [leaveRequests, setLeaveRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLeaveRequests, setFilteredLeaveRequests] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(URL);
        setLeaveRequests(response.data); // Set the whole response data
        setFilteredLeaveRequests(response.data); // Initialize filtered leave requests
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchHandler();
  }, []);

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Leave Report",
    onAfterPrint: () => alert("Leave Report Successfully Downloaded"),
  });

  const handleSearch = () => {
    const filteredRequests = leaveRequests.filter(request =>
      Object.values(request).some(value =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredLeaveRequests(filteredRequests);
    setNoResults(filteredRequests.length === 0);
  };

  // Function to handle navigation to the /leaverequest page
  const handleAddNewLeave = () => {
    navigate('/leaverequest'); // Navigate to /leaverequest route
  };

  return (
    <div className='container21 '>
      <EmpNav />
      <h1>Leave History</h1>
      <button onClick={handleAddNewLeave} className='ADL'>Add New Leave</button>
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="search"
        placeholder="Search Leave Details"
        className='S2'
      />
      <button onClick={handleSearch} className='LSearch'>Search</button>

      {noResults ? (
        <div>
          <p>No leave requests found.</p>
        </div>
      ) : (
        <div>
          <table className="user-table">
            <thead >
              <tr>
                <th>ID</th>
                <th>Employee Name</th>
                <th>Employee ID</th>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th className="no-print , user-table">Action</th>
              </tr>
            </thead>
            <tbody ref={ComponentsRef} className="user-table2">
              {filteredLeaveRequests.map((leaveRequest, i) => (
                <tr key={i}>
                  <Request leaveRequest={leaveRequest} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <br /><br />
      <button onClick={handlePrint} className="no-print , D1 ">Download Report</button>
    </div>
  );
};

export default LRequestDisplay;