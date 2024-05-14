import React, { useEffect, useRef, useState } from 'react';
import VehicleNav from '../VehicleNav/VehicleNav';
import axios from "axios";
import Vehicle from '../Vehicle/Vehicle';
import { useReactToPrint } from "react-to-print";

const URL = "http://localhost:5000/vehicles";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    fetchHandler().then((data) => setVehicles(data.vehicles));
  }, []);

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Vehicle Details Report",
    onafterprint: () => alert("Vehicles Report Successfully Downloaded!"),
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredVehicles = data.vehicles.filter((vehicle) =>
        Object.values(vehicle).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setVehicles(filteredVehicles);
      setNoResults(filteredVehicles.length === 0);
    });
  };

  return (
    <div>
      <VehicleNav />
      <h1><center>Vehicle Details</center></h1>
      <input
        className='Searchbutton'
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="search"
        placeholder="Search Vehicles Details"
      ></input>
      <br></br>
      <br></br>
      <button onClick={handleSearch}>Search</button>
      <br></br>
      <br></br>
      {noResults ? (
        <div>
          <p>No Vehicles Found</p>
        </div>
      ) : (
        <div ref={ComponentsRef}>
          <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
              <tr>
                <th>ID</th>
                <th>VIN</th>
                <th>Reg.No</th>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Owner Name</th>
                <th>Owner NIC</th>
                <th>Owner Email</th>
                <th>Owner Address</th>
                <th>Contact Number</th>
                <th className='action no-print'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle, i) => (
                <Vehicle key={i} vehicle={vehicle} />
              ))}
            </tbody>
          </table>
        </div>
      )}
      <br></br>
      <br></br>
      <div className='dButton'>
      <button onClick={handlePrint}>Download Report</button>
      </div>
    </div>
  );
}

export default Vehicles;



