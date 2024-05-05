import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import logo from './logo1.png';
import Loader from '../Loader/Loader'; 

const StyledNavbar = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#333", 
  height: "100px", 
  padding: "5px",
});


const NavbarItem = styled("div")({
  padding: "0px",
  margin: "0 1rem 0",
  cursor: "pointer",
  color: "white", 
  fontSize: "22px", 
  "&:hover": {
    color: "#1565C0",
  },
});

function Navbar({ selectedIndex }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function navigateTo(path) {
    setIsLoading(true);
    navigate(path);
  }

  return (
    <StyledNavbar>
      {isLoading && <Loader />}
      <img className="logoo"src={logo} alt="Logo" style={{ height: "150px", marginLeft: "10px", marginRight: "250px"}} />
      <NavbarItem
        className={selectedIndex === 1 ? "active" : ""}
        onClick={() => navigateTo("/")}
      ><b>Overview</b>
      </NavbarItem>
      <NavbarItem
        className={selectedIndex === 3 ? "active" : ""}
        onClick={() => navigateTo("/viewincomes")}
      ><b>View Incomes</b>
        
      </NavbarItem>
      <NavbarItem
        className={selectedIndex === 5 ? "active" : ""}
        onClick={() => navigateTo("/viewexpenses")}
      ><b>View Expense</b>
        
      </NavbarItem>
    </StyledNavbar>
  );
}

export default Navbar;
