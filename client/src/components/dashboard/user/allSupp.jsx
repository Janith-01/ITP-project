import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/sidebar.js";
import { toast } from 'react-hot-toast';

const SupplierPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("http://localhost:8083/suppliers");
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleRemoveSupplier = async (id) => {
    if (window.confirm("Are you sure you want to remove this supplier?")) {
      try {
        await axios.delete(`http://localhost:8083/supplier/${id}`);
        toast.success('Supplier remove Succsesfully');
        // Refresh page after removing supplier
        fetchSuppliers();

      } catch (error) {
        console.error("Error removing supplier:", error);
      }
    }
  };

  const handleSendMail = (email) => {
    // Logic to send email
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.supplyingGoods.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="header"></div>
      <Sidebar />
      <div className="content flex justify-center items-center">
        <div className="w-full">
          <div className="w-80 flex items-center justify-center">
            <div className="container">
              <h1>Suppliers</h1>
              <input
                type="text"
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Contact Number</th>
                    <th>Email Address</th>
                    <th>Supplying Goods</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSuppliers.map((supplier) => (
                    <tr key={supplier._id}>
                      <td>{supplier.name}</td>
                      <td>{supplier.contactNumber}</td>
                      <td>{supplier.emailAddress}</td>
                      <td>{supplier.supplyingGoods}</td>
                      <td>
                        <button onClick={() => handleSendMail(supplier.emailAddress)}>
                          Send Mail
                        </button>
                        <button onClick={() => handleRemoveSupplier(supplier._id)}>
                          Remove Supplier
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={() => navigate("/dashboard/allsupp/addsupp")}>Add Supplier</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierPage;
