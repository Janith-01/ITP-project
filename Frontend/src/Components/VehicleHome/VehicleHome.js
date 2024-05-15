import React from 'react'
import { Link } from 'react-router-dom'
import VehicleNav from "../VehicleNav/VehicleNav"
import '../VehicleHome/VehicleHome.css'


function VehicleHome() {
  return (
    
    <div className='containerHome'>
        <VehicleNav/>
        <h1><center>Vehicle Management Dashboard</center></h1>
        <br></br>
        <Link to="/addvehicle">
          <button className='buttonHome'>Add New Vehicle</button>
        </Link> 
        <br></br>
        <br></br>
        <Link to="/vehicledetails">
          <button className='buttonHome'>All Vehicle Details</button>
        </Link>
        <br></br>
        <br></br>
        <Link to="/addservicehistory">
          <button className='buttonHome'>Add Service History Details</button>
        </Link>
        <br></br>
        <br></br>
        <Link to="/servicehistorydetails">
          <button className='buttonHome'>All Service History Details</button>
        </Link>
    </div>
  )
}

export default VehicleHome
