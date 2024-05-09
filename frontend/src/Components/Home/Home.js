import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import './Home.css'; // Import the CSS file

function Home() {
  return (
    <div className="back">
      <Nav />
      <h1>Welcome to the Appointment Scheduling System</h1>
      <p>
        Schedule and manage your appointments efficiently with our easy-to-use platform.
        Whether you're a client looking to book appointments or a staff member managing schedules,
        we've got you covered.
      </p>
      <h2>Key Features:</h2>
      <ul>
        <li>Book appointments online with ease.</li>
        <li>View and manage your upcoming appointments.</li>
        <li>Reschedule or cancel appointments as needed.</li>
        <li>Receive automated reminders and notifications.</li>
        <li>Access your appointment history.</li>
        <li>Secure and reliable platform for all your scheduling needs.</li>
      </ul>
      <div className="button-container">
        <Link to="/addapp" className="schedule-button">
          Schedule Appointment
        </Link>
        <Link to="/addapp?reschedule=true" className="reschedule-button">
          Reschedule Appointment
        </Link>
        <li style={{ display: 'inline', marginRight: '20px' }}>
          <Link to="/addapp" style={{ textDecoration: 'none', color: '#fff', fontSize: '20px' }}>Schedule Appointments</Link>
        </li>
        <li style={{ display: 'inline', marginRight: '20px' }}>
          <Link to="/addapp?reschedule=true" style={{ textDecoration: 'none', color: '#fff', fontSize: '20px' }}>Reschedule Appointments</Link>
        </li>
      </div>
    </div>
  );
}

export default Home;
