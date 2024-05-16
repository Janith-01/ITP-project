import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../sidebar/sidebar.js";
import { toast } from 'react-hot-toast';
import './user.css'

const EditSupplierPage = () => {
  const { id } = useParams();

  const [supplier, setSupplier] = useState({
    name: "",
    contactNumber: "",
    emailAddress: "",
    supplyingGoods: ""
  });

  useEffect(() => {
    fetchSupplier();
  }, []);

  const fetchSupplier = async () => {
    try {
      const response = await axios.get(`http://localhost:8083/supplier/${id}`);
      setSupplier(response.data);
    } catch (error) {
      console.error("Error fetching supplier:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8083/supplier/${id}`, supplier);
      toast.success("Supplier updated successfully");
      // Go back to the previous page after saving
    } catch (error) {
      console.error("Error updating supplier:", error);
      toast.error("Error updating supplier");
    }
  };

  return (
    <div>
      <div className="header"></div>
      <Sidebar />
      <div className="content flex justify-center items-center">
        <div className="w-full">
          <div className="w-80 flex items-center justify-center">
            <div className="container">
              <h1 className="text-center mb-4">Edit Supplier</h1>
              <form>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={supplier.name}
                    onChange={handleInputChange}
                    className="input"
                  />
                </div>
                <div className="form-group">
                  <label>Contact Number:</label>
                  <input
                    type="text"
                    name="contactNumber"
                    value={supplier.contactNumber}
                    onChange={handleInputChange}
                    className="input"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address:</label>
                  <input
                    type="email"
                    name="emailAddress"
                    value={supplier.emailAddress}
                    onChange={handleInputChange}
                    className="input"
                  />
                </div>
                <div className="form-group">
                  <label>Supplying Goods:</label>
                  <input
                    type="text"
                    name="supplyingGoods"
                    value={supplier.supplyingGoods}
                    onChange={handleInputChange}
                    className="input"
                  />
                </div>
                <button type="button" onClick={handleSave} className="button">Save</button>
                <Link to="/dashboard/allsupp" className="button button-secondary">Back</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSupplierPage;
