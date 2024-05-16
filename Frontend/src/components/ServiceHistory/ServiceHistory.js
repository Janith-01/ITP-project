import React from 'react';
import '../ServiceHistory/ServiceHistory.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ServiceHistory({ servicehistory }) {
  const { _id, vin, type, date, description, parts, cost, macanic } = servicehistory;

  const history = useNavigate();

  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:8083/serviceshistory/${_id}`)
      .then(() => history("/"))
      .then(() => history("/servicehistorydetails"));
  };

  return (
    <tr>
      <td>{_id}</td>
      <td>{vin}</td>
      <td>{type}</td>
      <td>{date}</td>
      <td>{description}</td>
      <td>{parts}</td>
      <td>{cost}</td>
      <td>{macanic}</td>
      <td className='acctionButtons'>
        <Link to={`/servicehistorydetails/${_id}`}>Update</Link>
        <button onClick={deleteHandler}>Delete</button>
      </td>
    </tr>
  );
}

export default ServiceHistory;


