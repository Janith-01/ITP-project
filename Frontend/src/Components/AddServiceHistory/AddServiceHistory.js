import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../AddServiceHistory/AddServiceHistory.css";


function AddServiceHistory() {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        vin: "",
        type: "",
        date: "",
        description: "",
        parts: "",
        cost: "",
        macanic: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(inputs);
        if (Object.keys(validationErrors).length === 0) {
            console.log(inputs);
            sendRequest().then(() => history('/servicehistorydetails'));
        } else {
            setErrors(validationErrors);
        }
    };

    const validate = (values) => {
        let errors = {};

        // validation rules
        if (!values.vin.trim()) {
            errors.vin = "VIN is required";
        }
        if (!values.type.trim()) {
            errors.type = "Type is required";
        }
        if (!values.date.trim()) {
          errors.date = "Date is required";
        }
        if (!values.description.trim()) {
          errors.description = "Description is required";
        }
        if (!values.parts.trim()) {
          errors.parts = "Used Part is required";
        }
        if (!values.cost.trim()) {
          errors.cost = "Cost Name is required";
        }
        if (!values.macanic.trim()) {
          errors.macanic = "Macanic NIC is required";
        }
        
        return errors;
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:5000/serviceshistory", {
            vin: String(inputs.vin),
            type: String(inputs.type),
            date: String(inputs.date),
            description: String(inputs.description),
            parts: String(inputs.parts),
            cost: Number(inputs.cost),
            macanic: String(inputs.macanic),
        }).then(res => res.data);
    };

    return (

        <div className='bg2-background'>
            <Nav />
            <h1><center>Add Service History</center></h1>
            <form className='addServiceHistory' onSubmit={handleSubmit}>
                <div className='inputGroup'>
                <label>Vehicle Identification Number(VIN)</label>
                <br />
                <input type="text" pattern="[a-zA-Z0-9]{17}" title='Enter 17 characters only. Space not Allowd' name="vin" onChange={handleChange} value={inputs.vin} required></input>
                {errors.vin && <span style={{ color: 'red' }}>{errors.vin}</span>}
                <br />
                <br /></div>
                <div className='inputGroup'>
                <label>Service Type</label>
                <br />
                <input type="text" pattern="[a-zA-Z0-9 ]+" name="type" onChange={handleChange} value={inputs.type} required></input>
                {errors.type && <span style={{ color: 'red' }}>{errors.type}</span>}
                <br />
                <br /></div>
                <div className='inputGroup'>
                <label>Service Date</label>
                <br />
                <input type="date" name="date" onChange={handleChange} value={inputs.date} required></input>
                {errors.date && <span style={{ color: 'red' }}>{errors.date}</span>}
                <br />
                <br /></div>
                <div className='inputGroup'>
                <label>Description</label>
                <br />
                <input type="text"  name="description" onChange={handleChange} value={inputs.description} required></input>
                {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}
                <br />
                <br /></div>
                <div className='inputGroup'>
                <label>Used Parts</label>
                <br />
                <input type="text" pattern="[a-zA-Z0-9 ]+" name="parts" onChange={handleChange} value={inputs.parts} required></input>
                {errors.parts && <span style={{ color: 'red' }}>{errors.parts}</span>}
                <br />
                <br /></div>
                <div className='inputGroup'>
                <label>Service Cost</label>
                <br />
                <input type="text"  name="cost" onChange={handleChange} value={inputs.cost} required></input>
                {errors.cost && <span style={{ color: 'red' }}>{errors.cost}</span>}
                <br />
                <br /></div>
                <div className='inputGroup'>
                <label>Machanic Name</label>
                <br />
                <input type="text" pattern="[a-zA-Z0-9 ]+" name="macanic" onChange={handleChange} value={inputs.macanic} required></input>
                {errors.macanic && <span style={{ color: 'red' }}>{errors.macanic}</span>}
                <br />
                <br /></div>
                
                {/* - */}
                <button>Submit</button>
            </form>
        </div>
    );
}

export default AddServiceHistory;

//[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])