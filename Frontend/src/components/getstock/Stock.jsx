//stock.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./stock.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useReactToPrint } from "react-to-print";
import Nav from "../Nav/Nav";

const Stock = () => {
  const [stocks, setStocks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [setNoResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api/getall");
      setStocks(response.data);
    };
    fetchData();
  }, []);

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Stock Report",
    //onAfterPrint:()=> console.log("Stock Report Successfully Download!"),
  });

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/getAll");
      const filteredStocks = response.data.filter((stock) =>
        Object.values(stock).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setStocks(filteredStocks);
      setNoResults(filteredStocks.length === 0);
    } catch (error) {
      console.log(error);
    }
  };

  /*const deleteStock = async (stockId) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete/${stockId}`);
      setStocks((prevStock) =>
        prevStock.filter((stock) => stock._id !== stockId)
      );
      toast.success("Stock deleted successfully", { position: "top-right" });
    } catch (error) {
      console.log(error);
    }
  };*/

  const deleteStock = async (stockId, productName) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete ${productName}?`,

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/delete/${stockId}`);
        setStocks((prevStock) =>
          prevStock.filter((stock) => stock._id !== stockId)
        );
        toast.success("Stock deleted successfully", { position: "top-right" });
      } catch (error) {
        console.log(error);
        toast.error("Error deleting stock");
      }
    } else {
      console.log("deleted");
    }
  };

  return (
    <div className="stock-background">
      <div className="searchDetails no-print">
        <Nav />

        <Link to={"/add"} className="addStockButton no-print">
          Add Stock
        </Link>
        <input
          className="searchField no-print"
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search Stock"
        />

        <button className="searchStockbutton no-print" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div ref={ComponentsRef} className="stockTable">
        <div className="titleStock">Stock Details</div>

        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Status</th>
              <th className="actionButton no-print">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr
                key={stock._id}
                className={`${stock.quantity <= 15 ? "low-stock" : ""} ${
                  stock.status === "out of stock" ? "out-of-stock" : ""
                }`}
              >
                <td>{stock.productId}</td>
                <td>{stock.productName}</td>
                <td>{stock.category}</td>
                <td>{stock.quantity}</td>
                <td>{stock.unitPrice}</td>
                <td>{stock.status}</td>
                <td className="actionButton no-print">
                  <button className="deleteStockButton"
                    onClick={() => deleteStock(stock._id, stock.productName)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>

                  <Link to={`/edit/${stock._id}`} className="editStockButton">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="generateStockReport no-print">
        <button onClick={handlePrint}>Generate Report</button>
      </div>
    </div>
  );
};

export default Stock;
