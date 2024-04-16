import React from 'react';
import { MdOutlineClose } from "react-icons/md"; // Import MdOutlineClose icon
import "../App.css";

const Formtable = ({ handleSubmit, handleOnChange, handleclose, rest }) => {
    return (
        <div className="addContainer">
            <form onSubmit={handleSubmit}>
                <div className="close-btn" onClick={handleclose}><MdOutlineClose /></div>

                <label htmlFor="userId">User Id:</label>
                <input type="text" id="userId" name="userId" onChange={handleOnChange} value={rest.userId} />

                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" onChange={handleOnChange} value={rest.name} />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" onChange={handleOnChange} value={rest.email} />

                <label htmlFor="address">Address:</label>
                <input type="text" id="address" name="address" onChange={handleOnChange} value={rest.address} />

                <label htmlFor="mobile">Phone:</label>
                <input type="text" id="mobile" name="mobile" onChange={handleOnChange} value={rest.mobile} />

                <label htmlFor="userType">User Type:</label>
                <input type="text" id="userType" name="userType" onChange={handleOnChange} value={rest.userType} />

                <button className="btn" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Formtable;
