// AttendD.js
import React from 'react';
import axios from "axios";
import './AttendD.css';


function AttendD({ user }) {
  const { _id, Eid, Date, Stime, Etime } = user;

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:5000/attend/${_id}`);
      window.location.reload(); // Reload the page after deletion
    } catch (error) {
      console.error('Error deleting attendance record:', error);
    }
  }

  return (
    <tr className="container30">
      <td>{_id}</td>
      <td>{Eid}</td>
      <td>{Date}</td>
      <td>{Stime}</td>
      <td>{Etime}</td>
      <td>
        <div className="action-buttons1 , no-print">
        <button onClick={deleteHandler} >Delete</button>
        </div>
      </td>
    </tr>
  );
}

export default AttendD;
