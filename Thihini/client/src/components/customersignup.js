import React, { useState } from "react";

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
    </div>
  );
}

export default Customersignup;
