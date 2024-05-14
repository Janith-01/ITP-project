import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./order.css"; 
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import InventoryNav from '../InventoryNav/InventoryNav'

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8083/reqorder/getAll");
      setOrders(response.data);
    };
    fetchData();
  }, []);

  // Generate report
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Stock Report",
    //onAfterPrint: () => alert("Stock Report Successfully Download!"),
    
  });

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:8083/reqorder/getAll");
      const filteredOrders = response.data.filter((order) =>
        Object.values(order).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setOrders(filteredOrders);
      setNoResults(filteredOrders.length === 0);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrder = async (orderID) => {
    try {
      await axios.delete(`http://localhost:8083/reqorder/delete/${orderID}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderID));
      toast.success("Order deleted successfully", { position: "top-right" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
       
        <div  className="order-background">
          <InventoryNav/>
          
        {noResults ? (
            <p>No Orders Found</p>
        ) : (
         
        <div className="reqOrderTable" ref={ComponentsRef}>
          <div className="ordertitle"> Request an Order </div>
          
          <Link to="/addorder" className="addButton-order no-print">
            Add Request an Order

          </Link>
          <input
            className="searchbox no-print"
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            placeholder="Search Request Order Details"
          />
          <button className="searchOrderButton no-print" onClick={handleSearch}>Search</button>

          <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Requested Date</th>
                <th>Status</th>
                <th className="actionButton no-print">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.Request_ID}</td>
                  <td>{order.Product_Name}</td>
                  <td>{order.Quantity}</td>
                  <td>{order.Requested_Date}</td>
                  <td>{order.Status}</td>
                  <td className="actionButton no-print">
                    <button onClick={() => deleteOrder(order._id)} className="deleteOrderButton">
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                    <Link to={`/editorder/${order._id}`} className="editOrderButton">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="generateOrderReport no-print">
            <button onClick={handlePrint}>Generate Report</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
