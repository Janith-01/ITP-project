import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./Components/Home/Home";
// import AddNew from "./Components/AddNew/AddUser";
// import Users from "./Components/UserDetails/users"; 
// import UpdateUser from "./Components/UpdateUser/UpdateUser";
import Applyleave from "./Components/ApplyLeave/applyleave";
import LeaveRequest from "./Components/LeaveRequest/leaverequest"
import LRequestdisplay from "./Components/LRequestdisplay/lRequestDisplay"
import UpdateLeave from "./Components/UpdateLeave/UpdateLeave";
import Attend from "./Components/Attend/Attend";
import AttendDisplay  from "./Components/AttendDisplay/AttendDisplay";
import DutySchedule  from "./Components/DutySchedule/DutySchedule";
import DutySDisplay  from "./Components/DutySDisplay/DutySDisplay";
import DutyUpdate from "./Components/DutyUpdate/DutyUpdate";
import SalaryAdd from "./Components/SalaryAdd/SalaryAdd";
import SalaryDisplay from "./Components/SalaryADisplay/SalaryADisplay";
import UpdateSalary from "./Components/SalaryUpdate/SalaryUpdate";
import EmployeeDetails from "./Components/EmployeeAdd/EmployeeAdd";
import EmployeeD from "./Components/EmployeeDisplay/EmployeeDisplay";
import SendPdf  from "./Components/Pdf/Pdf";
//import DisplayPdf  from "./Components/PdfDisplay/PdfDisplay";
import ManagerView  from "./Components/ManagerView/ManagerView";
import NewEmp from "./Components/NewEmp/NewEmp";
import NewEmpDetails from "./Components/NewEmpDetails/NewEmpDetails";
import Autho from "./Components/Authontication/Authontication";

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mainhome" element={<Home />} />
          {/* <Route path="/adduser" element={<AddNew />} />
          <Route path="/userdetails" element={<Users />} />
          <Route path="/userdetails/:_id" element={<UpdateUser/>} /> */}
          <Route path="/applyleave" element={<Applyleave/>} />
          <Route path="/leaverequest" element={<LeaveRequest/>} />
          <Route path="/displayrequest" element={<LRequestdisplay/>} />
          <Route path="/displayrequest/:_id" element={<UpdateLeave />} />
          <Route path="/attend" element={<Attend />} />
          <Route path="/attendDisplay" element={<AttendDisplay />} />
          <Route path="/dutySchedule" element={<DutySchedule />} />
          <Route path="/dutyScheduleD" element={<DutySDisplay />} />
          <Route path="/dutyScheduleD/:_id" element={<DutyUpdate />} />
          <Route path="/SalaryAdd" element={<SalaryAdd />} />
          <Route path="/SalaryADisplay" element={<SalaryDisplay />} />
          <Route path="/SalaryADisplay/:_id" element={<UpdateSalary />} />
          <Route path="/EmployeeD" element={<EmployeeDetails />} />
          <Route path="/EmployeeDisplay" element={<EmployeeD />} />
          <Route path="/sendPdf" element={<SendPdf />} />
          {/* <Route path="/displayPdf" element={<DisplayPdf />} /> */}
          <Route path="/managerView" element={<ManagerView />} />
          <Route path="/NewEmp" element={<NewEmp />} />
          <Route path="/NewEmpDetails" element={<NewEmpDetails />} />
          <Route path="/Autho" element={<Autho />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
