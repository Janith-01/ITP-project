import React, { useEffect, useState } from "react";
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
        const reqOrderUrl = process.env.REACT_APP_BASE_URL + "/getAll";
        const response = await fetch(reqOrderUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (data.statusCode === 200) {
          setReqOrderList(data.data ?? []);
          setError("");
        } else {
          setReqOrderList([]);
          setError("Failed to fetch data");
        }
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchReqOrderList();
  }, []);

  return (
    <div>
      <div className="header"></div>
      <Sidebar selectedIndex={5} />
      <div className="content flex justify-center items-center">
        <div className="w-full">
          <div className="w-80 flex items-center justify-center">
            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && (
              <table>
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Requested Date</th>
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
