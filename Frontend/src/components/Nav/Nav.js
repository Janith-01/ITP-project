import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div style={{ backgroundColor: '#333', padding: '10px 0', width: '100%' }}>
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
        <li style={{ display: 'inline', marginRight: '20px' }}>
          <Link to="/addapp" style={{ textDecoration: 'none', color: '#fff', fontSize: '20px' }}>Schedule Appointments</Link>
        </li>
        <li style={{ display: 'inline', marginRight: '20px' }}>
          <Link to="/addapp?reschedule=true" style={{ textDecoration: 'none', color: '#fff', fontSize: '20px' }}>Reschedule Appointments</Link>
        </li>
        {/* Add more navigation links as needed */}
      </ul>
    </div>
  );
}

export default Nav;
