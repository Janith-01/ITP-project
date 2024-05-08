import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./addSale.css";

const AddSale = () => {
  const navigate = useNavigate();

  const [sale, setSale] = useState({
    productId: "",
    productName: "",
    category: "",
    quantitySold: 1,
    unitPrice: 1,
    dateSold: new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState({});

  const validateInput = (name, value) => {
    let error = "";
    if (name === "productId" && !/^[a-zA-Z0-9]+$/.test(value)) {
      error = "Product ID must contain only alphanumeric characters.";
    } else if (name === "productName" && !/^[a-zA-Z ]+$/.test(value)) {
      error = "Product Name must contain only letters and spaces.";
    } else if (name === "category" && !/^[a-zA-Z ]+$/.test(value)) {
      error = "Category must contain only letters and spaces.";
    } else if (name === "quantitySold" && parseInt(value) < 1) {
      error = "Quantity Sold must be at least 1.";
    } else if (name === "unitPrice" && parseInt(value) < 1) {
      error = "Unit Price must be at least 1.";
    }
    return error;
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "quantitySold" || name === "unitPrice" ? parseFloat(value) : value;

    const error = validateInput(name, value);
    setErrors({ ...errors, [name]: error });
    setSale({ ...sale, [name]: parsedValue });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      toast.error("Please correct the errors before submitting.", { position: "top-right" });
      return;
    }
    try {
      await axios.post("http://localhost:8000/Sale/add", sale);
      toast.success("Sale added successfully!", { position: "top-right" });
      navigate("/sales");
    } catch (error) {
      console.error("Error adding sale:", error);
      const errorMessage = error.response?.data?.message || "Failed to add sale.";
      toast.error(errorMessage, { position: "top-right" });
    }
  };

  return (
    <div className="addsalebackground">
      <div className="addSale">
        <Link to="/sales">Back</Link>
        <h3>Sales Form</h3>
        <form className="addSaleForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="productId">Product ID</label>
            <input
              type="text"
              onChange={inputHandler}
              id="productId"
              name="productId"
              placeholder="Product ID"
              required
            />
            {errors.productId && <span className="error">{errors.productId}</span>}
          </div>

          <div className="inputGroup">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              onChange={inputHandler}
              id="productName"
              name="productName"
              placeholder="Product Name"
              required
            />
            {errors.productName && <span className="error">{errors.productName}</span>}
          </div>

          <div className="inputGroup">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              onChange={inputHandler}
              id="category"
              name="category"
              placeholder="Category"
              required
            />
            {errors.category && <span className="error">{errors.category}</span>}
          </div>

          <div className="inputGroup">
            <label htmlFor="quantitySold">Quantity Sold</label>
            <input
              type="number"
              onChange={inputHandler}
              id="quantitySold"
              name="quantitySold"
              placeholder="Quantity Sold"
              required
              min={1}
            />
            {errors.quantitySold && <span className="error">{errors.quantitySold}</span>}
          </div>

          <div className="inputGroup">
            <label htmlFor="unitPrice">Unit Price</label>
            <input
              type="number"
              onChange={inputHandler}
              id="unitPrice"
              name="unitPrice"
              placeholder="Unit Price"
              required
              min={1}
            />
            {errors.unitPrice && <span className="error">{errors.unitPrice}</span>}
          </div>

          <div className="inputGroup">
            <label htmlFor="dateSold">Date Sold</label>
            <input
              type="date"
              onChange={inputHandler}
              id="dateSold"
              name="dateSold"
              required
              value={sale.dateSold}
            />
          </div>

          <div className="inputGroup">
            <button type="submit">Add Sales</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSale;
