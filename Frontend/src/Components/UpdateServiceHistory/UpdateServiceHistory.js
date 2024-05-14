import React, {useEffect, useState} from 'react'
import VehicleNav from '../VehicleNav/VehicleNav';
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import "../UpdateServiceHistory/UpdateServiceHistory.css";


function UpdateServiceHistory() {

    const [inputs, setInputs] = useState({});
    const history = useNavigate();
    const id = useParams().id;

    useEffect(()=>{
        const fetchHandler = async ()=>{
            await axios
            .get(`http://localhost:5000/serviceshistory/${id}`)
            .then((res)=> res.data)
            .then((data)=> setInputs(data.servicehistory));
        };
        fetchHandler();
    },[id]);

    const sendRequest = async ()=>{
        await axios
        .put(`http://localhost:5000/serviceshistory/${id}`,{
            vin: String(inputs.vin),
            type: String(inputs.type),
            date: Date(inputs.date),
            description: String(inputs.description),
            parts: String(inputs.parts),
            cost: Number(inputs.cost),
            macanic: String(inputs.macanic),
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
        history('/servicehistorydetails'));
      };

  return (
    <div>
      <VehicleNav />
      <h1><center>Update Service History</center></h1>
      <form className='updateServiceHistory' onSubmit={handleSubmit}>
        <div className='inputGroup'>
        <label>Vehicle Identification Number(VIN)</label>
        <input type="text" pattern="[a-zA-Z0-9]{17}" title='Enter 17 characters only. Space not Allowd' name="vin" onChange={handleChange} value={inputs.vin} required></input>
        </div>
        <div className='inputGroup'>
        <label>Service Type</label>
        <input type="text" pattern="[a-zA-Z0-9 ]+" name="type" onChange={handleChange} value={inputs.type} required></input>
        </div>
        <div className='inputGroup'>
        <label>Service Date</label>
        <input type="date" name="date" onChange={handleChange} value={inputs.date} required></input>
        </div>
        <div className='inputGroup'>
        <label>Description</label>
        <input type="text"  name="description" onChange={handleChange} value={inputs.description} required></input>
        </div>
        <div className='inputGroup'>
        <label>Used Parts</label>
        <input type="text" pattern="[a-zA-Z0-9 ]+" name="parts" onChange={handleChange} value={inputs.parts} required></input>
        </div>
        <div className='inputGroup'>
        <label>Service Cost</label>
        <input type="text"  name="cost" onChange={handleChange} value={inputs.cost} required></input>
        </div>
        <div className='inputGroup'>
        <label>Machanic Name</label>
        <input type="text" pattern="[a-zA-Z0-9 ]+" name="macanic" onChange={handleChange} value={inputs.macanic} required></input>
        </div>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default UpdateServiceHistory
