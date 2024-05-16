import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  MonetizationOn as IncomeIcon,
  MoneyOff as ExpenseIcon,
  AddCircle as AddExpenseIcon,
  Assessment as ReportIcon,
} from "@mui/icons-material";

function Sidebar({ selectedIndex }) {
  const navigate = useNavigate();

  function navigateTo(path) {
    navigate(path);
  }

  return (
    <div style={{ width: "200px", height: "100vh", backgroundColor: "#333", color: "#fff", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
      <div>
        <div
          className={`sidebar-item ${selectedIndex === 1 && "active"}`}
          onClick={() => navigateTo("/overview")}
          style={{ cursor: "pointer",marginTop: "150px", marginBottom: "40px", display: "flex", alignItems: "flex-start" }}
        >
          <HomeIcon style={{ marginRight: "10px" }} />
          Overview
        </div>
        <div
          className={`sidebar-item ${selectedIndex === 2 && "active"}`}
          onClick={() => navigateTo("/viewincomes")}
          style={{ cursor: "pointer", marginBottom: "40px", display: "flex", alignItems: "center" }}
        >
          <IncomeIcon style={{ marginRight: "10px" }} />
          Incomes
        </div>
        <div
          className={`sidebar-item ${selectedIndex === 3 && "active"}`}
          onClick={() => navigateTo("/viewexpenses")}
          style={{ cursor: "pointer", marginBottom: "40px", display: "flex", alignItems: "center" }}
        >
          <ExpenseIcon style={{ marginRight: "10px" }} />
          Expenses
        </div>
        <div
          className={`sidebar-item ${selectedIndex === 4 && "active"}`}
          onClick={() => navigateTo("/addexpense")}
          style={{ cursor: "pointer", marginBottom: "40px", display: "flex", alignItems: "center" }}
        >
          <AddExpenseIcon style={{ marginRight: "10px" }} />
          Extra Expenses
        </div>
        <div
          className={`sidebar-item ${selectedIndex === 7 && "active"}`}
          onClick={() => navigateTo("/")}
          style={{ cursor: "pointer", marginBottom: "40px", display: "flex", alignItems: "center" }}
        >
          <ReportIcon style={{ marginRight: "10px" }} />
          Report
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

