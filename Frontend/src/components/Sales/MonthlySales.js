import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import "./MonthlySales.css";
import InventoryNav from '../InventoryNav/InventoryNav'

const SalesByMonth = () => {
  const [salesData, setSalesData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const fetchSalesByMonth = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8000/Sale/getSalesByMonth", {
        params: { year, month },
      });
      setSalesData(response.data.sales);
      setTotalSales(response.data.totalSales);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  }, [year, month]);

  useEffect(() => {
    fetchSalesByMonth();
  }, [fetchSalesByMonth]);

  const reportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
    documentTitle: `Sales Report for ${month}/${year}`,
    //onAfterPrint: () => alert("Sales report successfully downloaded!"),
  });

  return (
    <div className="sales-by-month">
     <InventoryNav/>
      <Link className="back-link no-print" to="/mainhome">Back</Link>
      <div className="printable-content" ref={reportRef}>

      <h2 className="sales-title">Sales Data for {month}/{year}</h2>
      <div className="date-inputs">
        <input
          className="year-input no-print"
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Year"
        />
        <input
          className="month-input no-print"
          type="number"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          placeholder="Month"
        />
        <button className="fetch-button no-print" onClick={fetchSalesByMonth}>
          Fetch Sales
        </button>
        <button className="print-button no-print" onClick={handlePrint}>
          Print Report
        </button>
      </div>

      <h3 className="total-sales">Total Sales: LKR: {totalSales.toFixed(2)}</h3>

     
        <table className="sales-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Quantity Sold</th>
              <th>Unit Price</th>
              <th>Date Sold</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale) => (
              <tr key={sale._id}>
                <td>{sale.productId}</td>
                <td>{sale.productName}</td>
                <td>{sale.category}</td>
                <td>{sale.quantitySold}</td>
                <td>{sale.unitPrice}</td>
                <td>{sale.dateSold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesByMonth;
