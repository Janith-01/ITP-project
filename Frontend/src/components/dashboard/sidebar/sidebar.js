import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({ selectedIndex }) {
  const navigate = useNavigate();
  function navigateTo(path) {
    navigate(path);
  }
  return (
    <div className="sidebar">
      <div
        className={`sidebar-item  ${selectedIndex == 1 && "active"}`}
        onClick={() => navigateTo("/dashboard")}
      >
        Home
      </div>
      <div
        className={`sidebar-item  ${selectedIndex == 2 && "active"}`}
        onClick={() => navigateTo("/mainhomeLinara")}
      >
        Employees linara
      </div>
      <div
        className={`sidebar-item  ${selectedIndex == 3 && "active"}`}
        onClick={() => navigateTo("/mainhomer")}
      >
        Inventory Risma
      </div>
      <div
        className={`sidebar-item  ${selectedIndex == 4 && "active"}`}
        onClick={() => navigateTo("/dashboard")}
      >
        Feedbacks
      </div>
      <div
        className={`sidebar-item ${selectedIndex == 5 && "active"}`}
        onClick={() => navigateTo("/dashboard/users")}
      >
        Users
      </div>
      <div
        className={`sidebar-item ${selectedIndex == 6 && "active"}`}
        onClick={() => navigateTo("/dashboard/profile")}
      >
        Profile
      </div>
      <div
        className={`sidebar-item ${selectedIndex == 7 && "active"}`}
        onClick={() => navigateTo("/dashboard/users/report")}
      >
        Report
      </div>

      <div
        className={`sidebar-item ${selectedIndex == 6 && "active"}`}
        onClick={() => navigateTo("/dashboard/supplymanager")}
      >
        Supply Management
      </div>

      <div
        className={`sidebar-item ${selectedIndex == 7 && "active"}`}
        onClick={() => navigateTo("/dashboard/allsupp")}
      >
        View Suplliers
      </div>
      <div
        className={`sidebar-item ${selectedIndex == 7 && "active"}`}
        onClick={() => navigateTo("/Overview")}
      >
        ViVe Janth1
      </div><div
        className={`sidebar-item ${selectedIndex == 7 && "active"}`}
        onClick={() => navigateTo("/HomeDulsara")}
      >
        ViVe Janth2
      </div><div
        className={`sidebar-item ${selectedIndex == 7 && "active"}`}
        onClick={() => navigateTo("/dashboard/allsupp")}
      >
        ViVe Janth3
      </div>

    </div>
  );
}

export default Sidebar;
