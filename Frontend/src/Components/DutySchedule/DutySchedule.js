import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './DutySchedule.css';

function DutySchedule() {
  const history = useNavigate();
  const [user, setUser] = useState({
    Eid: "",
    name: "",
    Month: "",
    week: "",
    duration: 0,
    reason: "",
  });
  const [idError, setIdError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));

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

    // Check for forbidden symbols for Name
    if (name === 'name') {
      if (!regex.test(value)) {
        setNameError(true);
      } else {
        setNameError(false);
      }
    }
  };


  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (idError || nameError) {
      alert("Employee ID and name can only contain letters, numbers, and spaces.");
      return;
    }

    if (!user.Eid || !user.name || !user.Month || !user.week || !user.duration || !user.reason) {
      alert("Please fill in all fields.");
      return;
    }

    if (user.duration < 1) {
      alert("Duration must be greater than or equal to 1.");
      return;
    }

    // If validation passes, submit the form
    sendRequest()
      .then(() => {
        alert("Submit Success");
        history("/dutyScheduleD");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:8083/schedule", {
      Eid: String(user.Eid),
      name: String(user.name),
      Month: String(user.Month),
      week: String(user.week),
      duration: Number(user.duration),
      reason: String(user.reason),
    })
      .then((res) => res.data);
  }

  const handleViewDutySchedule = () => {
    history('/dutyScheduleD'); // Navigate to DutySDisplay component
  };

  return (
    <div className="container10">
      <h1>Duty Schedule</h1>
      <form onSubmit={handleSubmit} className="form-duty">
        <label>Employee ID </label>
        <input type='text' value={user.Eid} onChange={handleInputChange} name='Eid' required></input>
        {idError && <span className="error-message">Employee ID can only contain letters, numbers, and spaces</span>}
        <br /><br />
        <label>Employee Name </label>
        <input type='text' value={user.name} onChange={handleInputChange} name='name' required></input>
        {nameError && <span className="error-message">Name can only contain letters, numbers, and spaces</span>}
        <br /><br />
        <label>Month </label>
        <input type='month' value={user.Month} onChange={handleInputChange} name='Month' required></input><br /><br />
        <label>Week </label>
        <input type='week' value={user.week} onChange={handleInputChange} name='week' required></input><br /><br />
        <label>Duration (in days) </label>
        <input type='number' value={user.duration} onChange={handleInputChange} name='duration' required></input><br /><br />
        <label>Special Task</label><br /><br />
        <textarea value={user.reason} onChange={handleInputChange} name='reason' /><br /><br />
        <button type="submit">Submit</button><br /><br />
      </form>
      <br />
      <button onClick={handleViewDutySchedule}>View Duty Schedule</button>
    </div>
  )
}

export default DutySchedule;
