import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../addReqOrder/add.css";
import toast from "react-hot-toast";
import { format } from "date-fns";

const EditOrder = () => {
  const initialOrder = {
    Request_ID: "",
    Product_Name: "",
    Quantity: 0,
    Requested_Date: new Date(),
    Status: "",
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(initialOrder);
  const [validationMessages, setValidationMessages] = useState({});

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

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    const validationMessage = validateInput(name, value);
    setValidationMessages({ ...validationMessages, [name]: validationMessage });
    setOrder({ ...order, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8083/reqorder/getOne/${id}`)
      .then((response) => {
        response.data.Requested_Date = format(
          new Date(response.data.Requested_Date),
          "yyyy-MM-dd"
        );
        setOrder(response.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error loading order data.");
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    if (Object.values(validationMessages).some((msg) => msg !== "")) {
      toast.error("Please correct the errors in the form.");
      return;
    }

    try {
      await axios.put(`http://localhost:8083/reqorder/update/${id}`, order);
      toast.success("Order updated successfully", { position: "top-right" });
      navigate("/reqorder");
    } catch (error) {
      console.error(error);
      toast.error("Error updating order.");
    }
  };

  return (
    <div className="addreqBackground">
    <div className="addReqOrder">
      <Link to={"/reqorder"}>Back</Link>
      <h3>Edit Place Order Form</h3>
      <form className="placeOrderForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="Request_ID">Request ID</label>
          <input
            type="text"
            pattern="[a-zA-Z0-9]+"
            value={order.Request_ID}
            onChange={inputChangeHandler}
            id="Request_ID"
            name="Request_ID"
            autoComplete="off"
            placeholder="Request ID"
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
            title="Product Name should contain only letters"
            value={order.Product_Name}
            onChange={inputChangeHandler}
            id="Product_Name"
            name="Product_Name"
            autoComplete="off"
            placeholder="Product Name"
          />
          {validationMessages.Product_Name && (
            <div class="validationError">{validationMessages.Product_Name}</div>
          )}
        </div>

        <div className="inputGroup">
          <label htmlFor="Quantity">Quantity</label>
          <input
            type="number"
            min="0"
            value={order.Quantity}
            onChange={inputChangeHandler}
            id="Quantity"
            name="Quantity"
            autoComplete="off"
            placeholder="Quantity"
          />
        </div>

        <div class="inputGroup">
          <label htmlFor="Requested_Date">Requested Date</label>
          <input
            type="date"
            value={order.Requested_Date}
            disabled
            onChange={inputChangeHandler}
            id="Requested_Date"
            name="Requested_Date"
          />
        </div>

        <div class="inputGroup">
          <label htmlFor="Status">Status</label>
          <input
            type="text"
            pattern="[a-zA-Z ]+"
            value={order.Status}
            onChange={inputChangeHandler}
            id="Status"
            name="Status"
          />
          {validationMessages.Status && (
            <div class="validationError">{validationMessages.Status}</div>
          )}
        </div>

        <div class="inputGroup">
          <button type="submit">Edit Place Order</button>
        </div>
      </form>
    </div>

    </div>
  );
};

export default EditOrder;
