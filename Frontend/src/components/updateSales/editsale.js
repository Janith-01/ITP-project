import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../addSales/addSale.css";
import toast from "react-hot-toast";
import { format } from "date-fns";

const EditSale = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Initial state for the sale and for validation messages
  const initialSale = {
    productId: "",
    productName: "",
    category: "",
    quantitySold: 1,
    unitPrice: 1,
    dateSold: new Date().toISOString().split("T")[0],
  };

  const [sale, setSale] = useState(initialSale);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  // Fetch the existing sale data
  useEffect(() => {
    axios
      .get(`http://localhost:8083/Sale/getOne/${id}`)
      .then((response) => {
        response.data.dateSold = format(new Date(response.data.dateSold), "yyyy-MM-dd");
        setSale(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching sale:", error);
        setLoading(false);
      });
  }, [id]);

  const validateInput = (name, value) => {
    let error = "";

    if (name === "productId" && !/^[a-zA-Z0-9]+$/.test(value)) {
      error = "Symbol not allowed in Product ID.";
    } else if (name === "productName" && !/^[a-zA-Z ]+$/.test(value)) {
      error = "Invalid characters in Product Name.";
    } else if (name === "category" && !/^[a-zA-Z ]+$/.test(value)) {
      error = "Invalid characters in Category.";
    } else if (name === "quantitySold" && value < 1) {
      error = "Quantity Sold must be at least 1.";
    } else if (name === "unitPrice" && value < 1) {
      error = "Unit Price must be at least 1.";
    }

    return error;
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    const error = validateInput(name, value);
    
    setErrors({ ...errors, [name]: error });
    setSale({ ...sale, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Check for errors before submitting
    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      toast.error("Please fix the errors before submitting.", { position: "top-right" });
      return;
    }

    try {
      await axios.put(`http://localhost:8083/Sale/updateSale/${id}`, sale);
      toast.success("Sale updated successfully!", { position: "top-right" });
      navigate("/sales");
    } catch (error) {
      console.error("Error updating sale:", error);
      toast.error("Failed to update sale", { position: "top-right" });
    }
  };

  return (
    <div className="addsalebackground">
    <div className="addSale">
      <Link to="/sales">Back</Link>
      <h3>Update Sales Form</h3>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form className="addSaleForm" onSubmit={submitForm}>
          {/* Product ID */}
          <div className="inputGroup">
            <label htmlFor="productId">Product ID</label>
            <input
              type="text"
              pattern="[a-zA-Z0-9]+"
              title="Symbols not allowed"
              onChange={inputChangeHandler}
              id="productId"
              name="productId"
              value={sale.productId}
              required
            />
            {errors.productId && <p className="error">{errors.productId}</p>}
          </div>

          {/* Product Name */}
          <div className="inputGroup">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              pattern="[a-zA-Z ]+"
              onChange={inputChangeHandler}
              id="productName"
              name="productName"
              value={sale.productName}
              required
            />
            {errors.productName && <p className="error">{errors.productName}</p>}
          </div>

          {/* Category */}
          <div class="inputGroup">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              pattern="[a-zA-Z ]+"
              onChange={inputChangeHandler}
              id="category"
              name="category"
              value={sale.category}
              required
            />
            {errors.category && <p className="error">{errors.category}</p>}
          </div>

          {/* Quantity Sold */}
          <div class="inputGroup">
            <label htmlFor="quantitySold">Quantity Sold</label>
            <input
              type="number"
              onChange={inputChangeHandler}
              id="quantitySold"
              name="quantitySold"
              min={1}
              value={sale.quantitySold}
              required
            />
            {errors.quantitySold && <p className="error">{errors.quantitySold}</p>}
          </div>

          {/* Unit Price */}
          <div class="inputGroup">
            <label htmlFor="unitPrice">Unit Price</label>
            <input
              type="number"
              onChange={inputChangeHandler}
              id="unitPrice"
              name="unitPrice"
              min={1}
              value={sale.unitPrice}
              required
            />
            {errors.unitPrice && <p className="error">{errors.unitPrice}</p>}
          </div>

          {/* Date Sold */}
          <div class="inputGroup">
            <label htmlFor="dateSold">Date Sold</label>
            <input
              type="date"
              onChange={inputChangeHandler}
              id="dateSold"
              name="dateSold"
              value={sale.dateSold}
              required
            />
          </div>

          {/* Submit Button */}
          <div class="inputGroup">
            <button type="submit">Edit Sales</button>
          </div>
        </form>
      )}
    </div>
    </div>
  );
};

export default EditSale;
