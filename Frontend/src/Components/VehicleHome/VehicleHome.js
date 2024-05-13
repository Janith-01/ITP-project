import React from 'react'
import { Link } from 'react-router-dom'
import Nav from "../Nav/Nav"

function VehicleHome() {
  return (
    <div className='containerHome'>
        <Nav/>
        <h1><center>Vehicle Management Dashboard</center></h1>
        <Link to="/addvehicle">
          <button className='buttonHome'>Add New Vehicle</button>
        </Link> 
        <Link to="/vehicledetails">
          <button className='buttonHome'>All Vehicle Details</button>
        </Link>
        <Link to="/addservicehistory">
          <button className='buttonHome'>Add Service History Details</button>
        </Link>
        <Link to="/servicehistorydetails">
          <button className='buttonHome'>All Service History Details</button>
        </Link>
    </div>
  )
}

export default VehicleHome
