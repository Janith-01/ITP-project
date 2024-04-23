import React from 'react'
import { Link } from 'react-router-dom'
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="navigation">
          <div className="name">Tusker Ceylon Holdings (PVT) Ltd</div>
        <nav className="nav">
          <ul>
            <li>
              <a href="/reportinsident" className="btn">
                Report Incident
              </a>
            </li>
  
            <li>
              <a href="/viewreportinsident" className="btn">
                View Reported Incidents
              </a>
            </li>
            <li>
              <a href="/viewinsidents" className="btn">
                View Created Incidents
              </a>
            </li>
          </ul>
        </nav>
       
      </div>
      <div className="text"></div>
    </div>
  );
};

export default Header