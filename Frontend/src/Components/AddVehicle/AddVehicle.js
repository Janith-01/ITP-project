/*import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../AddVehicle/AddVehicle.css';

function AddVehicle() {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        vin: "",
        regNo: "",
        make: "",
        model: "",
        year: "",
        ownerName: "",
        ownerNic: "",
        ownerEmail: "",
        ownerAddress: "",
        contactNo: "",
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
            sendRequest().then(() => history('/vehicledetails'));
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
        if (!values.regNo.trim()) {
            errors.regNo = "Registration Number is required";
        }
        if (!values.make.trim()) {
          errors.make = "Make is required";
        }
        if (!values.model.trim()) {
          errors.model = "Model is required";
        }
        if (!values.year.trim()) {
          errors.year = "Year is required";
        }
        if (!values.ownerName.trim()) {
          errors.ownerName = "Owner Name is required";
        }
        if (!values.ownerNic.trim()) {
          errors.ownerNic = "Owner NIC is required";
        }
        if (!values.ownerEmail.trim()) {
          errors.ownerEmail = "Owner Email is required";
        }
        if (!values.ownerAddress.trim()) {
          errors.ownerAddress = "Owner Address is required";
        }
        if (!values.contactNo.trim()) {
          errors.contactNo = "Contact Number is required";
        }
        
        return errors;
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:5000/vehicles", {
            vin: String(inputs.vin),
            regNo: String(inputs.regNo),
            make: String(inputs.make),
            model: String(inputs.model),
            year: Number(inputs.year),
            ownerName: String(inputs.ownerName),
            ownerNic: Number(inputs.ownerNic),
            ownerEmail: String(inputs.ownerEmail),
            ownerAddress: String(inputs.ownerAddress),
            contactNo: Number(inputs.contactNo),
        }).then(res => res.data);
    };

    return (

        <div className='bg1-background'>
            <Nav />
            <h1><center>Add Vehicle</center></h1>
            <form className='addVehicle' onSubmit={handleSubmit}>
                <div className='inputGroup'>
                <label>Vehicle Identification Number(VIN)</label>
                <br />
                <input type="text" pattern="[a-zA-Z0-9]{17}" title='Enter 17 characters only. Space not Allowd' name="vin" onChange={handleChange} value={inputs.vin} required></input>
                {errors.vin && <span style={{ color: 'red' }}>{errors.vin}</span>}
                <br />
                <br /></div>
                <div className='inputGroup'>
                <label>Registration Number</label>
                <br />
                <input type="text" pattern="[a-zA-Z0-9- ]{7}" title='Enter 7 characters only.' name="regNo" onChange={handleChange} value={inputs.regNo} required></input>
                {errors.regNo && <span style={{ color: 'red' }}>{errors.regNo}</span>}
                <br />
                <br /></div>
                <div className='inputGroup'>
                <label>Make</label>
                <br />
                <input type="text" pattern="[a-zA-Z ]+" title='Numbers not Allowd' name="make" onChange={handleChange} value={inputs.make} required></input>
                {errors.make && <span style={{ color: 'red' }}>{errors.make}</span>}
                <br />
                <br /></div>
                <div className='inputGroup'>
                <label>Model</label>
                <br />
                <input type="text" pattern="^[a-zA-Z][a-zA-Z0-9-_.]{5,12}$" name="model" onChange={handleChange} value={inputs.model} required></input>
                {errors.model && <span style={{ color: 'red' }}>{errors.model}</span>}
                <br />
                <br /></div>
                <div className='inputGroup'>
                <label>Year</label>
                <br />
                <input type="text"  pattern="[0-9]{4}" title='Letters not Allowd' name="year" onChange={handleChange} value={inputs.year} required></input>
                {errors.year && <span style={{ color: 'red' }}>{errors.year}</span>}
                <br />
                <br /></div>
                <div className='inputGroup'>
                <label>Owner Name</label>
                <br />
                <input type="text" pattern="[a-zA-Z ]+" title='Numbers not Allowd' name="ownerName" onChange={handleChange} value={inputs.ownerName} required></input>
                {errors.ownerName && <span style={{ color: 'red' }}>{errors.ownerName}</span>}
                <br />
                <br /></div>
                <div className='inputGroup'>
                <label>Owner NIC</label>
                <br />
                <input type="text" pattern="[0-9]{12}" title='Letters not Allowd' name="ownerNic" onChange={handleChange} value={inputs.ownerNic} required></input>
                {errors.ownerNic && <span style={{ color: 'red' }}>{errors.ownerNic}</span>}
                <br />
                <br /></div>
                <div className='inputGroup'>
                <label>Owner Email</label>
                <br />
                <input type="email" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" title='Enter valid Email.' name="ownerEmail" onChange={handleChange} value={inputs.ownerEmail} required></input>
                {errors.ownerEmail && <span style={{ color: 'red' }}>{errors.ownerEmail}</span>}
                <br />
                <br /></div>
                <div className='inputGroup'>
                <label>Owner Address</label>
                <br />
                <input type="text" pattern="[a-zA-Z0-9-, ]+" name="ownerAddress" onChange={handleChange} value={inputs.ownerAddress} required></input>
                {errors.ownerAddress && <span style={{ color: 'red' }}>{errors.ownerAddress}</span>}
                <br />
                <br /></div>
                <div className='inputGroup'>
                <label>Contact Number</label>
                <br />
                <input type="text"  name="contactNo" onChange={handleChange} value={inputs.contactNo} required></input>
                {errors.contactNo && <span style={{ color: 'red' }}>{errors.contactNo}</span>}
                <br />
                <br /></div>

                <div className='sButton'>
                <button>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default AddVehicle;*/




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../AddVehicle/AddVehicle.css';
import VehicleNav from '../VehicleNav/VehicleNav';

function AddVehicle() {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        vin: "",
        regNo: "",
        make: "",
        model: "",
        year: "",
        ownerName: "",
        ownerNic: "",
        ownerEmail: "",
        ownerAddress: "",
        contactNo: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
      const { name, value } = e.target;
      let updatedValue = value;
      let errorMessage = '';

      if (name === 'vin' || name === 'regNo') {
          // Validate VIN and RegNo for symbols other than numbers and letters
          if (/[^a-zA-Z0-9\s-]/.test(value)) {
              errorMessage = `${name === 'vin' ? 'VIN' : 'Registration Number'} can only contain numbers, letters, spaces, and '-'`;
              updatedValue = value.replace(/[^a-zA-Z0-9\s-]/g, '');
          }
      }

      setInputs(prevState => ({
          ...prevState,
          [name]: updatedValue,
      }));

      setErrors(prevErrors => ({
          ...prevErrors,
          [name]: errorMessage,
      }));
  };

    

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(inputs);
        if (Object.keys(validationErrors).length === 0) {
            console.log(inputs);
            sendRequest().then(() => history('/vehicledetails'));
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
        if (!values.regNo.trim()) {
            errors.regNo = "Registration Number is required";
        }
        if (!values.make.trim()) {
          errors.make = "Make is required";
        }
        if (!values.model.trim()) {
          errors.model = "Model is required";
        }
        if (!values.year.trim()) {
          errors.year = "Year is required";
        }
        if (!values.ownerName.trim()) {
          errors.ownerName = "Owner Name is required";
        }
        if (!values.ownerNic.trim()) {
          errors.ownerNic = "Owner NIC is required";
        }
        if (!values.ownerEmail.trim()) {
          errors.ownerEmail = "Owner Email is required";
        }
        if (!values.ownerAddress.trim()) {
          errors.ownerAddress = "Owner Address is required";
        }
        if (!values.contactNo.trim()) {
          errors.contactNo = "Contact Number is required";
        }
        
        return errors;
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:5000/vehicles", {
            vin: String(inputs.vin),
            regNo: String(inputs.regNo),
            make: String(inputs.make),
            model: String(inputs.model),
            year: Number(inputs.year),
            ownerName: String(inputs.ownerName),
            ownerNic: Number(inputs.ownerNic),
            ownerEmail: String(inputs.ownerEmail),
            ownerAddress: String(inputs.ownerAddress),
            contactNo: Number(inputs.contactNo),
        }).then(res => res.data);
    };

    return (

        <div className='bg1-background'>
            <VehicleNav />
            <h1><center>Add Vehicle</center></h1>
            <form className='addVehicle' onSubmit={handleSubmit}>
                <div className='inputGroup'>
                <label>Vehicle Identification Number(VIN)</label>
                <input type="text" pattern="[a-zA-Z0-9]{17}" title='Enter 17 characters only. Space not Allowd' name="vin" onChange={handleChange} value={inputs.vin} required></input>
                {errors.vin && <span style={{ color: 'red' }}>{errors.vin}</span>}
                </div>
                <div className='inputGroup'>
                <label>Registration Number</label>
                <input type="text" pattern="[a-zA-Z0-9- ]{7}" title='Enter 7 characters only.' name="regNo" onChange={handleChange} value={inputs.regNo} required></input>
                {errors.regNo && <span style={{ color: 'red' }}>{errors.regNo}</span>}
                </div>
                <div className='inputGroup'>
                <label>Make</label>
                <input type="text" pattern="[a-zA-Z ]+" title='Numbers not Allowd' name="make" onChange={handleChange} value={inputs.make} required></input>
                {errors.make && <span style={{ color: 'red' }}>{errors.make}</span>}
                </div>
                <div className='inputGroup'>
                <label>Model</label>
                <input type="text" pattern="^[a-zA-Z][a-zA-Z0-9-_.]{5,12}$" name="model" onChange={handleChange} value={inputs.model} required></input>
                {errors.model && <span style={{ color: 'red' }}>{errors.model}</span>}
                </div>
                <div className='inputGroup'>
                <label>Year</label>
                <input type="text"  pattern="[0-9]{4}" title='Letters not Allowd' name="year" onChange={handleChange} value={inputs.year} required></input>
                {errors.year && <span style={{ color: 'red' }}>{errors.year}</span>}
                </div>
                <div className='inputGroup'>
                <label>Owner Name</label>
                <br />
                <input type="text" pattern="[a-zA-Z ]+" title='Numbers not Allowd' name="ownerName" onChange={handleChange} value={inputs.ownerName} required></input>
                {errors.ownerName && <span style={{ color: 'red' }}>{errors.ownerName}</span>}
                </div>
                <div className='inputGroup'>
                <label>Owner NIC</label>
                <input type="text" pattern="[0-9]{12}" title='Letters not Allowd' name="ownerNic" onChange={handleChange} value={inputs.ownerNic} required></input>
                {errors.ownerNic && <span style={{ color: 'red' }}>{errors.ownerNic}</span>}
                </div>
                <div className='inputGroup'>
                <label>Owner Email</label>
                <input type="email" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" title='Enter valid Email.' name="ownerEmail" onChange={handleChange} value={inputs.ownerEmail} required></input>
                {errors.ownerEmail && <span style={{ color: 'red' }}>{errors.ownerEmail}</span>}
                </div>
                <div className='inputGroup'>
                <label>Owner Address</label>
                <input type="text" pattern="[a-zA-Z0-9-, ]+" name="ownerAddress" onChange={handleChange} value={inputs.ownerAddress} required></input>
                {errors.ownerAddress && <span style={{ color: 'red' }}>{errors.ownerAddress}</span>}
                </div>
                <div className='inputGroup'>
                <label>Contact Number</label>
                <input type="text"  name="contactNo" onChange={handleChange} value={inputs.contactNo} required></input>
                {errors.contactNo && <span style={{ color: 'red' }}>{errors.contactNo}</span>}
                </div>

                <div className='sButton'>
                <button>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default AddVehicle;

