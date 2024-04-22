import React, { useEffect, useState } from "react";
import "../../component.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../provider/userprovider.js";
import Sidebar from "../sidebar/sidebar.js";

function Viewallusers() {
  const { logUser, loginUser } = useUser();
  const [showModel, setshowModel] = useState(false);
  const [showModelAdd, setshowModelAdd] = useState(false);
  const [userList, setuserList] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  function navigateTo(path) {
    navigate(path);
  }

  //   form states
  const [email, setemail] = useState("");
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [userType, setuserType] = useState("ADMIN");
  const [password, setpassword] = useState("");
  const [rePassword, setrePassword] = useState("");
  const [reload, setreload] = useState(false);

  //update
  //   form states
  // const [email, setemail] = useState("");
  // const [fname, setfname] = useState("");
  // const [lname, setlname] = useState("");
  // const [phone, setphone] = useState("");
  // const [address, setaddress] = useState("");
  // const [userType, setuserType] = useState("ADMIN");

  function addNewUser() {
    const data = {
      email: email,
      firstName: fname,
      lastName: lname,
      phone: phone,
      address: address,
      userType: userType,
      password: password,
      rePassword: rePassword,
    };

    const url = process.env.REACT_APP_BASE_URL + "/user/register";

    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: "Bearer " + logUser.token,
      //   "Custom-Header": "Value",
    });

    const fetchOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };

    // Making the fetch call
    fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.error != null) {
          console.log(data.error);
          setError(data.error);
        }
        if (data.statusCode != 200) {
          setError(data.message);
          return;
        }

        if (data.statusCode == 200) {
          console.log(data);
          setshowModelAdd(false);
          setreload(!reload);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  function updateUser() {
    const data = {
      userId: showModel._id,
      firstName: showModel.firstName,
      lastName: showModel.lastName,
      phone: showModel.phone,
      address: showModel.address,
      userType: userType,
    };

    const url = process.env.REACT_APP_BASE_URL + "/user/updateuser";

    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: "Bearer " + logUser.token,
      //   "Custom-Header": "Value",
    });

    const fetchOptions = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(data),
    };

    // Making the fetch call
    fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.error != null) {
          console.log(data.error);
          setError(data.error);
        }
        if (data.statusCode != 200) {
          setError(data.message);
          return;
        }

        if (data.statusCode == 200) {
          console.log(data);
          setshowModel(null);
          setreload(!reload);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function deleteUser(id) {
    const url = process.env.REACT_APP_BASE_URL + "/user/" + id;

    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: "Bearer " + logUser.token,
      //   "Custom-Header": "Value",
    });

    const fetchOptions = {
      method: "DELETE",
      headers: headers,
    };

    // Making the fetch call
    fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.error != null) {
          console.log(data.error);
          setError(data.error);
        }
        if (data.statusCode != 200) {
          setError(data.message);
          return;
        }

        if (data.statusCode == 200) {
          console.log(data);
          setshowModel(false);
          setreload(!reload);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function loadData() {
    if (!logUser) {
      console.log("Please Sign In again");
      return;
    }
    const url =
      process.env.REACT_APP_BASE_URL + "/user/all?searchKeyword=" + searchText;

    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: "Bearer " + logUser.token,
      //   "Custom-Header": "Value",
    });

    const fetchOptions = {
      method: "GET",
      headers: headers,
    };

    // Making the fetch call
    fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.statusCode != 200) {
          setuserList([]);
          return;
        }

        if (data.statusCode == 200) {
          console.log(data);
          setuserList(data.data ?? []);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    loadData();
  }, [searchText, reload]);

  return (
    <div>
      <div className="header"></div>
      <Sidebar selectedIndex={5} />
      <div className="content flex justify-center items-center">
        <div className="w-full">
          <div className="w-80 flex items-center justify-center">
            <div className="search-input-wrapper w-half">
              <input
                type="text"
                placeholder="Search.."
                className="w-full  font-medium text-start"
                value={searchText}
                onChange={({ target }) => {
                  setsearchText(target.value);
                }}
              />
            </div>
            <div className="flex justify-end items-end w-half">
              <button
                className="btn-primary"
                onClick={() => setshowModelAdd(true)}
              >
                Add New Admin User
              </button>
            </div>
          </div>
          <div className="w-full flex">
            <table className="ubuntu-mono-regular ">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>First Name</th>
                  <th className="lastname-column">Last Name</th>
                  <th>Phone</th>
                  <th className="address-column">Address</th>
                  <th>User Type</th>
                  <th className="table-btn-container text-center">View</th>
                </tr>
              </thead>
              <tbody>
                {userList.length == 0 && (
                  <tr>
                    <td colSpan={7} className="text-center">
                      No Record Found
                    </td>
                  </tr>
                )}
                {userList.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.email}</td>
                      <td>{user.firstName}</td>
                      <td className="lastname-column">{user.lastName}</td>
                      <td>{user.phone}</td>
                      <td className="address-column">{user.address}</td>
                      <td>{user.userType}</td>
                      <td className="w-fit">
                        <button
                          className="table-btn"
                          onClick={() => {
                            setshowModel(user);
                            setuserType(user.userType);
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showModel && (
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span
              className="close-button"
              onClick={() => {
                setshowModel(false);
              }}
            >
              ×
            </span>
            <div className="flex justify-start items-center">
              <div className="flex justify-start items-start">
                <h2>Update User : {showModel._id}</h2>
              </div>
              <button
                className="table-btn delete-btn flex justify-center items-center"
                onClick={() => {
                  deleteUser(showModel._id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="xmark"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
                <p className="ml-10">Delete This User</p>
              </button>
            </div>

            <div className="flex w-full">
              <div className="w-full">
                <label htmlFor="" className="formlabel">
                  Email
                </label>
                <div className="input-wrapper formfield">
                  <input
                    type="text"
                    className="w-full  font-medium text-start"
                    value={showModel.email}
                    onChange={({ target }) => {
                      // setemail(target.value);
                    }}
                  />
                </div>
                <label htmlFor="" className="formlabel">
                  First Name
                </label>
                <div className="input-wrapper formfield">
                  <input
                    type="text"
                    className="w-full  font-medium text-start"
                    value={showModel.firstName}
                    onChange={({ target }) => {
                      setshowModel((prevState) => ({
                        ...prevState,
                        firstName: target.value,
                      }));
                    }}
                  />
                </div>
                <label htmlFor="" className="formlabel">
                  Last Name
                </label>
                <div className="input-wrapper formfield">
                  <input
                    type="text"
                    className="w-full  font-medium text-start"
                    value={showModel.lastName}
                    onChange={({ target }) => {
                      setshowModel((prevState) => ({
                        ...prevState,
                        lastName: target.value,
                      }));
                    }}
                  />
                </div>
                <label htmlFor="" className="formlabel">
                  Phone Number
                </label>
                <div className="input-wrapper formfield">
                  <input
                    type="text"
                    className="w-full  font-medium text-start"
                    value={showModel.phone}
                    onChange={({ target }) => {
                      setshowModel((prevState) => ({
                        ...prevState,
                        phone: target.value,
                      }));
                    }}
                  />
                </div>
                <label htmlFor="" className="formlabel">
                  Address
                </label>
                <div className="input-wrapper formfield">
                  <input
                    type="text"
                    className="w-full  font-medium text-start"
                    value={showModel.address}
                    onChange={({ target }) => {
                      setshowModel((prevState) => ({
                        ...prevState,
                        address: target.value,
                      }));
                    }}
                  />
                </div>
                <label htmlFor="" className="formlabel">
                  User Type
                </label>
                <div className="input-wrapper">
                  <div className="select-container">
                    <select
                      className="styled-select"
                      value={userType}
                      onChange={({ target }) => {
                        setuserType(target.value);
                      }}
                    >
                      <option value="ADMIN">Admin</option>
                      <option value="CASHIER">Cashier</option>
                      <option value="MANAGER">Manager</option>
                    </select>
                  </div>
                </div>

                <div className="flex mt-10">
                  <button
                    className="btn-primary font-medium"
                    onClick={updateUser}
                  >
                    Update User
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModelAdd && (
        <div id="myModal" className="modal ">
          <div className="modal-content-add">
            <span
              className="close-button"
              onClick={() => {
                setshowModelAdd(false);
              }}
            >
              ×
            </span>
            <h2>Add New User</h2>

            <div className="flex w-full">
              <div className="w-full">
                <label htmlFor="" className="formlabel">
                  Email
                </label>
                <div className="input-wrapper formfield">
                  <input
                    type="text"
                    className="w-full  font-medium text-start"
                    value={email}
                    onChange={({ target }) => {
                      setemail(target.value);
                    }}
                  />
                </div>
                <label htmlFor="" className="formlabel">
                  First Name
                </label>
                <div className="input-wrapper formfield">
                  <input
                    type="text"
                    className="w-full  font-medium text-start"
                    value={fname}
                    onChange={({ target }) => {
                      setfname(target.value);
                    }}
                  />
                </div>
                <label htmlFor="" className="formlabel">
                  Last Name
                </label>
                <div className="input-wrapper formfield">
                  <input
                    type="text"
                    className="w-full  font-medium text-start"
                    value={lname}
                    onChange={({ target }) => {
                      setlname(target.value);
                    }}
                  />
                </div>
                <label htmlFor="" className="formlabel">
                  Phone Number
                </label>
                <div className="input-wrapper formfield">
                  <input
                    type="text"
                    className="w-full  font-medium text-start"
                    value={phone}
                    onChange={({ target }) => {
                      setphone(target.value);
                    }}
                  />
                </div>
                <label htmlFor="" className="formlabel">
                  Address
                </label>
                <div className="input-wrapper formfield">
                  <input
                    type="text"
                    className="w-full  font-medium text-start"
                    value={address}
                    onChange={({ target }) => {
                      setaddress(target.value);
                    }}
                  />
                </div>
                <label htmlFor="" className="formlabel">
                  User Type
                </label>
                <div className="input-wrapper">
                  <div className="select-container">
                    <select
                      className="styled-select"
                      value={userType}
                      onChange={({ target }) => {
                        setuserType(target.value);
                      }}
                    >
                      <option value="ADMIN">Admin</option>
                      <option value="CASHIER">Cashier</option>
                      <option value="MANAGER">Manager</option>
                    </select>
                  </div>
                </div>
                <div className="flex formgroup">
                  <div className="w-full">
                    <label htmlFor="" className="formlabel">
                      Password
                    </label>
                    <div className="input-wrapper formfield">
                      <input
                        type="password"
                        className="w-full  font-medium text-start"
                        value={password}
                        onChange={({ target }) => {
                          setpassword(target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label htmlFor="" className="formlabel">
                      Re-Type Password
                    </label>
                    <div className="input-wrapper formfield">
                      <input
                        type="password"
                        className="w-full  font-medium text-start"
                        value={rePassword}
                        onChange={({ target }) => {
                          setrePassword(target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                {error != "" ? (
                  <div className="flex justify-center items-center">
                    <div className="login-error-banner w-full flex justify-between items-center">
                      <p>{error}</p>
                      <div
                        className="xmark-Container flex  items-center w-full"
                        onClick={() => setError("")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="xmark"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className="flex mt-10">
                  <button
                    className="btn-primary font-medium"
                    onClick={addNewUser}
                  >
                    Add New User
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Viewallusers;
