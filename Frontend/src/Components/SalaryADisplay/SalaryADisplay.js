 import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SalaryAUser from '../SalaryAUser/SalaryAUser';
import Nav from "../Nav/Nav";
import { useReactToPrint } from "react-to-print";
import './SalaryADisplay.css'; // Import the CSS file

const URL = "http://localhost:5000/salaryAdd";

function SalaryADisplay() {
    const [salaries, setSalaries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(URL);
                console.log(response.data);
                if (response.data.status === "ok") {
                    setSalaries(response.data.data);
                } else {
                    console.error('Error fetching salary details:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchHandler();
    }, []);


    const ComponentsRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        documentTitle: "Salary Report",
        onAfterPrint: () => alert("Salary Report Successfully Download"),
    });

    const handleSearch = async () => {
        try {
            const response = await axios.get(URL);
            const filteredSalaries = response.data.data.filter((salary) =>
                Object.values(salary).some((field) =>
                    field.toString().toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
            setSalaries(filteredSalaries);
            setNoResults(filteredSalaries.length === 0);
        } catch (error) {
            console.error('Error searching:', error);
        }
    }

    return (
        <div className="container12">
            <Nav />
            <br /><br /> 
            <div className="buttons-container">
                <Link to="/SalaryAdd">
                    <button className="new-salary-button">New Salary</button>
                </Link>
                <br></br><br></br>
                <div className="search-container">
                    <input
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type="text"
                        name="search"
                        placeholder="Search Users Details"
                    />
                          <button onClick={handleSearch} className='S1'>Search</button>
                </div>
            </div>
            <div ref={ComponentsRef}>
                <h1>Salary Details</h1>
                {noResults ? (
                    <div>
                        <p>No Users Found</p>
                    </div>
                ) : (
                    <table className="user-table">
                        <thead className="user-table1">
                            <tr>
                                <th>ID</th>
                                <th>E_ID</th>
                                <th>E_Month</th>
                                <th>E_Job_Role</th>
                                <th>E_Basic_Salary</th>
                                <th>E_OT_Hours</th>
                                <th>E_OT_Rate</th>
                                <th>E_OTTot</th>
                                <th>E_Bonus</th>
                                <th>Total</th>
                                <th className="no-print  , user-table ">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salaries.length > 0 ? (
                                salaries.map((salary, i) => (
                                    <tr key={i} className="user-details">
                                        <SalaryAUser user={salary} />
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="11">No salary details available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
                <br /><br />
            </div>
            <button onClick={handlePrint} className="no-print D1">Download Report</button>
        </div>
    );
}

export default SalaryADisplay;
