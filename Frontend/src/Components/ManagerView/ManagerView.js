import React from 'react'
import { Link } from 'react-router-dom';
import './ManagerView.css'

function ManagerView() {

  return (
    <div  className='container23'>
      {/* <h1>Manager View</h1> */}
      <Link to="/mainhome"> 
        <button> --Employee Dashboard-- </button>
      </Link>
      <Link to="/SalaryADisplay"> 
        <button> --Salary Details--</button>
      </Link>
      {/* <Link to="/EmployeeD"> 
        <button>--Employee Details--</button>
      </Link> */}
      {/* <Link to="/EmployeeDisplay"> 
        <button>  Employee Details</button>
      </Link> */}
      <Link to="/attendDisplay"> 
        <button>--Attend Details--</button>
      </Link>
      <Link to="/displayrequest"> 
        <button>--Leave Request--</button>
      </Link>
      <Link to="/dutyScheduleD"> 
        <button>--Duty Schedule-- </button>
      </Link>
      {/* <Link to="/NewEmp"> 
          <button >--Employee Details--</button>
        </Link> */}
        <Link to="/NewEmpDetails"> 
          <button >--Employee Details--</button>
        </Link>
    </div>
  )
}

export default ManagerView
