import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Customersignup() {
  const [email, setemail] = useState("");
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [password, setpassword] = useState("");
  const [rePassword, setrePassword] = useState("");
  const [error, setError] = useState("");
  const [showModel, setshowModel] = useState(false);


  function validate(data) {
    const errors = {};

    // Validate email
    if (!isValidEmail(data.email)) {
      toast.error('Invalid email address', {
        position: "bottom-right",
      });
      errors.email = 'Invalid email address';
    }

    // Validate firstName
    if (!data.firstName) {
      toast.error('Please enter first name', {
        position: "bottom-right",
      });

      errors.firstName = 'First name is required';
    }

    // Validate lastName
    if (!data.lastName) {
      toast.error('Please enter last name', {
        position: "bottom-right",
      });

      errors.lastName = 'Last name is required';
    }

    // Validate phone number
    if (!isValidPhoneNumber(data.phone)) {
      toast.error('Invalid phone number', {
        position: "bottom-right",
      });

      errors.phone = 'Invalid phone number';
    }

    // Validate address
    if (!data.address) {
      toast.error('Address is required', {
        position: "bottom-right",
      });
      errors.address = 'Address is required';
    }

    // Validate password
    if (!isValidPassword(data.password)) {
      toast.error('Password must be at least 8 characters long', {
        position: "bottom-right",
      });
      errors.password = 'Password must be at least 8 characters long';
    }

    // Validate re-entered password
    if (data.password !== data.rePassword) {
      toast.error('Passwords do not match', {
        position: "bottom-right",
      });
      errors.rePassword = 'Passwords do not match';
    }

    return errors;
  }

  // Example validation functions (replace with your own implementations)
  function isValidEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }

  function isValidPhoneNumber(phone) {
    // Regular expression for basic phone number validation
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  }

  function isValidPassword(password) {
    // Password must be at least 8 characters long
    return password.length >= 8;
  }


  function addNewUser() {
    const data = {
      email: email,
      firstName: fname,
      lastName: lname,
      phone: phone,
      address: address,
      password: password,
      rePassword: rePassword,
    };
    const errors = validate(data);
    if (Object.keys(errors).length === 0) {
      console.log('Data is valid');
    } else {
      console.log('Validation errors:', errors);
      return;
    }

    const url = process.env.REACT_APP_BASE_URL + "/user/customer/register";

    const headers = new Headers({
      "Content-Type": "application/json",
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
        if (data.error != null || data.statusCode != 200) {
          console.log("EROOR", data.error);
          // setError("gjhgjh");
          setError(data.error);
        }
        if (data.statusCode != 200 && data.error == null) {
          setError(data.message);
          return;
        }

        if (data.statusCode == 200) {
          setshowModel(true);
          console.log(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="section flex justify-center items-center">
      <div className="card  login-card flex ">
        <div className="w-half flex-col justify-center items-center login-container login-separater">
          <p className="text-center w-full header-text font-semibold">
            Customer Sign Up
          </p>
          <div className="">
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
                {error && (
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
                          className="xmark"
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
        {/* <div className="w-full signup-sideimg">
          <img src="/images/company_1.jpg" alt="" />
        </div> */}
      </div>
      {showModel && (
        <div id="myModal" className="modal ">
          <div className="modal-content-add">
            <span
              className="close-button"
              onClick={() => {
                setshowModel(false);
              }}
            >
              ×
            </span>
            <h2>Registration Success !</h2>

            <div className="flex w-full">
              <div className="w-full">
                <div className="flex mt-10">
                  <a className="btn-primary font-medium text-btn" href="/">
                    Sign In
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Customersignup;
