import React, { useState } from "react";
import { Link } from "react-router-dom";
import './InventoryNav.css'


function Nav() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : "open"}`}>
      <div className="logo_details">
        <div className="logo_name"></div>
        <i className="bx bx-menu" id="btn" onClick={toggleSidebar}></i>
      </div>
      <ul className="nav-list">
       
        <li>
          <Link to="/mainhome">
            <i className="bx bx-grid-alt"></i>
            <span className="link_name">Home</span>
          </Link>
          <span className="tooltip">Home</span>
        </li>
        <li>
          <Link to="/getstock">
            <i className="bx bx-folder"></i>
            <span className="link_name">Manage Stock</span>
          </Link>
          <span className="tooltip">Manage Stock</span>
        </li>
        <li>
          <Link to="/reqorder">
            <i className="bx bx-cart-alt"></i>
            <span className="link_name">Request Order</span>
          </Link>
          <span className="tooltip">Request Order</span>
        </li>
        <li>
          <Link to="/sales">
            <i className="bx bx-pie-chart-alt-2"></i>
            <span className="link_name">Sales</span>
          </Link>
          <span className="tooltip">Sales</span>
        </li>
        <li>
          <Link to="/notification">
            <i className="bx bx-bell"></i>
            <span className="link_name">Notifications</span>
          </Link>
          <span className="tooltip">Notifications</span>
        </li>

        <li>
          <Link to="/salesbymonth">
            <i className="bx bx-dollar"></i>
            <span className="link_name">Monthly Sales</span>
          </Link>
          <span className="tooltip">Monthly Sales</span>
        </li>
      </ul>
      <li className="profile">
        <div className="profile_details">
        <img src="/user1.jpg" alt="Anna John's profile" />


          <div className="profile_content">
            <div className="name">Rizmia Mansoor</div>
            <div className="designation">Inventory Manager</div>
          </div>
        </div>
        <i className="bx bx-log-out" id="log_out"></i>
      </li>
    </div>
  );
}

export default Nav;
