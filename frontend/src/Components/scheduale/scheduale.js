import React, { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import axios from "axios";
import appointment from '../appointments/Appointments';
const URL = "http://localhost:5000/users";
const fetchHandler= async () => {
    return await axios.get(URL).then((res) => res.data);
   };
function Scheduale() {
  const [appointments, setappointments] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) =>setappointments(data.users));
  }, []);

 

  return (
    <div>
      <Nav />
      <h1>Schedule</h1>
      <div>
        {appointments && appointments.map((user,i) =>(
            <div key={i}>
                <appointment appointment={appointment}/>
            </div>
        ))}
      </div>
      
    
    
    </div>
  );
}

export default Scheduale;
