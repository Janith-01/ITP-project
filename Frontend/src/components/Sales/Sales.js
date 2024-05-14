import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./sale.css";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useReactToPrint } from "react-to-print";
import InventoryNav from '../InventoryNav/InventoryNav'

const Sale = () => {
  const [sales, setSales] = useState([]);
  //serach
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8083/Sale/getAll");
      setSales(response.data);
    };
    fetchData();
  }, []);

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Stock Report",
    //onAfterPrint: () => alert("Stock Report Successfully Download!"),
  });

  //search
  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:8083/Sale/getAll");
      const filteredSales = response.data.filter((sale) =>
        Object.values(sale).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setSales(filteredSales);
      setNoResults(filteredSales.length === 0);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSale = async (saleId) => {
    try {
      await axios.delete(`http://localhost:8083/Sale/deleteSale/${saleId}`);
      setSales((prevStock) =>
        prevStock.filter((sale) => sale._id !== saleId)
      );
      toast.success("Sales record deleted successfully", { position: "top-right" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="saleBackground">
    <div className="sale-table"> 
    <div className="searchSaleDetails no-print">
      <InventoryNav/>
      {noResults ? (
        <p>No Sales Found</p>
      ) : (
        <div ref={ComponentsRef} className="salesTable">
           <div className="Saletitle">Sale Details</div>
          <Link to={"/addsale"} className="addSaleButton no-print">
            Add Sale 
          </Link>
          <input
            className="searchSaleField no-print"
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            placeholder="Search Sale"
          />

          <button className="searchSalebutton no-print" onClick={handleSearch}>
            Search
          </button>
          <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Quantity Sold</th>
                <th>Unit Price</th>
                <th>Total Sales</th> {/* New column */}
                <th>Date Sold</th>
                <th className="actionSaleButton no-print">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale, index) => (
                <tr
                  key={sale._id}
                 
                >
                  <td>{sale.productId}</td>
                  <td>{sale.productName}</td>
                  <td>{sale.category}</td>
                  <td>{sale.quantitySold}</td>
                  <td>{sale.unitPrice}</td>
                  <td>{sale.totalSales}</td> {/* Display calculated total sales */}
                  <td>{sale.dateSold}</td>
                 
                  <td className="actionSaleButton no-print">
                    <button onClick={() => deleteSale(sale._id)} className="deleteSaleButton"> 
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <Link to={`/updateSale/${sale._id}`} className="editSaleButton">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="generateSaleReport no-print">
            <button onClick={handlePrint}>Generate Report</button>
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default Sale;
