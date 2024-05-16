import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:8083/users/");
      console.log("Response data:", response.data); // Log response data
      setAppointments(response.data.appointments || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      // Handle error here (e.g., display an error message to the user)
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8083/users/${id}`);
      // If deletion is successful, fetch appointments again to update the list
      fetchAppointments();
      console.log(`Deleted appointment with ID: ${id}`);
    } catch (error) {
      console.error(`Error deleting appointment with ID ${id}:`, error);
    }
  };

  const generateReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Appointments Report", 20, 20);

    const filteredAppointments = appointments.filter(appointment =>
      appointment.date.includes(searchQuery) ||
      appointment.time.includes(searchQuery) ||
      appointment.description.includes(searchQuery)
    ).map(appointment => {
      // Extract date part without time (T00:00:00.000Z)
      const formattedDate = new Date(appointment.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });

      // Return updated appointment object with formatted date
      return {
        ...appointment,
        date: formattedDate
      };
    });

    filteredAppointments.forEach((appointment, index) => {
      const y = 40 + index * 20;
      doc.setFontSize(12);
      doc.text(`Date: ${appointment.date}`, 20, y);
      doc.text(`Time: ${appointment.time}`, 70, y);
      doc.text(`Description: ${appointment.description}`, 120, y);
    });

    doc.save("appointments_report.pdf");
  };

  // Filter appointments based on searchQuery
  const filteredAppointments = appointments.filter(appointment =>
    appointment.date.includes(searchQuery) ||
    appointment.time.includes(searchQuery) ||
    appointment.description.includes(searchQuery)
  );

  return (
    <div className="back" style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Appointments</h2>
      <div style={{ marginBottom: '20px' }} className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '8px', fontSize: '16px', width: '100%' }}
        />
      </div>
      <button onClick={generateReport} style={{ marginBottom: '20px', padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Generate Report
      </button>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>Date</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>Time</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>Description</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment) => (
            <tr key={appointment._id}>
              <td style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>{new Date(appointment.date).toLocaleDateString('en-US')}</td>
              <td style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>{appointment.time}</td>
              <td style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>{appointment.description}</td>
              <td style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                <Link to={`/update-appointment/${appointment._id}`} style={{ marginRight: '10px' }}>
                  <button style={{ padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Update</button>
                </Link>
                <button onClick={() => handleDelete(appointment._id)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Appointments;
