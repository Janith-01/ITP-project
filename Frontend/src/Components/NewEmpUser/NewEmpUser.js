import React from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import './NewEmpUser.css';


function NewEmpUser(props) {
    const {_id,name,gmail,jobRole,Eid} = props.user;

const history = useNavigate();

    const deleteHandler = async() => {
      await axios.delete(`http://localhost:5000/NewEmp/${_id}`)
      .then(res=>res.data)
      .then(() => history("/"))
      .then(() => history("/NewEmpDetails"))
    }


  return (
    <tr>
      <td>{_id}</td>
      <td>{name}</td>
      <td>{gmail}</td>
      <td>{jobRole}</td>
      <td> {Eid}</td>
      <td>
      <div >
      <button onClick={deleteHandler} className='DeleteNew'> Delete</button>
      </div>
      </td>
      </tr>
  )
}

export default NewEmpUser

