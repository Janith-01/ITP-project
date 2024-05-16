import React, {useEffect, useState} from 'react'
import VehicleNav from '../VehicleNav/VehicleNav';
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import "../UpdateVehicle/UpdateVehicle.css";


function UpdateVehicle() {

    const [inputs, setInputs] = useState({});
    const history = useNavigate();
    const id = useParams().id;

    useEffect(()=>{
        const fetchHandler = async ()=>{
            await axios
            .get(`http://localhost:8083/vehicles/${id}`)
            .then((res)=> res.data)
            .then((data)=> setInputs(data.vehicle));
        };
        fetchHandler();
    },[id]);

    const sendRequest = async ()=>{
        await axios
        .put(`http://localhost:8083/vehicles/${id}`,{
            vin: String (inputs.vin),
            regNo: String (inputs.regNo),
            make: String (inputs.make),
            model: String (inputs.model),
            year: Number (inputs.year),
            ownerName: String (inputs.ownerName),
            ownerNic: Number (inputs.ownerNic),
            ownerEmail: String (inputs.ownerEmail),
            ownerAddress: String (inputs.ownerAddress),
            contactNo: Number (inputs.contactNo),
        })
            .then((res) => res.data);
    };

    const handleChange =(e)=>{
        setInputs((prevState)=> ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
      };
    
      const handleSubmit =(e)=>{
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(()=>
        history('/vehicledetails'));
      };

  return (
    <div className='bg1-background'>
      <VehicleNav />
      <h1><center>Update Vehicle</center></h1>
      <form className='updateVehicle' onSubmit={handleSubmit}>
        <div className='inputGroup'>
        <label>Vehicle Identification Number</label>
        <input type="text" pattern="[a-zA-Z0-9]{17}" title='Enter 17 characters only. Space not Allowd' name="vin" onChange={handleChange} value={inputs.vin} required></input>
        </div>
        <div className='inputGroup'>
        <label>Registration Number</label>
        <input type="text" pattern="[a-zA-Z0-9- ]{7}" title='Enter 7 characters only.' name="regNo" onChange={handleChange} value={inputs.regNo} required></input>
        </div>
        <div className='inputGroup'>
        <label>Make</label>
        <input type="text" pattern="[a-zA-Z ]+" title='Numbers not Allowd' name="make" onChange={handleChange} value={inputs.make} required></input>
        </div>
        <div className='inputGroup'>
        <label>Model</label>
        <input type="text" pattern="^[a-zA-Z][a-zA-Z0-9-_.]{5,12}$" name="model" onChange={handleChange} value={inputs.model} required></input>
        </div>
        <div className='inputGroup'>
        <label>Year</label>
        <input type="text" pattern="[0-9]{4}" title='Letters not Allowd' name="year" onChange={handleChange} value={inputs.year} required></input>
        </div>
        <div className='inputGroup'>
        <label>Owner Name</label>
        <input type="text" pattern="[a-zA-Z ]+" name="ownerName" onChange={handleChange} value={inputs.ownerName} required></input>
        </div>
        <div className='inputGroup'>
        <label>Owner NIC</label>
        <input type="text" pattern="[0-9]{12}" title='Letters not Allowd' name="ownerNic" onChange={handleChange} value={inputs.ownerNic} required></input>
        </div>
        <div className='inputGroup'>
        <label>Owner Email</label>
        <input type="email" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" title='Enter valid Email.' name="ownerEmail" onChange={handleChange} value={inputs.ownerEmail} required></input>
        </div>
        <div className='inputGroup'>
        <label>Owner Address</label>
        <input type="text" pattern="[a-zA-Z0-9-, ]+" name="ownerAddress" onChange={handleChange} value={inputs.ownerAddress} required></input>
        </div>
        <div className='inputGroup'>
        <label>Contact Number</label>
        <input type="text"  name="contactNo" onChange={handleChange} value={inputs.contactNo} required></input>
        </div>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default UpdateVehicle
