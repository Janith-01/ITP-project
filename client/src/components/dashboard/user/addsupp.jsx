import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/sidebar.js";
import { toast } from 'react-hot-toast';

const AddSupplierForm = () => {
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [supplyingGoods, setSupplyingGoods] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8083/supplier", {
        name,
        contactNumber,
        emailAddress,
        supplyingGoods,
      });
      // Redirect to supplier page after adding supplier
      toast.success('Supplier Added Succsesfully');
      navigate("/suppliers");

    } catch (error) {
      console.error("Error adding supplier:", error);
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
              <h1>Add Supplier</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Contact Number:</label>
                  <input
                    type="text"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address:</label>
                  <input
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Supplying Goods:</label>
                  <input
                    type="text"
                    value={supplyingGoods}
                    onChange={(e) => setSupplyingGoods(e.target.value)}
                  />
                </div>
                <button type="submit">Add Supplier</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSupplierForm;
