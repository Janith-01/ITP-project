import React, { useState } from "react";
import Sidebar from "./sidebar/sidebar";
import { useUser } from "../provider/userprovider.js";

function Profile() {
  const { logUser, loginUser } = useUser();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function changePassword() {
    const data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      reNewPassword: reNewPassword,
    };

    const url = process.env.REACT_APP_BASE_URL + "/user/changepassword";

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
          setSuccess(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div>
      <div className="header"></div>
      <Sidebar selectedIndex={6} />
      <div className="content flex justify-start items-center">
        <div className="changePassword-container">
          <div className="w-full">
            <label htmlFor="" className="formlabel">
              Current Password
            </label>
            <div className="input-wrapper formfield">
              <input
                type="password"
                className="w-full  font-medium text-start"
                value={oldPassword}
                onChange={({ target }) => {
                  setOldPassword(target.value);
                }}
              />
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="" className="formlabel">
              New Password
            </label>
            <div className="input-wrapper formfield">
              <input
                type="password"
                className="w-full  font-medium text-start"
                value={newPassword}
                onChange={({ target }) => {
                  setNewPassword(target.value);
                }}
              />
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="" className="formlabel">
              Re-Type New Password
            </label>
            <div className="input-wrapper formfield">
              <input
                type="password"
                className="w-full  font-medium text-start"
                value={reNewPassword}
                onChange={({ target }) => {
                  setReNewPassword(target.value);
                }}
              />
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
          {success != "" ? (
            <div className="flex justify-center items-center">
              <div className="login-success-banner w-full flex justify-between items-center">
                <p>{success}</p>
                <div
                  className="xmark-Container flex  items-center w-full"
                  onClick={() => setSuccess("")}
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
          <button className="btn-primary mt-10" onClick={changePassword}>
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
