// frontend/src/components/ReportGenerator.js
import React from 'react';
import { useUser } from "../provider/userprovider.js";
import Sidebar from '../dashboard/sidebar/sidebar.js';

const UserReport = () => {
    const { logUser, loginUser } = useUser();

    const generatePDF = async () => {
        try {

            const headers = new Headers({
                // "Content-Type": "application/json",
                Authorization: "Bearer " + logUser.token,
                //   "Custom-Header": "Value",
            });

            const response = await fetch(process.env.REACT_APP_BASE_URL + '/report/userreport', {
                method: 'POST',
                headers: headers
            });

            if (!response.ok) {
                throw new Error('Failed to generate PDF');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report.pdf');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <div>
            <div className="header"></div>
            <Sidebar selectedIndex={7} />
            <div className="content flex justify-center items-center">
                <div className="w-full">

                    <div>
                        <button className='btn-primary' onClick={generatePDF}>Generate  New User Report</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserReport;
