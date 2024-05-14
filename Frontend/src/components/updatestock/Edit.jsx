import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";
import "../addstock/add.css";

const Edit = () => {
  const [stock, setStock] = useState({
    productId: "",
    productName: "",
    category: "",
    quantity: 0,
    unitPrice: 0
  });
  
  const [highlight, setHighlight] = useState(false); // Highlight state
  const [idError, setIdError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8083/api/getone/${id}`)
      .then((response) => {
        const data = response.data;
        setStock(data);

        if (data.quantity <= 15) {
          setHighlight(true);
        } else {
          setHighlight(false);
        }
      })
      .catch((error) => console.error(error));
  }, [id]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    // Check input validity
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

    if (name === "quantity" && parseInt(value) <= 0) {
      setQuantityError(true);
      setHighlight(true); // Highlight low stock
    } else {
      setQuantityError(false);
      setHighlight(false);
    }

    if (name === "unitPrice" && parseInt(value) <= 0) {
      setPriceError(true);
    } else {
      setPriceError(false);
    }

    setStock({ ...stock, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Check for errors before submission
    if (idError || nameError || categoryError || quantityError || priceError) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    try {
      await axios.put(`http://localhost:8083/api/update/${id}`, stock);
      toast.success("Stock updated successfully", { position: "top-right" });
      navigate("/getstock");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`addStock ${highlight ? "low-stock" : ""}`}>
      <Link to={"/getstock"}>Back</Link>
      <h3>Update Stock</h3>
      <form className="addStockForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="productId">Product ID</label>
          <input
            type="text"
            //pattern="[a-zA-Z0-9]+"
            value={stock.productId}
            onChange={inputChangeHandler}
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
            value={stock.productName}
            onChange={inputChangeHandler}
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
            value={stock.category}
            onChange={inputChangeHandler}
            id="category"
            name="category"
            autoComplete="off"
            placeholder="Category"
            required
          />
          {categoryError && (
            <span class="error-text">Category should contain only letters and spaces.</span>
          )}
        </div>

        <div className="inputGroup">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            min="0"
            value={stock.quantity}
            onChange={inputChangeHandler}
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
            value={stock.unitPrice}
            onChange={inputChangeHandler}
            id="unitPrice"
            name="unitPrice"
            autoComplete="off"
            placeholder="Unit Price"
            required
          />
          {priceError && (
            <span class="error-text">Unit Price must be greater than 0.</span>
          )}
        </div>

        <div className="inputGroup">
          <button type="submit">Update Product</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
