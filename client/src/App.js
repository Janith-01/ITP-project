import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageNotFound from "./components/pagenotfound";
import Viewallusers from "./components/dashboard/user/viewallusers";
import Home from "./components/home";
import Customersignup from "./components/customersignup";
import Dashboardhome from "./components/dashboard/dashboardhome";
import { UserProvider } from "./components/provider/userprovider";
import Profile from "./components/dashboard/profile";
import Customerhome from "./components/customer/customerhome";
import SupplyManager from "./components/dashboard/user/supplymanager";

function App() {
  return (
    <main>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customersignin" element={<Customersignup />} />
            <Route path="/dashboard" element={<Dashboardhome />} />
            <Route path="/dashboard/users" element={<Viewallusers />} />
            <Route path="/dashboard/supplymanager" element={<SupplyManager />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/customer/home" element={<Customerhome />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </UserProvider>
    </main>
  );
}

export default App;
