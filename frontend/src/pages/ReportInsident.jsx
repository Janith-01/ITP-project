import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

function CreateReportingIncidentForm() {
    const [formData, setFormData] = useState({
        ownerName: '',
        phone: '',
        vehicleNumber: '',
        location: '',
        emergencyType: ''
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });

        // Custom validation for phone number
        if (id === 'phone') {
            const phoneInput = e.target;
            if (!/^\d{10}$/.test(value)) {
                phoneInput.setCustomValidity('Please enter a valid 10-digit phone number');
            } else {
                phoneInput.setCustomValidity('');
            }
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage(null);
        setErrorMessage(null);
        try {
            // Make POST request to create the incident
            const response = await axios.post('http://localhost:3000/api/reportinginsident/create', formData);
            // Handle success response
            console.log(response.data);
            setSuccessMessage('Incident Reported successfully. They will contact you soon');
            // Clear form data
            setFormData({
                ownerName: '',
                phone: '',
                vehicleNumber: '',
                location: '',
                emergencyType: ''
            });
        } catch (err) {
            // Handle error response
            console.error(err);
            setErrorMessage('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="bg-cover bg-[url('/report.gif')] bg-opacity-10 p-20 h-screen">
                <div className="p-3 max-w-lg mx-auto bg-white rounded-2xl">
                    <h1 className="text-3xl text-center font-semibold my-7">Report Incident</h1>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        {/* Input fields */}
                        <input
                            onChange={handleChange}
                            type="text"
                            placeholder="Owner Name"
                            id="ownerName"
                            value={formData.ownerName}
                            className="bg-slate-100 p-3 rounded-lg"
                            required
                        />
                        <input
                            onChange={handleChange}
                            type="tel"
                            placeholder="Phone"
                            id="phone"
                            value={formData.phone}
                            className="bg-slate-100 p-3 rounded-lg"
                            pattern="^\d{10}$"  // Regular expression to match a 10-digit phone number
                            title="Please enter a valid 10-digit phone number"  // Custom validation message
                            required
                        />
                        <input
                            onChange={handleChange}
                            type="text"
                            placeholder="Vehicle Number"
                            id="vehicleNumber"
                            value={formData.vehicleNumber}
                            className="bg-slate-100 p-3 rounded-lg"
                            required
                        />
                        <input
                            onChange={handleChange}
                            type="text"
                            placeholder="Location"
                            id="location"
                            value={formData.location}
                            className="bg-slate-100 p-3 rounded-lg"
                            required
                        />
                        {/* Emergency type dropdown */}
                        <select
                            onChange={handleChange}
                            id="emergencyType"
                            value={formData.emergencyType}
                            className="bg-slate-100 p-3 rounded-lg"
                            required
                        >
                            <option value="">Select Emergency Type</option>
                            <option value="engine failure">Engine Failure</option>
                            <option value="flat tires">Flat Tires</option>
                            <option value="accident">Accident</option>
                            <option value="not identified">Not Identified</option>
                            <option value="other">Other</option>
                        </select>

                        {/* Submit button */}
                        <button
                            type="submit"
                            className="bg-[#7b00d3] p-3 rounded-lg text-white uppercase hover:opacity-85 disabled:opacity-10"
                        >
                            {loading ? 'Loading...' : 'Submit'}
                        </button>

                        {/* Display success or error message */}
                        {successMessage && (
                            <p className="text-green-700 mt-5">{successMessage}</p>
                        )}
                        {errorMessage && (
                            <p className="text-red-700 mt-5">{errorMessage}</p>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateReportingIncidentForm;
