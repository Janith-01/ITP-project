import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Request.css'; 

function Request(props) {
    const {_id, name, Eid, lType, sdate, edate, reason, status} = props.leaveRequest;

    const history = useNavigate();

    const deleteHandler = async () => {
        await axios.delete(`http://localhost:8083/leaverequest/${_id}`)
            .then(() => {
                alert("Request deleted successfully");
                history("/displayrequest");
            })
            .catch(error => {
                console.error('Error deleting request:', error);
                // Handle error (optional)
            });
    }

    return (
        
             <React.Fragment>
            <td> {_id}</td>
            <td> {name}</td>
            <td>{Eid}</td>
            <td>{lType}</td>
            <td>{sdate}</td>
            <td>{edate}</td>
            <td>{reason}</td>
            <td>{status}</td>
            <td>
            <Link to={`/displayrequest/${_id}`} className="no-print  ,  Rupdate "> Update </Link>
            <button onClick={deleteHandler} className="no-print , Sdelete ">Delete</button>
            </td>
            </React.Fragment>
        
    );
}

export default Request;


