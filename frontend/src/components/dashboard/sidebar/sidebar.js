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
        onClick={() => navigateTo("/dashboard")}
      >
        Employees
      </div>
      <div
        className={`sidebar-item  ${selectedIndex == 3 && "active"}`}
        onClick={() => navigateTo("/dashboard")}
      >
        Jub Cards
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
    </div>
  );
}

export default Sidebar;
