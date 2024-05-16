// Import necessary libraries and styles
import React from 'react';
import axios from "axios";
import './AttendD.css';

// AttendD component responsible for rendering individual attendance records
function AttendD({ user }) {
  // Destructure user object to extract relevant data
  const { _id, Eid, Date, Stime, Etime } = user;

  // Function to handle deletion of attendance record
  const deleteHandler = async () => {
    try {
      // Send DELETE request to the server to delete the attendance record
      await axios.delete(`http://localhost:8083/attend/${_id}`);
      // Reload the page after successful deletion
      window.location.reload();
    } catch (error) {
      console.error('Error deleting attendance record:', error);
    }
  }

  // Render each attendance record as a table row
  return (
    <tr className="container30">
      {/* Display attendance record details */}
      <td>{_id}</td>
      <td>{Eid}</td>
      <td>{Date}</td>
      <td>{Stime}</td>
      <td>{Etime}</td>
      <td>
        {/* Button to trigger the deleteHandler function */}
        <div className="action-buttons1, no-print">
          <button onClick={deleteHandler}>Delete</button>
        </div>
      </td>
    </tr>
  );
}

// Export the AttendD component
export default AttendD;

