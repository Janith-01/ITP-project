import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageNotFound from "./components/pagenotfound";
import Viewallusers from "./components/dashboard/user/viewallusers";
import Home from "./components/home";
import Customersignup from "./components/customersignup";
import Dashboardhome from "./components/dashboard/dashboardhome";
import { UserProvider } from "./components/provider/userprovider";
import Profile from "./components/dashboard/profile";
import Customerhome from "./components/customer/customerhome";
import UserReport from "./components/report/userReport";
import SupplyManager from "./components/dashboard/user/supplymanager";
import AllSupp from "./components/dashboard/user/allSupp";
import AddSupp from "./components/dashboard/user/addsupp";
import SendMail from "./components/dashboard/user/SendMailPage.jsx";
import supedit from "./components/dashboard/user/EditSupplierPage.jsx"
import EditSupplierPage from "./components/dashboard/user/EditSupplierPage.jsx"
import VehicleHome from "./components/VehicleHome/VehicleHome.js";
import AddVehicle from "./components/AddVehicle/AddVehicle";
import Vehicles from "./components/VehicleDetails/Vehicles.js";
import UpdateVehicles from "./components/UpdateVehicle/UpdateVehicle";
import AddServiceHistory from './components/AddServiceHistory/AddServiceHistory';
import ServicesHistory from './components/ServiceHistoryDetails/ServicesHistory';
import HomeR from "./components/Home/home";
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

import HomeLinara from "./components/HomeLinara/Home";
// import AddNew from "./components/AddNew/AddUser";
// import Users from "./components/UserDetails/users"; 
// import UpdateUser from "./components/UpdateUser/UpdateUser";
import Applyleave from "./components/ApplyLeave/applyleave";
import LeaveRequest from "./components/LeaveRequest/leaverequest"
import LRequestdisplay from "./components/LRequestdisplay/lRequestDisplay"
import UpdateLeave from "./components/UpdateLeave/UpdateLeave";
import Attend from "./components/Attend/Attend";
import AttendDisplay  from "./components/AttendDisplay/AttendDisplay";
import DutySchedule  from "./components/DutySchedule/DutySchedule";
import DutySDisplay  from "./components/DutySDisplay/DutySDisplay";
import DutyUpdate from "./components/DutyUpdate/DutyUpdate";
import SalaryAdd from "./components/SalaryAdd/SalaryAdd";
import SalaryDisplay from "./components/SalaryADisplay/SalaryADisplay";
import UpdateSalary from "./components/SalaryUpdate/SalaryUpdate";
import EmployeeDetails from "./components/EmployeeAdd/EmployeeAdd";
import EmployeeD from "./components/EmployeeDisplay/EmployeeDisplay";
import SendPdf  from "./components/Pdf/Pdf";
//import DisplayPdf  from "./components/PdfDisplay/PdfDisplay";
import ManagerView  from "./components/ManagerView/ManagerView";
import NewEmp from "./components/NewEmp/NewEmp";
import NewEmpDetails from "./components/NewEmpDetails/NewEmpDetails";
import Autho from "./components/Authontication/Authontication";


import IncomeTable from './components/Income/IncomeTable';
import ExpenseForm from './components/Expenses/ExpenseForm';
import ExpenseTable from './components/Expenses/ExpenseTable';
import Overview from './components/Overview/Overview';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import HomeDulsara from './components/HomeDulsara/Home';
import AddAppointment from './components/appointments/AddAppointment';
import AllAppointments from './components/appointments/Appointments';
import UpdateAppointment from './components/appointments/UpdateAppointment';
import Scheduale from './components/scheduale/scheduale';






const router = createBrowserRouter([
  { path: "/", element: <Home /> },                                                         //thihini
  { path: "/customersignin", element: <Customersignup /> },
  { path: "/dashboard", element: <Dashboardhome /> },
  { path: "/dashboard/users", element: <Viewallusers /> },
  { path: "/dashboard/users/report", element: <UserReport /> },
  { path: "/dashboard/profile", element: <Profile /> },
  { path: "/customer/home", element: <Customerhome /> },
  { path: "/dashboard/supplymanager", element: <SupplyManager /> },                               //dulanjana
  { path: "/dashboard/allsupp", element: <AllSupp /> },
  { path: "/dashboard/allsupp/addsupp", element: <AddSupp /> },
  // { path: "/dashboard/allsupp/sendmail", element: <SendMail /> },
  { path: "/dashboard/profile", element: <Profile /> }, // This route seems repeated
  { path: "/customer/home", element: <Customerhome /> }, // This route seems repeated
  { path: "/dashboard/allsupp/:id/edit", element: <EditSupplierPage /> },


  { path: "/mainhomeh", element: <VehicleHome /> },
  { path: "/addvehicle", element: <AddVehicle /> },                                          // hashini
  { path: "/vehicledetails", element: <Vehicles /> },
  { path: "/vehicledetails/:id", element: <UpdateVehicles /> },
  { path: "/addservicehistory", element: <AddServiceHistory /> },
  { path: "/servicehistorydetails", element: <ServicesHistory /> },

  { path: "/mainhomer", element: <HomeR /> },                              //rismia           
  { path: "/getstock", element: <Stock /> },
  { path: "/add", element: <Add /> },
  { path: "/edit/:id", element: <Edit /> },
  { path: "/notification", element: <Notifications /> },
  { path: "/reqorder", element: <Order /> },
  { path: "/addorder", element: <AddOrder /> },
  { path: "/editorder/:id", element: <EditOrder /> },
  { path: "/sales", element: <Sales /> },
  { path: "/addsale", element: <AddSale/> },
  { path: "/updatesale/:id", element: <UpdateSale/> },
  { path: "/salesbymonth", element: <SalesByMonth /> },




  { path:"/mainhomeLinara" , element:<HomeLinara />} ,                    //linara
  {/* <Route path="/adduser" element={<AddNew />} />
  <Route path="/userdetails" element={<Users />} />
  <Route path="/userdetails/:_id" element={<UpdateUser/>} /> */},
  { path: "/applyleave", element: <Applyleave/> },
  { path: "/leaverequest", element: <LeaveRequest/> },
  { path: "/displayrequest", element: <LRequestdisplay/> },
  { path: "/displayrequest/:_id", element: <UpdateLeave />} ,
  { path: "/attend", element: <Attend /> },
  { path: "/attendDisplay", element: <AttendDisplay /> },
  { path: "/dutySchedule", element: <DutySchedule /> },
  { path: "/dutyScheduleD", element: <DutySDisplay /> },
  { path: "/dutyScheduleD/:_id", element: <DutyUpdate /> },
  { path: "/SalaryAdd", element: <SalaryAdd /> },
  { path: "/SalaryADisplay", element: <SalaryDisplay /> },
  { path: "/SalaryADisplay/:_id", element: <UpdateSalary /> },
  // { path: "/EmployeeD", element: <EmployeeDetails /> },      //errors
  // { path: "/EmployeeDisplay", element: <EmployeeD /> },
  { path: "/sendPdf", element: <SendPdf /> },
  { path: "/managerView", element: <ManagerView /> },
  { path: "/NewEmp", element: <NewEmp /> },
  { path: "/NewEmpDetails", element: <NewEmpDetails /> },
  { path: "/Autho", element: <Autho /> },

  { path: "/ExpenseForm", element: <ExpenseForm /> },
  { path: "/addexpense", element: <ExpenseForm /> },
  { path: "/viewincomes", element: <IncomeTable /> },
  { path: "/viewexpenses", element: <ExpenseTable /> },
  { path: "/Overview", element: <Overview /> },


  { path:"/HomeDulsara" ,element:<HomeDulsara />} ,
  {path:"/mainhome" , element:<Home />} ,
  {path:"/addapp", element:<AddAppointment />} ,
  {path:"/allapp" ,element:<AllAppointments />} ,
  {path:"/update-appointment/:id" ,element:<UpdateAppointment />} ,
  {path:"/scheduale" ,element:<Scheduale />} ,
 

  { path: "*", element: <PageNotFound /> }, // This is a catch-all route for any paths not matched above
]);


function App() {
  return (
    <main>
      <UserProvider>
        <RouterProvider router={router}></RouterProvider>
      </UserProvider>
    </main>
  );
}

export default App;
