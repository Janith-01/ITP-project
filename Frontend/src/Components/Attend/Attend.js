import React, { useState } from 'react';
import EmpNav from "../EmpNav/EmpNav";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './Attend.css';

function Attend() {
  const history = useNavigate(); // Using useNavigate hook from react-router-dom for navigation
  const [user, setUser] = useState({ // State for user data
    Eid: "",
    Date: "",
    Stime: "",
    Etime: "",
  });
  const [idError, setIdError] = useState(false); // State to track Employee ID validation error
  const [timeError, setTimeError] = useState(false); // State to track time validation error
  const [isValidEid, setIsValidEid] = useState(true); // State to track validity of Employee ID

  // Function to handle input changes
  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    // Regular expression to allow only letters, numbers, and spaces
    const regex = /^[a-zA-Z0-9\s]*$/;

    // Check for forbidden symbols for Employee ID
    if (name === 'Eid') {
      if (!regex.test(value)) {
        setIdError(true);
      } else {
        setIdError(false);
      }

      // Validate Employee ID against database
      if (value) {
        try {
          const response = await axios.post('http://localhost:8083/attend/validate', { Eid: value });
          setIsValidEid(response.data.isValid);
        } catch (error) {
          console.error("Error validating Employee ID:", error);
        }
      } else {
        setIsValidEid(true);
      }
    }

    // Update state with current date and time if necessary
    if (name === 'Eid') {
      const { Date, Stime, Etime } = getCurrentDateTime();
      setUser({ ...user, [name]: value, Date, Stime, Etime });
    } else if (name === 'Date' || name === 'Stime' || name === 'Etime') {
      const { Date, Stime, Etime } = getCurrentDateTime();
      if (value !== user[name]) {
        setTimeError(true);
        setTimeout(() => {
          setTimeError(false);
        }, 3000);
      }
      setUser({ ...user, Date, Stime, Etime });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  // Function to get current date and time
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

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (idError) {
      alert("Employee ID can only contain letters, numbers, and spaces.");
      return;
    }
    if (!isValidEid) {
      alert("This Employee ID is not valid.");
      return;
    }
    if (timeError) {
      alert("Please keep the current date and time.");
      return;
    }

    sendRequest().then(() => {
      alert("Attend Mark Success");
      history("/attend");
    }).catch((err) => {
      alert(err.message);
    });
  };

  // Function to send attendance data to the server
  const sendRequest = async () => {
    await axios.post("http://localhost:8083/attend", {
      Eid: String(user.Eid),
      Date: String(user.Date),
      Stime: String(user.Stime),
      Etime: String(user.Etime),
    })
      .then((res) => res.data);
  };

  return (
    <div className="container5">
      <EmpNav /> {/* Component for employee navigation */}
      <h1>Attend Marking</h1>
      <form onSubmit={handleSubmit} className='form-Attend'>
        <label>Employee ID </label>
        <input type='text' value={user.Eid} onChange={handleInputChange} name='Eid' required></input><br /><br />
        {idError && <span className="error-message">Employee ID can only contain letters, numbers, and spaces.</span>}
        {!isValidEid && <span className="error-message">This Employee ID is not valid.</span>}
        <label>Date </label>
        <input type='date' value={user.Date} onChange={handleInputChange} name='Date' required></input><br /><br />
        <label>Start Time</label>
        <input type='time' value={user.Stime} onChange={handleInputChange} name='Stime' required></input><br /><br />
        <label>Departure Time </label>
        <input type='time' value={user.Etime} onChange={handleInputChange} name='Etime' required></input><br /><br />
        {timeError && <span className="error-message">Please keep the current date and time.</span>}
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Attend;


