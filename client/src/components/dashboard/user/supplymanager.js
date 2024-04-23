import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../component.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../provider/userprovider.js";
import Sidebar from "../sidebar/sidebar.js";
import LoadingSpinner from "../../common/LoadingSpinner.js";
import ErrorMessage from "../../common/ErrorMessage.js";

function SupplyManager() {
  const { logUser } = useUser();
  const [reqOrderList, setReqOrderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReqOrderList = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/reqOrders');
        if (response.status === 200) {
          setReqOrderList(response.data.data || []);
          setError("");
        } else {
          setError("Failed to fetch data");
        }
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchReqOrderList();
  }, []);

  const handleApprove = async (reqOrderId) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/reqOrder/${reqOrderId}`,
        { status: "approved" }
      );
      if (response.status === 200) {
        setReqOrderList((prevOrders) =>
          prevOrders.map((order) =>
            order._id === reqOrderId ? { ...order, Status: "approved" } : order
          )
        );
      } else {
        throw new Error("Failed to approve request");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePending = async (reqOrderId) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/reqOrder/${reqOrderId}`,
        { status: "pending" }
      );
      if (response.status === 200) {
        setReqOrderList((prevOrders) =>
          prevOrders.map((order) =>
            order._id === reqOrderId ? { ...order, Status: "pending" } : order
          )
        );
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDisapprove = async (reqOrderId) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/reqOrder/${reqOrderId}`,
        { status: "disapproved" }
      );
      if (response.status === 200) {
        setReqOrderList((prevOrders) =>
          prevOrders.map((order) =>
            order._id === reqOrderId ? { ...order, Status: "disapproved" } : order
          )
        );
      } else {
        throw new Error("Failed to disapprove request");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="header"></div>
      <Sidebar selectedIndex={5} />
      <div className="content flex justify-center items-center">
        <div className="w-full">
          <div className="w-80 flex items-center justify-center">
            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && reqOrderList.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Requested Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reqOrderList.map((reqOrder) => (
                    <tr key={reqOrder._id}>
                      <td>{reqOrder.Request_ID}</td>
                      <td>{reqOrder.Product_ID}</td>
                      <td>{reqOrder.Product_Name}</td>
                      <td>{reqOrder.Quantity}</td>
                      <td>{reqOrder.Requested_Date}</td>
                      <td>{reqOrder.Status}</td>
                      <td>
                        <button onClick={() => handleApprove(reqOrder._id)}>Approve</button>
                        <button onClick={() => handlePending(reqOrder._id)}>Pending</button>
                        <button onClick={() => handleDisapprove(reqOrder._id)}>Disapprove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupplyManager;
