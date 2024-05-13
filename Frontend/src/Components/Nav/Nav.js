import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Nav.css';
import logo from '../../images/pic12.png'; // Import the image

function Nav() {
  // Get the current location
  const location = useLocation();

  // Check if the current path is one of the specified pages
  const isSpecialPage = ['/applyleave', '/sendPdf', '/attend'].includes(location.pathname);

  return (
    <div>
      <ul className="home-ul2">
        <li className="home-li2">
          <Link to="/mainhome" className="active home-a2">
            <h1 >Home</h1>
          </Link>
        </li>
        <li className="home-li2">
          {/* Conditionally render the link based on the current page */}
          {isSpecialPage ? (
            <Link to="/Autho" className="active home-a2">
              <h1 >Manager_View</h1>
            </Link>
          ) : (
            <Link to="/managerView" className="active home-a2">
              <h1 >Manager_View</h1>
            </Link>
          )}
        </li>
        <li className="home-li2">
          <Link to="/sendPdf" className="active home-a2">
            <h1 >Monthly Pdf</h1>
          </Link>
        </li>
        <div className="logo-container">
          <h1 className='Nav2h1'>Tusker Ceylon Holding (PVT)_LTD</h1>
          <img src={logo} alt="Logo" className='img1' /> {/* Image element */}
        </div>
      </ul>
    </div>
  );
}

export default Nav;