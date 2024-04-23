import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import CreateInsidentForm from '../components/CreateInsidentForm';
import Modal from 'react-modal';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import './reportedtable.css';

const PAGE_SIZE = 20; 

// Define styles for PDF document
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 20,
    },
    table: {
        display: 'table',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        flexDirection: 'row',
        margin: 'auto',
        borderBottomWidth: 1,
    },
    tableColHeader: {
        width: '10%',
        borderStyle: 'solid',
        borderWidth: 1,
    },
    tableCol: {
        width: '10%',
        borderStyle: 'solid',
        borderWidth: 1,
    },
});

const InsidentsPDF = ({ insidents }) => (
    <Document>
        <Page size="A1" style={styles.page}>
            <View style={{ textAlign: 'center', marginBottom: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Created Incidents</Text>
            </View>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={styles.tableColHeader}><Text>Owner Name</Text></View>
                    <View style={styles.tableColHeader}><Text>NIC</Text></View>
                    <View style={styles.tableColHeader}><Text>Phone</Text></View>
                    <View style={styles.tableColHeader}><Text>Email</Text></View>
                    <View style={styles.tableColHeader}><Text>Vehicle Number</Text></View>
                    <View style={styles.tableColHeader}><Text>Location</Text></View>
                    <View style={styles.tableColHeader}><Text>Damage Type</Text></View>
                    <View style={styles.tableColHeader}><Text>Status</Text></View>
                    <View style={styles.tableColHeader}><Text>Emergency Type</Text></View>
                    <View style={styles.tableColHeader}><Text>Cost Est.</Text></View>
                </View>
                {insidents.map((insident, index) => (
                    <View style={styles.tableRow} key={index}>
                        <View style={styles.tableCol}><Text>{insident.ownerName}</Text></View>
                        <View style={styles.tableCol}><Text>{insident.nic}</Text></View>
                        <View style={styles.tableCol}><Text>{insident.phone}</Text></View>
                        <View style={styles.tableCol}><Text>{insident.email}</Text></View>
                        <View style={styles.tableCol}><Text>{insident.vehicleNumber}</Text></View>
                        <View style={styles.tableCol}><Text>{insident.location}</Text></View>
                        <View style={styles.tableCol}><Text>{insident.damageType}</Text></View>
                        <View style={styles.tableCol}><Text>{insident.status}</Text></View>
                        <View style={styles.tableCol}><Text>{insident.emergencyType}</Text></View>
                        <View style={styles.tableCol}><Text>{insident.estimatedCost}</Text></View>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

function ViewInsidents() {
    const [insidents, setInsidents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentInsident, setCurrentInsident] = useState(null);
    const [editinginsident, setEditingInsident] = useState(null);

    // Fetch incidents data from the backend
    useEffect(() => {
        const fetchInsidents = async () => {
            try {
                const response = await axios.get(' http://localhost:3000/api/insident/');
                if (response.status === 200) {
                    setInsidents(response.data);
                } else {
                    console.error('Failed to fetch incidents');
                }
            } catch (error) {
                console.error('Error fetching incidents:', error);
            }
        };
        fetchInsidents();
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page when search query changes
      };

      function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`; // Format as "YYYY-MM-DD"
    }
    // Filter incidents based on the search query
    const filteredInsidents = insidents.filter(
        (insident) =>
            insident.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            insident.nic.toLowerCase().includes(searchQuery.toLowerCase()) ||
            insident.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
            insident.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            insident.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            insident.vehicleType.toLowerCase().includes(searchQuery.toLowerCase()) ||
            insident.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            insident.damageType.toLowerCase().includes(searchQuery.toLowerCase()) ||
            insident.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
            insident.emergencyType.toLowerCase().includes(searchQuery.toLowerCase())||
            insident.estimatedCost.toString().includes(searchQuery)||
            formatDate(insident.createdAt).includes(searchQuery)
    );

   
    const totalPages = Math.ceil(filteredInsidents.length / PAGE_SIZE);
    const paginatedInsidents = filteredInsidents.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);


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

    // Handle Update Incident
    const handleUpdateIncident = (insident) => {
        setEditingInsident(insident)
        setCurrentInsident(insident);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/insident/update/${currentInsident._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editinginsident),
            });
            if (!response.ok) {
                throw new Error("Failed to update Insident");
            }

            setEditingInsident(null);
            window.location.reload();
        } catch (error) {
            console.error("Error updating Insident:", error);
        }
    };

    // Handle Delete Incident
    const handleDeleteIncident = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this incident?");
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:3000/api/insident/delete/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ currentInsident }),
                }); if (response.status === 200) {
                    setInsidents((prevInsidents) => prevInsidents.filter((insident) => insident._id !== id));
                } else {
                    console.error('Failed to delete incident');
                }
            } catch (error) {
                console.error('Error deleting incident:', error);
            }
        }
    };

    // Render the ViewInsidents component
    return (
        <>
            <Header />
            <div className="card">
                <div className="cart">
                    <div className="title">
                        <div className="row">
                            <div className="col">
                                <h1 className="h1">
                                    <b>Reported Incidents</b>
                                </h1>
                            </div>
                            <form class="max-w-md mx-auto">
                                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input type="text" value={searchQuery} onChange={handleSearch} id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search using any field" required />
                                    <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                                </div>
                            </form>
                        </div>
                        {editinginsident ? (
                            <div className='bg-cover bg-[url("/profile.jpeg")]  p-8 h- min-h-screen'>
                                <div className='p-3 max-w-lg mx-auto bg-white rounded-2xl'>
                                    <h1 className='text-3xl font-semibold text-center my-7'>Update Incident</h1>
                                    <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
                                        <input
                                            type="text"
                                            id='ownerName'
                                            placeholder='Owner Name'
                                            value={editinginsident.ownerName}
                                            onChange={(e) => setEditingInsident({ ...editinginsident, ownerName: e.target.value })}
                                            className='bg-slate-100 rounded-lg p-3'
                                        />
                                        <input
                                            type="text"
                                            id='nic'
                                            placeholder='NIC'
                                            value={editinginsident.nic}
                                            onChange={(e) => setEditingInsident({ ...editinginsident, nic: e.target.value })}
                                            className='bg-slate-100 rounded-lg p-3'
                                        />
                                        <input
                                            type='tel'
                                            placeholder='Phone'
                                            id='phone'
                                            value={editinginsident.phone}
                                            onChange={(e) => setEditingInsident({ ...editinginsident, phone: e.target.value })}
                                            className='bg-slate-100 p-3 rounded-lg'
                                        />
                                        <input
                                            type="email"
                                            id='email'
                                            placeholder='Email'
                                            value={editinginsident.email}
                                            onChange={(e) => setEditingInsident({ ...editinginsident, email: e.target.value })}
                                            className='bg-slate-100 rounded-lg p-3'
                                        />
                                        <input
                                            type="text"
                                            id='vehicleNumber'
                                            placeholder='Vehicle Number'
                                            value={editinginsident.vehicleNumber}
                                            onChange={(e) => setEditingInsident({ ...editinginsident, vehicleNumber: e.target.value })}
                                            className='bg-slate-100 rounded-lg p-3'
                                        />
                                        <input
                                            type="text"
                                            id='vehicleType'
                                            placeholder='Vehicle Type'
                                            value={editinginsident.vehicleType}
                                            onChange={(e) => setEditingInsident({ ...editinginsident, vehicleType: e.target.value })}
                                            className='bg-slate-100 rounded-lg p-3'
                                        />
                                        <input
                                            type="text"
                                            id='location'
                                            placeholder='Location'
                                            value={editinginsident.location}
                                            onChange={(e) => setEditingInsident({ ...editinginsident, location: e.target.value })}
                                            className='bg-slate-100 rounded-lg p-3'
                                        />
                                        <select
                                            id='emergencyType'
                                            value={editinginsident.emergencyType}
                                            onChange={(e) => setEditingInsident({ ...editinginsident, emergencyType: e.target.value })}
                                            className='bg-slate-100 rounded-lg p-3'
                                        >
                                            <option value=''>Select Emergency Type</option>
                                            <option value='engine failure'>Engine Failure</option>
                                            <option value='flat tires'>Flat Tires</option>
                                            <option value='accident'>Accident</option>
                                            <option value='not identified'>Not Identified</option>
                                            <option value='other'>Other</option>
                                        </select>
                                        <select
                                            id='damageType'
                                            value={editinginsident.damageType}
                                            onChange={(e) => setEditingInsident({ ...editinginsident, damageType: e.target.value })}
                                            className='bg-slate-100 rounded-lg p-3'
                                        >
                                            <option value=''>Select Damage Type</option>
                                            <option value='severe'>Severe</option>
                                            <option value='intermediate'>Intermediate</option>
                                            <option value='normal'>Normal</option>
                                            <option value='other'>Other</option>
                                        </select>
                                        <select
                                            id='status'
                                            value={editinginsident.status}
                                            onChange={(e) => setEditingInsident({ ...editinginsident, status: e.target.value })}
                                            className='bg-slate-100 rounded-lg p-3'
                                        >
                                            <option value=''>Select status </option>
                                            <option value='In progress'>Processing</option>
                                            <option value='Completed'>Completed</option>
                                            <option value='Assigned'>Assigned</option>
                                        </select>
                                        <input
                                            type="number"
                                            id='estimatedCost'
                                            placeholder='Estimated Cost'
                                            value={editinginsident.estimatedCost}
                                            onChange={(e) => setEditingInsident({ ...editinginsident, estimatedCost: e.target.value })}
                                            className='bg-slate-100 rounded-lg p-3'
                                        />
                                        <button className='bg-[#f0b20a] bg-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                                            {'Update'}
                                        </button>
                                    </form>

                                </div>
                            </div>
                        ) : (
                            <table id="reportedtable">
                                <thead>
                                    <tr>
                                        <th>Owner Name</th>
                                        <th>NIC</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>Vehicle Number</th>
                                        <th>Vehicle Type</th>
                                        <th>Location</th>
                                        <th>Damage type</th>
                                        <th>Status</th>
                                        <th>Emergency Type</th>
                                        <th>Cost Est.</th>
                                        <th>Created At</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedInsidents.map((insident, index) => (
                                        <tr key={insident._id}>
                                            <td>{insident.ownerName}</td>
                                            <td>{insident.nic}</td>
                                            <td>{insident.phone}</td>
                                            <td>{insident.email}</td>
                                            <td>{insident.vehicleNumber}</td>
                                            <td>{insident.vehicleType}</td>
                                            <td>{insident.location}</td>
                                            <td>{insident.damageType}</td>
                                            <td>{insident.status}</td>
                                            <td>{insident.emergencyType}</td>
                                            <td>{insident.estimatedCost}</td>
                                            <td>{new Date(insident.createdAt).toLocaleDateString()}</td>
                                            <td className="flex space-x-2">
                                                <button
                                                    onClick={() => handleUpdateIncident(insident)}
                                                    className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteIncident(insident._id)}
                                                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
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
                        <div className="btn1">
                            <PDFDownloadLink
                                document={<InsidentsPDF insidents={insidents} />}
                                fileName="insidents.pdf"
                            >
                                {({ loading }) => (loading ? "Loading document..." : "Download Incidents Report as PDF")}
                            </PDFDownloadLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewInsidents;
