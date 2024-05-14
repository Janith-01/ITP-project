import React from "react";
import logo from "./logo1.png";

const Header = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "20px",margin: "0" , backgroundColor: "#333", color: "white" }}>
      <img src={logo} alt="Tuskers Holdings Logo" style={{ width: "150px", height: "80px", marginRight: "30px", marginLeft: "150px", top: "50px" }} />
      <h1 style={{ margin: 0, fontSize: "24px" }}>Tuskers Holdings PVT(LTD)</h1>
    </div>
  );
};

export default Header;
