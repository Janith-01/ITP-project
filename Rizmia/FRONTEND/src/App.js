import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/Home/home";
import Stock from './components/getstock/Stock';
import Add from './components/addstock/Add';
import Edit from './components/updatestock/Edit';
import Notifications from './components/notification/notification';
import Order from './components/getReqOrder/Order';
import AddOrder from './components/addReqOrder/addorder';
import EditOrder from './components/updateReqOrder/edit';
import Sales from './components/Sales/Sales';
import AddSale from "./components/addSales/addSale";
import UpdateSale from "./components/updateSales/editsale";
import SalesByMonth from "./components/Sales/MonthlySales";



function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mainhome" element={<Home />} />
          <Route path="/getstock" element={<Stock />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/notification" element={<Notifications />} />
          <Route path="/reqorder" element={<Order />} />
          <Route path="/addorder" element={<AddOrder />} /> 
          <Route path="/editorder/:id" element={<EditOrder />} />
          <Route path="/sales" element={<Sales />} /> 
          <Route path="/addsale" element={<AddSale/>}/>
          <Route path="/updatesale/:id" element ={<UpdateSale/>}/>
          <Route path="/salesbymonth" element={<SalesByMonth />} /> 
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
