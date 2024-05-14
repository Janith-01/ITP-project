import React from "react";
import './VehicleNav.css';
import { Link } from "react-router-dom";

function VehicleNav() {
  return (
    <div className="nav">
      <ul className="home-ul">
        <li className="home-ll">
            <Link to="/mainhome" className="active home-a">
            <h2>Dashboard</h2>
            </Link>
        </li>
        {/* <li className="home-ll">
            <Link to="/addvehicle" className="active home-a">
            <h2>Add Vehicle</h2>
            </Link>
        </li>
        <li className="home-ll">
            <Link to="/vehicledetails" className="active home-a">
            <h2>Vehicle Details</h2>
            </Link>
        </li>
        <li className="home-ll">
            <Link to="/addservicehistory" className="active home-a">
            <h2>Add Service History</h2>
            </Link>
        </li>
        <li className="home-ll">
            <Link to="/servicehistorydetails" className="active home-a">
            <h2>Service History Details</h2>
            </Link>
        </li>
        <li className="home-ll">
            <Link to="/costbymonth" className="active home-a">
            <h2>Service Costs By Month</h2>
            </Link>
        </li> */}
        
      </ul>
    </div>
  )
}

export default VehicleNav
