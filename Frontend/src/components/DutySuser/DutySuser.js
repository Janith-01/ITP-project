import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './DutySuser.css'; // Import the CSS file for DutySuser

function DutySuser(props) {
  const { _id, Eid, name, Month, week, duration, reason } = props.user;
  const history = useNavigate();

  const deleteHandler = async () => {
    await axios.delete(`http://localhost:8083/schedule/${_id}`)
      .then(res => res.data)
      .then(() => history("/"))
      .then(() => history("/dutyScheduleD"));
  }

  return (
    <tr className="duty-schedule-row">
      <td>{_id}</td>
      <td>{Eid}</td>
      <td>{name}</td>
      <td>{Month}</td>
      <td>{week}</td>
      <td>{duration}</td>
      <td>{reason}</td>
      <td>
        <div className="action-buttons">
          <Link to={`/dutyScheduleD/${_id}`} className="no-print , updatebutton">Update</Link>
          <button onClick={deleteHandler} className="no-print , deletebutton">Delete</button>
        </div>
      </td>
    </tr>
  );
}

export default DutySuser;

