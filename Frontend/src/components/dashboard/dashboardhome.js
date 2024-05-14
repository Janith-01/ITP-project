import React from "react";
import "../component.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar/sidebar";
function Dashboardhome() {
  const navigate = useNavigate();
  function navigateTo(path) {
    navigate(path);
  }
  return (
    <div>
      <div class="header"></div>
      <Sidebar selectedIndex={1} />
      <div class="content flex justify-center items-center">
        <h1>Welcome to the Garage management System</h1>
      </div>
    </div>
  );
}

export default Dashboardhome;
