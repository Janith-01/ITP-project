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
import AllSupp from "./components/dashboard/user/allSupp";
import AddSupp from "./components/dashboard/user/addsupp";
import SendMail from "./components/dashboard/user/SendMailPage.jsx";
import supedit from "./components/dashboard/user/EditSupplierPage.jsx"
import EditSupplierPage from "./components/dashboard/user/EditSupplierPage.jsx" // Ensure the correct path


import axios from 'axios';
import {Toaster} from 'react-hot-toast';

axios.defaults.baseURL = 'http://localhost:8083';
axios.defaults.withCredentials = true;




function App() {
  return (
    <main>
      <UserProvider>
        <Router>
        <Toaster position='top-center' toastOptions={{duration: 2000}}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customersignin" element={<Customersignup />} />
            <Route path="/dashboard" element={<Dashboardhome />} />
            <Route path="/dashboard/users" element={<Viewallusers />} />
            <Route path="/dashboard/supplymanager" element={<SupplyManager />} />
            <Route path="/dashboard/allsupp" element={<AllSupp />} />
            <Route path="/dashboard/allsupp/addsupp" element={<AddSupp />} />
            <Route path="/dashboard/allsupp/sendmail" element={<SendMail />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/customer/home" element={<Customerhome />} />
            <Route path={`/dashboard/allsupp/:id/edit`} element={<EditSupplierPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </UserProvider>
    </main>
  );
}

export default App;
