import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

function CreateInsidentForm({ incident, setShowForm }) {
    // Define initial form data using the incident data passed as props
    const [formData, setFormData] = useState({
        ownerName: incident.ownerName || '',
        nic: '',
        phone: incident.phone || '',
        email: '',
        vehicleNumber: incident.vehicleNumber || '',
        vehicleType: '',
        location: incident.location || '',
        emergencyType: incident.emergencyType || '',
        damageType: '',
        status: '',
        estimatedCost: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
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
        setError(null);
        try {
            // Make POST request to create the incident
            const response = await axios.post('http://localhost:3000/api/insident/create', formData);
            // Handle success response
            console.log(response.data);
            // Optionally, reset form data or show success message
            setSuccessMessage('Incident created successfully.');
            setShowForm(false);
        } catch (err) {
            // Handle error response
            console.error(err);
            setError('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
           <div className="bg-cover bg-[url('/create.jpg')] bg-opacity-10 p-10 h-[1000px]">
                <div className='p-3 max-w-lg mx-auto bg-white rounded-2xl'>
                    <h1 className='text-3xl text-center font-semibold my-7'>Create Insident</h1>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        {/* Input fields */}
                        <input
                            onChange={handleChange}
                            type='text'
                            placeholder='Owner Name'
                            id='ownerName'
                            value={formData.ownerName}
                            className='bg-slate-100 p-3 rounded-lg'
                            required
                        />
                        <input
                            onChange={handleChange}
                            type='text'
                            placeholder='NIC'
                            id='nic'
                            value={formData.nic}
                            className='bg-slate-100 p-3 rounded-lg'
                            required
                        />
                        <input
                            onChange={handleChange}
                            type='tel'
                            placeholder='Phone'
                            id='phone'
                            value={formData.phone}
                            className='bg-slate-100 p-3 rounded-lg'
                            pattern='^\d{10}$'  // Regular expression to match a 10-digit phone number
                            title='Please enter a valid 10-digit phone number'  // Custom validation message
                            required
                      />

                        <input
                            onChange={handleChange}
                            type='email'
                            placeholder='Email'
                            id='email'
                            value={formData.email}
                            className='bg-slate-100 p-3 rounded-lg'
                            required
                        />
                        <input
                            onChange={handleChange}
                            type='text'
                            placeholder='Vehicle Number'
                            id='vehicleNumber'
                            value={formData.vehicleNumber}
                            className='bg-slate-100 p-3 rounded-lg'
                            required
                        />
                        <select
                            onChange={handleChange}
                            id='vehicleType'
                            value={formData.vehicleType}
                            className='bg-slate-100 p-3 rounded-lg'
                            required
                        >
                            <option value=''>Select Vehicle Type</option>
                            <option value='Light weight vehicle'>Light weight vehicle</option>
                            <option value='Heavy vehicle'>Heavy vehicle</option>
                        </select>
                        <input
                            onChange={handleChange}
                            type='text'
                            placeholder='Location'
                            id='location'
                            value={formData.location}
                            className='bg-slate-100 p-3 rounded-lg'
                            required
                        />
                        {/* Emergency type dropdown */}
                        <select
                            onChange={handleChange}
                            id='emergencyType'
                            value={formData.emergencyType}
                            className='bg-slate-100 p-3 rounded-lg'
                            required
                        >
                            <option value=''>Select Emergency Type</option>
                            <option value='engine failure'>Engine Failure</option>
                            <option value='flat tires'>Flat Tires</option>
                            <option value='accident'>Accident</option>
                            <option value='not identified'>Not Identified</option>
                            <option value='other'>Other</option>
                        </select>
                        <select
                            onChange={handleChange}
                            id='damageType'
                            value={formData.damageType}
                            className='bg-slate-100 p-3 rounded-lg'
                            required
                        >
                            <option value=''>Select Damage Type</option>
                            <option value='severe'>Severe</option>
                            <option value='intermediate'>Intermediate</option>
                            <option value='normal'>Normal</option>
                            <option value='other'>Other</option>
                        </select>
                        <select
                            onChange={handleChange}
                            id='status'
                            value={formData.status}
                            className='bg-slate-100 p-3 rounded-lg'
                            required
                        >
                            <option value=''>Select status </option>
                            <option value='In progress'>Processing</option>
                            <option value='Completed'>Completed</option>
                            <option value='Assigned'>Assigned</option>
                        </select>
                        <input
                            onChange={handleChange}
                            type='number'
                            placeholder='Estimated Cost'
                            id='estimatedCost'
                            value={formData.estimatedCost}
                            className='bg-slate-100 p-3 rounded-lg'
                            required
                        />
                        {/* Submit button */}
                        <button className='bg-[#7b00d3] p-3 rounded-lg text-white uppercase hover:opacity-85 disabled:opacity-10'>
                            {loading ? 'Loading...' : 'Submit'}
                        </button>

                        {/* Error message */}
                        {error && (
                            <p className='text-red-700 mt-5'>{error}</p>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateInsidentForm;
