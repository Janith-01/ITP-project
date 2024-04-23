import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; // Import useHistory
import "bootstrap/dist/css/bootstrap.min.css";

const SendMailPage = ({ recipientEmail }) => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory(); // Initialize useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8083/send-email", {
        recipient: recipientEmail,
        subject,
        description,
      });
      alert("Email sent successfully!");
      history.goBack(); // Go back to the previous page
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again later.");
      history.goBack(); // Go back to the previous page
    }
  };

  return (
    <div className="container mt-5">
      <h1>Send Email</h1>
      <div className="card mt-3">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="recipient" className="form-label">
                Recipient Email Address:
              </label>
              <input
                type="email"
                className="form-control"
                id="recipient"
                value={recipientEmail}
                readOnly // Make the input read-only
              />
            </div>
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">
                Subject:
              </label>
              <input
                type="text"
                className="form-control"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <textarea
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Send
            </button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => history.goBack()}>
              Back
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendMailPage;
