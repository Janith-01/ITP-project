import React from 'react';
import{Route,Routes} from "react-router";

import "./App.css";
import Home from "./Components/Home/Home";
import AddAppointment from "./Components/appointments/AddAppointment.js";
import UpApp from "./Components/appointments/UpdateAppointment.js";
import AllApp from "./Components/appointments/Appointments.js";




import Scheduale from "./Components/scheduale/scheduale.js";



function App() {
  return (
    
      <div>
       
        <React.Fragment>
        <Routes>
          
          {/* Add more routes as needed */}
          <Route path="/" element={<Home />} />
          <Route path="/mainhome" element={<Home />} />
          <Route path="/addapp" element={<AddAppointment />} />
          <Route path="/allapp" element={<AllApp />} />
          <Route path="/upapp/:id" element={<UpApp />} />





          <Route path="/scheduale" element={<Scheduale />} />
          
        </Routes>
        </React.Fragment>
      </div>
    
  );
}

export default App;
