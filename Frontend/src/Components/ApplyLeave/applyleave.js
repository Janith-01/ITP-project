import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import EmpNav from "../EmpNav/EmpNav";
import './applyleave.css';

function ApplyLeave() {
  const form = useRef();
  const [nameError, setNameError] = useState(false);
  const [empIdError, setEmpIdError] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    // Check if any field is empty
    const formData = new FormData(form.current);
    let isValid = true;
    formData.forEach((value) => {
      if (!value.trim()) {
        isValid = false;
        return false; // exit loop early if any field is empty
      }
    });

    if (!isValid) {
      alert("Please fill in all fields.");
      return;
    }

    if (nameError || empIdError) {
      alert("Please correct the errors before submitting.");
      return;
    }

    emailjs
      .sendForm("service_p8fbk0t", "template_pddn7nq", form.current, {
        publicKey: "ZYv3i2VO51H3yLrS2",
      })
      .then(
        () => {
          console.log('SUCCESS!');
          alert("Success! Your leave application has been submitted.");
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert("Failed to submit leave application. Please try again later.");
        },
      );
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/[^a-zA-Z0-9\s]/.test(value)) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };
  
  const handleEmpIdChange = (e) => {
    const value = e.target.value;
    if (/[^a-zA-Z0-9\s]/.test(value)) {
      setEmpIdError(true);
    } else {
      setEmpIdError(false);
    }
  };

  return (
    <div>
      <EmpNav />
      <div className='container20'>
        <h1 className='Ah1'>Apply Leave</h1>
        <form ref={form} onSubmit={sendEmail} className='formH'>
          <label>Name</label>
          <input type='text' name="user_name" required onChange={handleNameChange} />
          {nameError && <span className="error-message">Name cannot contain symbols</span>}
          <br /><br />
          <label>EmpId</label>
          <input type='text' name="user_EmpId" required onChange={handleEmpIdChange} />
          {empIdError && <span className="error-message">Employee ID cannot contain symbols</span>}
          <br /><br />
          <label>Leave Type</label>
          <input type='text' name="user_leavetype" required /><br /><br />
          <label>Start Date</label>
          <input type='date' name="user_Sdate" required /><br /><br />
          <label>End Date</label>
          <input type='date' name="user_Edate" required /><br /><br />
          <label>Reason</label>
          <textarea type='text' name="user_reason" required /><br /><br />
          <button type="submit" value="Send">Send</button>
        </form>
      </div>
    </div>
  );
}

export default ApplyLeave;
