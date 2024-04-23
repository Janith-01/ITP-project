import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../component.css";
import Sidebar from "../sidebar/sidebar.js";
import { toast } from 'react-hot-toast';


const ReqOrderPage = () => {
  const [reqOrders, setReqOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchReqOrders();
  }, []);

  const fetchReqOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8083/reqOrders');
      setReqOrders(response.data);
    } catch (error) {
      console.error('Error fetching reqOrders:', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:8083/reqOrder/${id}`, { Status: newStatus });
      toast.success('change Status');

      // Refresh page after status change
      fetchReqOrders();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredReqOrders = reqOrders.filter(reqOrder =>
    reqOrder.Request_ID.includes(searchTerm) ||
    reqOrder.Product_ID.includes(searchTerm) ||
    reqOrder.Product_Name.includes(searchTerm)
  );

  return (
    <div>
      <div className="header"></div>
      <Sidebar selectedIndex={5} />
      <div className="content flex justify-center items-center">
        <div className="w-full">
          <div className="w-80 flex items-center justify-center">
            <div className="container">
              <h1>ReqOrders</h1>
              <input
                type="text"
                placeholder="Search by Request ID, Product ID, or Product Name"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Requested Date</th>
                    <th>Status</th>
                    <th>Change Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReqOrders.map(reqOrder => (
                    <tr key={reqOrder._id}>
                      <td>{reqOrder.Request_ID}</td>
                      <td>{reqOrder.Product_ID}</td>
                      <td>{reqOrder.Product_Name}</td>
                      <td>{reqOrder.Quantity}</td>
                      <td>{reqOrder.Requested_Date}</td>
                      <td>{reqOrder.Status}</td>
                      <td>
                        <button className="btn btn-success" onClick={() => handleStatusChange(reqOrder._id, 'Approve')}>Approve</button>
                        <button className="btn btn-danger" onClick={() => handleStatusChange(reqOrder._id, 'Disapprove')}>Disapprove</button>
                        <button className="btn btn-warning" onClick={() => handleStatusChange(reqOrder._id, 'Pending')}>Pending</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReqOrderPage;
