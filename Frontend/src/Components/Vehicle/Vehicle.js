/*import React, { useState } from 'react';
//import React from 'react';
import '../Vehicle/Vehicle.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Vehicle({ vehicle }) {
  const { _id, vin, regNo, make, model, year, ownerName, ownerNic, ownerEmail, ownerAddress, contactNo } = vehicle;

  const history = useNavigate();

  const [isPrinting, setIsPrinting] = useState(false); // Define isPrinting state

  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:5000/vehicles/${_id}`)
      .then(() => history("/"))
      .then(() => history("/vehicledetails"));
  };

  return (
    <tr>
      <td>{_id}</td>
      <td>{vin}</td>
      <td>{regNo}</td>
      <td>{make}</td>
      <td>{model}</td>
      <td>{year}</td>
      <td>{ownerName}</td>
      <td>{ownerNic}</td>
      <td>{ownerEmail}</td>
      <td>{ownerAddress}</td>
      <td>{contactNo}</td>
      <td className={`acctionButtons no-print ${isPrinting ? 'hidden' : ''}`}>
        <Link to={`/vehicledetails/${_id}`}>Update</Link>
        <button onClick={deleteHandler}>Delete</button>
      </td>
    </tr>
  );
}

export default Vehicle;*/



import React from 'react';
import '../Vehicle/Vehicle.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Vehicle({ vehicle }) {
  const { _id, vin, regNo, make, model, year, ownerName, ownerNic, ownerEmail, ownerAddress, contactNo } = vehicle;

  const history = useNavigate();

  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:5000/vehicles/${_id}`)
      .then(() => history("/"))
      .then(() => history("/vehicledetails"));
  };

  return (
    <tr>
      <td>{_id}</td>
      <td>{vin}</td>
      <td>{regNo}</td>
      <td>{make}</td>
      <td>{model}</td>
      <td>{year}</td>
      <td>{ownerName}</td>
      <td>{ownerNic}</td>
      <td>{ownerEmail}</td>
      <td>{ownerAddress}</td>
      <td>{contactNo}</td>
      <td className={`acctionButtons no-print`}>
        <Link to={`/vehicledetails/${_id}`}>Update</Link>
        <button onClick={deleteHandler}>Delete</button>
      </td>
    </tr>
  );
}

export default Vehicle;


