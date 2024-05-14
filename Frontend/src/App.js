import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import VehicleHome from "./Components/VehicleHome/VehicleHome";
import AddVehicle from "./Components/AddVehicle/AddVehicle";
import Vehicles from "./Components/VehicleDetails/Vehicles";
import UpdateVehicles from "./Components/UpdateVehicle/UpdateVehicle";
import AddServiceHistory from './Components/AddServiceHistory/AddServiceHistory';
import ServicesHistory from './Components/ServiceHistoryDetails/ServicesHistory';

//commit

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<VehicleHome/>}/>
          <Route path="/mainhome" element={<VehicleHome/>}/>
          <Route path="/addvehicle" element={<AddVehicle/>}/>
          <Route path="/vehicledetails" element={<Vehicles/>}/>
          <Route path="/vehicledetails/:id" element={<UpdateVehicles/>}/>
          <Route path="/addservicehistory" element={<AddServiceHistory/>}/>
          <Route path="/servicehistorydetails" element={<ServicesHistory/>}/>
          
          
        </Routes>
      </React.Fragment>
      
    </div>
  );
}

export default App;
