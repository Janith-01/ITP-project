// // EmployeeAdd.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";

// function EmployeeAdd() {
//   const history = useNavigate();
//   const [user, setUser] = useState({
//     name: "",
//     Eid: "",
//     gender: "",
//     age: 0,
//     phone: "",
//     Email: "",
//     Ps: null, // Changed to null
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prevUser) => ({ ...prevUser, [name]: value }));
//   };

//   const handleFileInputChange = (e) => {
//     const file = e.target.files[0];
//     setUser((prevUser) => ({ ...prevUser, Ps: file }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const formData = new FormData();
//     formData.append('name', user.name);
//     formData.append('Eid', user.Eid);
//     formData.append('gender', user.gender);
//     formData.append('age', user.age);
//     formData.append('phone', user.phone);
//     formData.append('Email', user.Email);
//     formData.append('Ps', user.Ps); // Append the file data
  
//     sendRequest(formData)
//       .then(() => {
//         alert("Submit Success");
//         history("/EmployeeDisplay");
//       })
//       .catch((err) => {
//         alert(err.message);
//       });
//   };

//   const sendRequest = async (data) => {
//     await axios.post("http://localhost:5000/Employeeadd", data)
//       .then((res) => res.data);
//   };

//   return (
//     <div>
//       <h1>Add New Employee</h1>
//       <form onSubmit={handleSubmit}>

//         <label>Name</label><br></br>
//         <input type='text' value={user.name} onChange={handleInputChange} name='name' required></input><br></br><br></br>
//         <label>Employee ID</label><br></br>
//         <input type='text' value={user.Eid} onChange={handleInputChange} name='Eid' required></input><br></br><br></br>
//         <label>Gender</label><br></br>
//         <input type='text' value={user.gender} onChange={handleInputChange} name='gender' required></input><br></br><br></br>
//         <label>Age</label><br></br>
//         <input type='number' value={user.age} onChange={handleInputChange} name='age' required></input><br></br><br></br>
//         <label>Phone</label><br></br>
//         <input type='tel' value={user.phone} onChange={handleInputChange} name='phone' required></input><br></br><br></br>
//         <label>Email</label><br></br>
//         <input type='email' value={user.Email} onChange={handleInputChange} name='Email' required></input><br></br><br></br>
//         <label>Professional Skills</label><br></br>
//         <input type='file' onChange={handleFileInputChange} name='Ps' required></input><br></br><br></br>
//         <button>Submit</button>
//       </form>
//     </div>
//   );
// }

// export default EmployeeAdd;