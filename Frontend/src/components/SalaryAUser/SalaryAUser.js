import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './SalaryAUser.css'; // Import the CSS file

function SalaryAUser(props) {
    const { _id, EmpID, Month, Job_Role, Basic_Salary, OT_Hours, OT_Rate, OT_Total, Bonus, Total } = props.user;
    const history = useNavigate();

    const deleteHandler = async () => {
        if (window.confirm("Do you want to delete this?")) {
            await axios.delete(`http://localhost:8083/salaryAdd/${_id}`)
                .then(res => res.data)
                .then(() => history("/"))
                .then(() => history("/SalaryADisplay"));
        }
    }

    return (
        <React.Fragment>
            <td>{_id}</td>
            <td>{EmpID}</td>
            <td>{Month}</td>
            <td>{Job_Role}</td>
            <td>{Basic_Salary}</td>
            <td>{OT_Hours}</td>
            <td>{OT_Rate}</td>
            <td>{OT_Total}</td>
            <td>{Bonus}</td>
            <td>{Total}</td>
            <td>
                <Link to={`/SalaryADisplay/${_id}`} className="user-action-link no-print">Update</Link>
                <button onClick={deleteHandler} className="delete-button no-print">Delete</button>
            </td>
        </React.Fragment>
    );
}

export default SalaryAUser;    
