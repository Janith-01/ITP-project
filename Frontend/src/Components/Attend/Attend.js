import React, { useState } from 'react';
import EmpNav from "../EmpNav/EmpNav";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './Attend.css';


function Attend() {
  const history = useNavigate();
  const [user, setUser] = useState({
    Eid: "",
    Date: "",
    Stime: "",
    Etime: "",
  });
  const [idError, setIdError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));

    // If Employee ID is changed, fill the current date and time
    if (name === 'Eid') {
      const { Date, Stime, Etime } = getCurrentDateTime();
      setUser((prevUser) => ({ ...prevUser, Date, Stime, Etime }));
    }

    // Regular expression to allow only letters, numbers, and spaces
    const regex = /^[a-zA-Z0-9\s]*$/;

    // Check for forbidden symbols for Employee ID
    if (name === 'Eid') {
      if (!regex.test(value)) {
        setIdError(true);
      } else {
        setIdError(false); 
      }
    }
  };

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;
    const year = String(currentDate.getFullYear());
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const currentDateFormatted = `${year}-${month}-${day}`;
    return { Date: currentDateFormatted, Stime: currentTime, Etime: currentTime };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (idError) {
      alert("Employee ID can only contain letters, numbers, and spaces.");
      return;
    }

    sendRequest().then(() => {
      alert("Attend Mark Success");
      history("/attend ");
    }).catch((err) => {
      alert(err.message);
    });
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/attend", {
      Eid: String(user.Eid),
      Date: String(user.Date),
      Stime: String(user.Stime),
      Etime: String(user.Etime),
    })
      .then((res) => res.data);
  };

  return (
    <div className="container5">
      <EmpNav />
      <h1>Attend Marking</h1>
      <form onSubmit={handleSubmit} className='form-Attend'>
        <label>Employee ID </label>
        <input type='text' value={user.Eid} onChange={handleInputChange} name='Eid' required></input><br /><br />
        {idError && <span className="error-message">Employee ID can only contain letters, numbers, and spaces.</span>}
        <label>Date </label>
        <input type='date' value={user.Date} onChange={handleInputChange} name='Date' required></input><br /><br />
        <label>Start Time</label>
        <input type='time' value={user.Stime} onChange={handleInputChange} name='Stime' required></input><br /><br />
        <label>Departure Time </label>
        <input type='time' value={user.Etime} onChange={handleInputChange} name='Etime' required></input><br /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Attend;