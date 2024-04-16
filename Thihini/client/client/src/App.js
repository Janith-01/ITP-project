import React, { useState, useEffect } from 'react';
import axios from "axios";
import { MdOutlineClose } from "react-icons/md";
import Formtable from './components/Formtable';

axios.defaults.baseURL = "http://localhost:3002"; // Corrected baseURL

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [keyword, setkeyword] = useState("");
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    email: "",
    address: "",
    mobile: "",
    userType: "",
  });
  const [formDataEdit, setFormDataEdit] = useState({
    userId: "",
    name: "",
    email: "",
    address: "",
    mobile: "",
    userType: "",
    _id: "",
    gender: ""
  });
  const [dataList, setDataList] = useState([]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user/add", formData); // Corrected endpoint
      if (response.status == 200) {
        setAddSection(false);
        alert(response.data.message);
        getFetchData();
      } else {
        console.error("Error adding user:", response.data.error);
        alert("Error adding user. Please check the server logs for details.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const getFetchData = async () => {
    try {
      const response = await axios.get("/user?keyword=" + keyword);
      // console.log("full response",response);
      // console.log("response Data",response.data);
      if (response.status === 200) {
        setDataList(response.data);
      } else {
        console.error("Error fetching data:", response.data.error);
        alert("Error fetching data. Please check the server logs for details.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("An error occurred while fetching data. Please try again later.");
    }
  };

  useEffect(() => {
    getFetchData();
  }, [keyword]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/user/delete/${id}`);
      if (response.data.status === "user deleted") {
        getFetchData();
        alert(response.data.status);
      } else {
        console.error("Error deleting user:", response.data.error);
        alert("Error deleting user. Please check the server logs for details.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting user. Please try again later.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let dataset = {
        name: formDataEdit.name,
        email: formDataEdit.email,
        address: formDataEdit.address,
        phoneNumber: formDataEdit.mobile,
        gender: formDataEdit.gender,
        userType: formDataEdit.userType
      }

      const response = await axios.put(`/user/update/${formDataEdit._id}`, dataset); // Corrected endpoint with _id
      if (response.status === 200) {
        getFetchData();
        alert(response.data.status);
        setEditSection(false);
      } else {
        console.error("Error updating user:", response.data.error);
        alert("Error updating user. Please check the server logs for details.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating user. Please try again later.");
    }
  };

  const handleEditOnChange = (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (el) => {
    setFormDataEdit({
      userId: el._id,
      name: el.name,
      email: el.email,
      address: el.address,
      mobile: el.phoneNumber,
      userType: el.userType,
      _id: el._id,
      gender: el.gender
    });
    setEditSection(true);
  };



  return (
    <div className="container">
      <button className="btn btn-add" onClick={() => setAddSection(true)}>Add</button>

      {addSection && (
        <div className="addContainer">
          <form onSubmit={handleSubmit}>
            <div className="close-btn" onClick={() => setAddSection(false)}><MdOutlineClose /></div>

            <label htmlFor="userId">User Id: </label>
            <input type="text" id="userId" name="userId" onChange={handleOnChange} />

            <label htmlFor="name">Name :</label>
            <input type="text" id="name" name="name" onChange={handleOnChange} />

            <label htmlFor="email">Email : </label>
            <input type="email" id="email" name="email" onChange={handleOnChange} />

            <label htmlFor="address">Address : </label>
            <input type="text" id="address" name="address" onChange={handleOnChange} />

            <label htmlFor="mobile">Phone : </label>
            <input type="text" id="mobile" name="mobile" onChange={handleOnChange} />

            <label htmlFor="userType">User Type : </label>
            <input type="text" id="userType" name="userType" onChange={handleOnChange} />

            <button className="btn" type="submit">Submit</button>
          </form>
        </div>
      )}

      <div>
        <input placeholder='Search keyword..' type="text" onChange={({ target }) => {
          setkeyword(target.value);

        }} value={keyword} />

      </div>

      <div className='tableContainer'>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>User Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataList.length > 0 ? (
              dataList.map((el, index) => (
                <tr key={el._id}>
                  <td>#{index + 1}</td>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.address}</td>
                  <td>{el.phoneNumber}</td>
                  <td>{el.userType}</td>
                  <td>
                    <button className='btn btn-edit' onClick={() => handleEdit(el)}>Edit</button>
                    <button className='btn btn-delete' onClick={() => handleDelete(el._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>No data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editSection && (
        <div className="addContainer">
          <form onSubmit={handleUpdate}>
            <div className="close-btn" onClick={() => setEditSection(false)}><MdOutlineClose /></div>

            <label htmlFor="name">Name :</label>
            <input type="text" id="name" name="name" value={formDataEdit.name} onChange={handleEditOnChange} />

            <label htmlFor="email">Email : </label>
            <input type="email" id="email" name="email" value={formDataEdit.email} onChange={handleEditOnChange} />

            <label htmlFor="address">Address : </label>
            <input type="text" id="address" name="address" value={formDataEdit.address} onChange={handleEditOnChange} />

            <label htmlFor="mobile">Phone : </label>
            <input type="text" id="mobile" name="mobile" value={formDataEdit.mobile} onChange={handleEditOnChange} />

            <label htmlFor="userType">User Type : </label>
            <input type="text" id="userType" name="userType" value={formDataEdit.userType} onChange={handleEditOnChange} />

            <button className="btn" type="submit">Submit</button>

          </form>
        </div>
      )}
    </div>
  );
}

export default App;
