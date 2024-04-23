import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import CreateInsidentForm from '../components/CreateInsidentForm';
import Modal from 'react-modal'; // Importing React Modal
import './reportedtable.css';

const PAGE_SIZE = 20; // Define page size for pagination

// Set the root element for the modal (usually the element with id="root")
Modal.setAppElement('#root');

function ViewReportedInsidents() {
    const [incidents, setIncidents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false); // State variable to manage form visibility
    const [currentIncident, setCurrentIncident] = useState(null); // State variable to hold data for the specific row clicked

    // Fetch reported incidents data from the backend
    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/reportinginsident/');
                if (response.status === 200) {
                    setIncidents(response.data);
                } else {
                    console.error('Failed to fetch incidents');
                }
            } catch (error) {
                console.error('Error fetching incidents:', error);
            }
        };
        fetchIncidents();
    }, []);

    // Calculate total pages for pagination
    const totalPages = Math.ceil(incidents.length / PAGE_SIZE);
    const paginatedIncidents = incidents.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    // Function to handle "Create an Incident" button click
    const handleCreateIncident = (incident) => {
        setCurrentIncident(incident);
        setShowForm(true);
    };

    // Pagination functions
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <Header />
            <div className="card">
                <div className="cart">
                    <div className="title">
                        <div className="row">
                            <div className="col">
                                <h1 className="h1">
                                    <b>Customer Reported Incidents</b>
                                </h1>
                            </div>
                        </div>
                        <table id="reportedtable">
                            <thead>
                                <tr>
                                    <th>Owner Name</th>
                                    <th>Phone</th>
                                    <th>Vehicle Number</th>
                                    <th>Location</th>
                                    <th>Emergency Type</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedIncidents.map((incident) => (
                                    <tr key={incident._id}>
                                        <td>{incident.ownerName}</td>
                                        <td>{incident.phone}</td>
                                        <td>{incident.vehicleNumber}</td>
                                        <td>{incident.location}</td>
                                        <td>{incident.emergencyType}</td>
                                        <td className="flex space-x-2">
                                            {/* Button in actions column */}
                                            <button
                                                onClick={() => handleCreateIncident(incident)}
                                                className="bg-[#7b00d3] text-white py-2 px-4 rounded hover:bg-blue-600"
                                            >
                                                Create an Incident
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination controls */}
                        <div className="flex justify-center">
                            <button
                                onClick={prevPage}
                                disabled={currentPage === 1}
                                className="bg-green-500 text-white py-1 px-4 rounded mr-2 w-30 h-9"
                            >
                                &lt;&lt; Previous
                            </button>
                            <button
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                                className="bg-green-500 text-white py-1 px-4 rounded w-30 h-9"
                            >
                                Next &gt;&gt;
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Render the CreateInsidentForm as a modal if showForm is true */}
            <Modal
                isOpen={showForm}
                onRequestClose={() => setShowForm(false)}
                contentLabel="Create Insident Form"
                className="modal-class"
                overlayClassName="modal-overlay-class"
            >
                {/* Apply the scrollable-modal-content class to make the modal scrollable */}
                <div className="scrollable-modal-content">
                    <CreateInsidentForm
                        incident={currentIncident}
                        setShowForm={setShowForm}
                    />
                </div>
            </Modal>
        </>
    );
}

export default ViewReportedInsidents;
