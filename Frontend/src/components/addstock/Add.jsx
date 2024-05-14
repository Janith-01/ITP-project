/*import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./add.css";
import axios from "axios";
import toast from "react-hot-toast";
import Nav from "../Nav/Nav";

const Add = () => {
  const initialStock = {
    productId: "",
    productName: "",
    category: "",
    quantity: 0,
    unitPrice: 0,
  };

  const [stock, setStock] = useState(initialStock);
  const [highlight, setHighlight] = useState(false);
  const [idError, setIdError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;

    // Validation checks
    if (name === "productId" && /[^a-zA-Z0-9]/.test(value)) {
      setIdError(true); 
    } else {
      setIdError(false);
    }

    if (name === "productName" && /[^a-zA-Z ]/.test(value)) {
      setNameError(true); 
    } else {
      setNameError(false);
    }

    if (name === "category" && /[^a-zA-Z ]/.test(value)) {
      setCategoryError(true); 
    } else {
      setCategoryError(false);
    }

    if (name === "quantity" && (parseInt(value) <= 0)) {
      setQuantityError(true); 
      setHighlight(true); // Highlight low quantity
    } else {
      setQuantityError(false);
      setHighlight(false); 
    }

    if (name === "unitPrice" && (parseInt(value) <= 0)) {
      setPriceError(true); 
    } else {
      setPriceError(false);
    }

    setStock({ ...stock, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Validate before submission
    if (idError || nameError || categoryError || quantityError || priceError) {
      toast.error("Please fix the errors before submitting."); // Show generic error message
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/create", stock);
      toast.success(response.data.msg, { position: "top-right" });
      navigate("/getstock");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="addbackground">
      <div className={`addStock ${highlight ? "low-stock" : ""}`}>
        <Nav />
        <Link to={"/getstock"}>Back</Link>

        <h3>Add new stock</h3>
        <form className="addStockForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="productId">Product ID</label>
            <input
              type="text"
              pattern="[a-zA-Z0-9]+"
              title="Symbols are not allowed"
              onChange={inputHandler}
              id="productId"
              name="productId"
              autoComplete="off"
              placeholder="Product ID"
              required
            />
            {idError && (
              <span className="error-text">Symbols are not allowed in Product ID.</span>
            )}
          </div>

          <div className="inputGroup">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              pattern="[a-zA-Z ]+"
              onChange={inputHandler}
              id="productName"
              name="productName"
              autoComplete="off"
              placeholder="Product Name"
              required
            />
            {nameError && (
              <span className="error-text">Product Name should contain only letters and spaces.</span>
            )}
          </div>

          <div className="inputGroup">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              pattern="[a-zA-Z ]+"
              onChange={inputHandler}
              id="category"
              name="category"
              autoComplete="off"
              placeholder="Category"
              required
            />
            {categoryError && (
              <span className="error-text">Category should contain only letters and spaces.</span>
            )}
          </div>

          <div className="inputGroup">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              min="0"
              onChange={inputHandler}
              id="quantity"
              name="quantity"
              autoComplete="off"
              placeholder="Quantity"
              required
            />
            {quantityError && (
              <span className="error-text">Quantity must be greater than 0.</span>
            )}
          </div>

          <div className="inputGroup">
            <label htmlFor="unitPrice">Unit Price</label>
            <input
              type="number"
              min="0"
              onChange={inputHandler}
              id="unitPrice"
              name="unitPrice"
              autoComplete="off"
              placeholder="Unit Price"
              required
            />
            {priceError && (
              <span className="error-text">Unit Price must be greater than 0.</span>
            )}
          </div>

          <div className="inputGroup">
            <button type="submit">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;*/

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./add.css";
import axios from "axios";
import toast from "react-hot-toast";
import Nav from "../Nav/Nav";

const Add = () => {
  const initialStock = {
    productId: "",
    productName: "",
    category: "",
    quantity: 0,
    unitPrice: 0,
  };

  const [stock, setStock] = useState(initialStock);
  const [highlight, setHighlight] = useState(false);
  const [idError, /*setIdError*/] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;

    // Validation checks
    if (name === "productId") {
      const prefix = "PID";
      // Make sure the value starts with "PID" and the rest are numbers
      const withoutPrefix = value.replace(prefix, ""); // Get the non-prefixed part
      const numbersOnly = withoutPrefix.replace(/[^0-9]/g, ""); // Keep only numbers
      const fullId = prefix + numbersOnly; // Add "PID" prefix
      
      if (withoutPrefix.length === 0) {
        // User just clicked, add "PID" automatically
        setStock({ ...stock, productId: prefix });
      } else {
        setStock({ ...stock, productId: fullId });
      }
    } else {
      setStock({ ...stock, [name]: value });
    }

    if (name === "productName" && /[^a-zA-Z ]/.test(value)) {
      setNameError(true);
    } else {
      setNameError(false);
    }

    if (name === "category" && /[^a-zA-Z ]/.test(value)) {
      setCategoryError(true);
    } else {
      setCategoryError(false);
    }

    if (name === "quantity" && (parseInt(value) <= 0)) {
      setQuantityError(true);
      setHighlight(true); // Highlight low quantity
    } else {
      setQuantityError(false);
      setHighlight(false);
    }

    if (name === "unitPrice" && (parseInt(value) <= 0)) {
      setPriceError(true);
    } else {
      setPriceError(false);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Validate before submission
    if (idError || nameError || categoryError || quantityError || priceError) {
      toast.error("Please fix the errors before submitting."); // Show generic error message
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/create", stock);
      toast.success(response.data.msg, { position: "top-right" });
      navigate("/getstock");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="addstockbackground">
      <div className={`addStock ${highlight ? "low-stock" : ""}`}>
        <Nav />
        <Link to={"/getstock"}>Back</Link>

        <h3>Add new stock</h3>
        <form className="addStockForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="productId">Product ID</label>
            <input
              type="text"
              value={stock.productId}
              onChange={inputHandler}
              onFocus={() => {
                if (!stock.productId.startsWith("PID")) {
                  // Auto-fill PID if not there
                  setStock({ ...stock, productId: "PID" });
                }
              }}
              id="productId"
              name="productId"
              autoComplete="off"
              placeholder="Product ID"
              required
            />
            {idError && (
              <span className="error-text">Symbols are not allowed in Product ID.</span>
            )}
          </div>

          <div className="inputGroup">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              onChange={inputHandler}
              id="productName"
              name="productName"
              autoComplete="off"
              placeholder="Product Name"
              required
            />
            {nameError && (
              <span className="error-text">Product Name should contain only letters and spaces.</span>
            )}
          </div>

          <div className="inputGroup">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              onChange={inputHandler}
              id="category"
              name="category"
              autoComplete="off"
              placeholder="Category"
              required
            />
            {categoryError && (
              <span className="error-text">Category should contain only letters and spaces.</span>
            )}
          </div>

          <div className="inputGroup">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              min="0"
              onChange={inputHandler}
              id="quantity"
              name="quantity"
              autoComplete="off"
              placeholder="Quantity"
              required
            />
            {quantityError && (
              <span class="error-text">Quantity must be greater than 0.</span>
            )}
          </div>

          <div className="inputGroup">
            <label htmlFor="unitPrice">Unit Price</label>
            <input
              type="number"
              min="0"
              onChange={inputHandler}
              id="unitPrice"
              name="unitPrice"
              autoComplete="off"
              placeholder="Unit Price"
              required
            />
            {priceError && (
              <span className="error-text">Unit Price must be greater than 0.</span>
            )}
          </div>

          <div className="inputGroup">
            <button type="submit">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
