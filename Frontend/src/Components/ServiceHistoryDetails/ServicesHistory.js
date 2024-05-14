import React, { useEffect, useRef, useState } from 'react';
import VehicleNav from '../VehicleNav/VehicleNav';
//import "./ServiceHistoryDetails/serviceshistory.css"
import axios from "axios";
import ServiceHistory from '../ServiceHistory/ServiceHistory';
import { useReactToPrint } from "react-to-print";

const URL = "http://localhost:5000/serviceshistory";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function ServicesHistory() {
  const [serviceshistory, setServicesHistory] = useState([]);
  useEffect(() => {
    fetchHandler().then((data) => setServicesHistory(data.serviceshistory));
  }, []);

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Service History Details Report",
    onafterprint: () => alert("Service History Report Successfully Downloaded!"),
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredServicesHistory = data.serviceshistory.filter((servicehistory) =>
        Object.values(servicehistory).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setServicesHistory(filteredServicesHistory);
      setNoResults(filteredServicesHistory.length === 0);
    });
  };

  return (
    <div>
      <VehicleNav />
      <h1><center>Service History Details</center></h1>
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="search"
        placeholder="Search Service History Details"
      ></input>
      <button onClick={handleSearch}>Search</button>

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
                <th>Service Type</th>
                <th>Service Date</th>
                <th>Description</th>
                <th>Used Parts</th>
                <th>Service Cost</th>
                <th>Mechanic Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {serviceshistory.map((servicehistory, i) => (
                <ServiceHistory key={i} servicehistory={servicehistory} />
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button onClick={handlePrint}>Download Report</button>
    </div>
  );
}

export default ServicesHistory;



