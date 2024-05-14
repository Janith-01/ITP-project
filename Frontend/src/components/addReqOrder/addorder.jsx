import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./add.css";
import toast from "react-hot-toast";

const AddOrder = () => {
  const initialOrder = {
    Request_ID: "",
    Product_Name: "",
    Quantity: 0,
    Requested_Date: new Date(),
    Status: "",
  };

  const [order, setOrder] = useState(initialOrder);
  const [validationMessages, setValidationMessages] = useState({});
  const navigate = useNavigate();

  const validateInput = (name, value) => {
    let message = "";
    switch (name) {
      case "Request_ID":
        if (!/^[a-zA-Z0-9]+$/.test(value)) {
          message = "Request ID should contain only alphanumeric characters.";
        }
        break;
      case "Product_Name":
        if (!/^[a-zA-Z ]+$/.test(value)) {
          message = "Product Name should contain only letters.";
        }
        break;
      case "Status":
        if (!/^[a-zA-Z ]+$/.test(value)) {
          message = "Status should contain only letters.";
        }
        break;
      default:
        break;
    }
    return message;
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    const validationMessage = validateInput(name, value);

    setValidationMessages({ ...validationMessages, [name]: validationMessage });
    setOrder({ ...order, [name]: value });
  };


 
  const submitForm = async (e) => {
    e.preventDefault();
    if (Object.values(validationMessages).some((msg) => msg !== "")) {
      toast.error("Please correct the errors in the form.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8083/reqorder/create", order);
      toast.success(response.data.msg, { position: "top-right" });
      navigate("/reqorder");
    } catch (error) {
      console.error(error);
      toast.error("Failed to place the order. Please try again.");
    }
  };

  return (
    <div className="addReqOrder">
      <Link to={"/reqorder"}>Back</Link>
      <h3>Request an order form</h3>
      <form className="placeOrderForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="Request_ID">Request ID</label>
          <input
            type="text"
            pattern="[a-zA-Z0-9]+"
            onChange={inputHandler}
            id="Request_ID"
            name="Request_ID"
            autoComplete="off"
            placeholder="Request ID"
            required
          />
          {validationMessages.Request_ID && (
            <div className="validationError">{validationMessages.Request_ID}</div>
          )}
        </div>

        <div className="inputGroup">
          <label htmlFor="Product_Name">Product Name</label>
          <input
            type="text"
            pattern="[a-zA-Z ]+"
            onChange={inputHandler}
            id="Product_Name"
            name="Product_Name"
            autoComplete="off"
            placeholder="Product Name"
            required
          />
          {validationMessages.Product_Name && (
            <div className="validationError">{validationMessages.Product_Name}</div>
          )}
        </div>

        <div className="inputGroup">
          <label htmlFor="Quantity">Quantity</label>
          <input
            type="number"
            min="0"
            onChange={inputHandler}
            id="Quantity"
            name="Quantity"
            autoComplete="off"
            placeholder="Quantity"
            required
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="Requested_Date">Requested Date</label>
          <input
            type="date"
            onChange={inputHandler}
            id="Requested_Date"
            name="Requested_Date"
            autoComplete="off"
            required
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="Status">Status</label>
          <input
            type="text"
            pattern="[a-zA-Z ]+"
            onChange={inputHandler}
            id="Status"
            name="Status"
            autoComplete="off"
            placeholder="Status"
            required
          />
          {validationMessages.Status && (
            <div className="validationError">{validationMessages.Status}</div>
          )}
        </div>

        <div className="inputGroup">
          <button type="submit">Place Order</button>
        </div>
      </form>
    </div>
  );
};

export default AddOrder;
